import {Box, MenuItem, Pagination, Stack, TextField, Typography} from "@mui/material";
import {ChangeEvent, Dispatch, SetStateAction} from "react";

interface Props {
	currentPage: number;
	pagesCount: number;
	onChangePage: Dispatch<SetStateAction<{ page: number, size: number }>>;
}

const sizeOptions = [5, 10, 20, 50]

export function CustomPagination({pagesCount, onChangePage, currentPage}: Props) {
	const handleSelectPage = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedPage = parseInt(event.target.value)
		if (selectedPage < 1 || selectedPage > pagesCount) return;
		onChangePage((oldValue) => ({...oldValue, page: isNaN(selectedPage) ? 0 : selectedPage}))
	};
	const handleChangePage = (_: unknown, value: number) =>
		onChangePage((oldValue) => ({...oldValue, page: value}));
	const handleChangeSize = (event: ChangeEvent<HTMLInputElement>) =>
		onChangePage({page: 1, size: parseInt(event.target.value)});

	if (pagesCount < 1) return <></>;
	return <>
		<Stack spacing={2} direction="row" sx={{alignItems: 'center'}}>
			<Typography>Size:</Typography>
			<TextField
				variant="standard"
				select
				defaultValue={sizeOptions[0]}
				onChange={handleChangeSize}
			>
				{sizeOptions.map((option, ix) => (
					<MenuItem value={option} key={`${ix}${option}`}>
						{option}
					</MenuItem>
				))}
			</TextField>
			<Box sx={{flexGrow: 1}}></Box>
			<Typography>Page:</Typography>
			<TextField variant="standard" onChange={handleSelectPage} value={currentPage}
			           sx={{width: `${12 * pagesCount.toString().length}px`}}/>
			<Pagination count={pagesCount} page={currentPage} onChange={handleChangePage}/>
		</Stack>
	</>
}