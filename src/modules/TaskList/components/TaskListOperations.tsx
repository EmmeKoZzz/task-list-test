import {Box, Button, Divider, InputBase, Stack} from '@mui/material';
import {Add, Search} from '@mui/icons-material';
import {useState} from "react";
import {TaskForm} from "./TaskForm.tsx";

interface Props {
	onAdd: () => void,
	taskServices: {
		addTask: (title: string, description?: string) => Promise<void>,
		getTasks: (page: number, string?: string) => Promise<void>
	}
}

export function TaskListOperations({taskServices, onAdd}: Props) {
	const [search, setSearch] = useState('');
	const [openDialog, setOpenDialog] = useState(false);

	function handleSearch() {
		taskServices.getTasks(1, search.trim() === '' ? undefined : search)
	}

	async function handleAdd(_: number, title: string, description?: string) {
		await taskServices.addTask(title, description);
		taskServices.getTasks(1);
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
					onKeyDown={(e) => {
						if (e.code !== 'Enter') return;
						setSearch(e.currentTarget.value)
						handleSearch();
					}}
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
			action={handleAdd}
		/>
	</>
}