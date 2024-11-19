import {Box, InputBase, Pagination, Stack, Typography} from "@mui/material";
import {ChangeEvent, Dispatch, SetStateAction} from "react";

interface Props {
	currentPage: number;
	pagesCount: number;
	onChangePage: Dispatch<SetStateAction<{ page: number, size: number }>>;
}

export default function ListPagination({pagesCount, onChangePage, currentPage}: Props) {
	const handleSelectPage = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedPage = parseInt(event.target.value)
		if (selectedPage < 1 || selectedPage > pagesCount) return;
		onChangePage((oldValue) => ({...oldValue, page: isNaN(selectedPage) ? 0 : selectedPage}))
	};
	const handleChangePage = (_: unknown, value: number) =>
		onChangePage((oldValue) => ({...oldValue, page: value}));

	if (pagesCount < 1) return <></>;
	return <>
		<Stack spacing={2} direction="row" sx={{alignItems: 'center'}}>
			<Box sx={{flexGrow: 1}}></Box>
			<Typography>Page:</Typography>
			<InputBase onChange={handleSelectPage} value={currentPage}
			           sx={{borderBottom: '1px solid', width: `${10 * pagesCount.toString().length}px`}}/>
			<Pagination count={pagesCount} page={currentPage} onChange={handleChangePage}/>
		</Stack>
	</>
}