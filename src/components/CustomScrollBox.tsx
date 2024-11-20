import style from './CustomScrollBox.module.css';
import {CSSProperties, ReactNode, useEffect, useRef} from "react";

interface Props {
	children: ReactNode;
	className?: string;
	styles?: CSSProperties;
}

const div = document.createElement('div');

export function CustomScrollBox({children, className, styles}: Props) {
	const elements = {
		container: useRef(div),
		content: useRef(div),
		scrollBar: useRef(div),
		scrollCursor: useRef(div),
	}
	const timerID = useRef<number>();

	useEffect(() => {
		const content = elements.content.current;
		const cursor = elements.scrollCursor.current;
		const bar = elements.scrollBar.current;

		const isScrollable = () => content.clientHeight < content.scrollHeight;
		const scrollBarScrollableSpace = () => content.clientHeight - cursor.clientHeight;
		const contentScrollableSpace = () => content.scrollHeight - content.clientHeight;

		const contentScrolledPercentage = () => Math.round((content.scrollTop / contentScrollableSpace()) * 100) / 100;
		const barScrolledPercentage = () => Math.round((parseInt(cursor.style.marginTop) / scrollBarScrollableSpace()) * 100) / 100;

		const eventListeners = {
			wheel: (ev: WheelEvent) => {
				content.scrollTop += ev.deltaY;
				handleCursorVisibility();
				cursor.style.marginTop = `${contentScrolledPercentage() * scrollBarScrollableSpace()}px`;
			},
			mouseMove: {
				cursor: (ev: MouseEvent) => {
					moveScrollCursor(ev);
					content.scrollTop = Math.floor(barScrolledPercentage() * contentScrollableSpace());
					document?.addEventListener('mouseup', eventListeners.mouseUp);
				},
				content: handleCursorVisibility,
			},
			mouseDown: (ev: MouseEvent) => {
				ev.preventDefault();
				clearTimeout(timerID.current);
				document?.addEventListener('mousemove', eventListeners.mouseMove.cursor)
			},
			mouseUp: () => {
				cursorTemporizer();
				document.removeEventListener('mousemove', eventListeners.mouseMove.cursor)
			},
		}

		const resizeObserver = new MutationObserver(() => {
			cursorSize();
			cursor.style.marginTop = `${contentScrolledPercentage() * scrollBarScrollableSpace()}px`;
		});

		resizeObserver.observe(content, {attributes: true, childList: true, subtree: true});
		elements.container.current.addEventListener('mousemove', eventListeners.mouseMove.content);
		content.addEventListener('wheel', eventListeners.wheel);
		cursor.addEventListener('mousedown', eventListeners.mouseDown);

		return () => {
			resizeObserver.disconnect();
			elements.container.current.removeEventListener('mousemove', eventListeners.mouseMove.content);
			content.removeEventListener('wheel', eventListeners.wheel);
			cursor.removeEventListener('mousedown', eventListeners.mouseDown);
		}

		function cursorTemporizer() {
			timerID.current = setTimeout(() => {
				bar.style.opacity = '0';
				timerID.current = undefined;
			}, 2000)
		}

		function handleCursorVisibility() {
			if (!isScrollable()) return;
			bar.style.opacity = '1';
			clearTimeout(timerID.current);
			cursorTemporizer()
		}

		function cursorSize() {
			const ratioClientScroll = content.clientHeight / content.scrollHeight;
			cursor.style.height = `${content.clientHeight * (ratioClientScroll > .1 ? ratioClientScroll : .1)}px`;
		}

		function moveScrollCursor(ev: MouseEvent) {
			const currentY = parseInt(cursor.style.marginTop);
			let increment = ev.movementY;
			if (currentY + increment <= 0 || currentY + increment >= scrollBarScrollableSpace())
				increment = 0;
			cursor.style.marginTop = `${currentY + increment}px`;
		}
	}, [elements.container, elements.content, elements.scrollBar, elements.scrollCursor]);

	return <div className={`${style.container} ${className ?? ''}`} style={styles} ref={elements.container}>
		<div className={style.content} ref={elements.content}>
			{children}
		</div>
		<div className={style.scrollBar} ref={elements.scrollBar}>
			<div style={{marginTop: 0}} ref={elements.scrollCursor}/>
		</div>
	</div>
}