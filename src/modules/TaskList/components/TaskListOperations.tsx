import {Box, Button, Divider, InputBase, Stack} from '@mui/material';
import {Add, Search} from '@mui/icons-material';
import {useState} from "react";
import TaskForm from "./TaskForm.tsx";

interface Props {
	onAdd: () => void,
	taskServices: {
		addTask: (title: string, description?: string) => Promise<void>,
		getTasks: (page: number, string?: string) => Promise<void>
	}
}

export default function TaskListOperations({taskServices, onAdd}: Props) {
	const [search, setSearch] = useState('');
	const [openDialog, setOpenDialog] = useState(false);

	function handleSearch() {
		taskServices.getTasks(1, search.trim() === '' ? undefined : search)
	}

	return <>
		<Stack direction="row" spacing={2}>
			<Button variant="outlined" startIcon={<Add/>} onClick={() => setOpenDialog(!openDialog)}>
				Add
			</Button>
			<Box sx={{p: '2px 4px', display: 'flex', flexGrow: 1, alignItems: 'center', border: '1px solid gray', borderRadius: "5px"}}>
				<InputBase
					sx={{ml: 1, flex: 1, color: 'black'}}
					placeholder="Search"
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Divider variant="middle" orientation="vertical"/>
				<Button onClick={handleSearch}>
					<Search sx={{fill: 'gray'}}/>
				</Button>
			</Box>
		</Stack>
		<TaskForm
			title="Add new task"
			openState={[openDialog, setOpenDialog]}
			onAction={onAdd}
			services={{
				getTasks: taskServices.getTasks,
				action: (_, t, d) => taskServices.addTask(t, d)
		}}/>
	</>
}