import {useEffect, useRef, useState} from "react";

export function useWatch<T>(prop: () => T, callback: (old: T, val: T) => void, timeout: number = 10) {
	const [isWatching, setIsWatching] = useState(true);
	const oldValRef = useRef(prop());
	const intervalRef = useRef<number>();

	const connect = () => setIsWatching(true);
	const disconnect = () => setIsWatching(false);

	useEffect(() => {
		if (isWatching) {
			intervalRef.current = setInterval(() => {
				const current = prop();
				if (current !== oldValRef.current) {
					callback(oldValRef.current, current)
					oldValRef.current = current;
				}
			}, timeout);
			return;
		}
		
		clearInterval(intervalRef.current);
		intervalRef.current = undefined;
		
	}, [callback, prop, timeout, isWatching]);

	return {
		isWatching, connect, disconnect
	}
}