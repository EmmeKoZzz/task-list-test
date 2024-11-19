import {CircularProgress, Stack} from "@mui/material";

export default function ListPending() {

	return <Stack sx={{textAlign: 'center', alignItems: 'center', justifyContent: 'center', height: 1}}>
		<CircularProgress color="inherit"/>
	</Stack>
}