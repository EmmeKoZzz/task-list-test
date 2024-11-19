import {Box, Button, Divider, InputBase, Stack} from '@mui/material';
import {Add, Search} from '@mui/icons-material';
import {Dispatch} from "react";

interface Props {
	onInput: Dispatch<string>;
}

export default function TaskListOperations({onInput}: Props) {
	return <Stack direction="row" spacing={2} sx={{}}>
		<Button variant="outlined" startIcon={<Add/>}>
			Add
		</Button>
		<Box sx={{width: 1 / 3}}/>
		<Box sx={{p: '2px 4px', display: 'flex', flexGrow: 1, alignItems: 'center', border: '1px solid gray', borderRadius: "5px"}}>
			<InputBase
				sx={{ml: 1, flex: 1, color: 'black'}}
				placeholder="Search"
				onInput={(e) => onInput((e.target as HTMLInputElement).value)}
			/>
			<Divider variant="middle" orientation="vertical"/>
			<Button>
				<Search sx={{fill: 'gray'}}/>
			</Button>
		</Box>
	</Stack>
}