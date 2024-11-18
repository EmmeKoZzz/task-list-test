import {Box, Stack, Typography} from '@mui/material';
import TaskListOperations from './components/TaskListOperations.tsx';
import {useState} from "react";
import {useTaskService} from "../../hooks";

interface Props {
	name?: string;
}

export default function TaskList({name}: Props) {
	const [search, setSearch] = useState('');
	const {tasks, pending} = useTaskService();

	return <Stack spacing={2}>
		<Stack spacing={2} sx={{p: 2}}>
			<Typography variant="h2">
				{name || 'Your Task List'}
			</Typography>
			<TaskListOperations onInput={setSearch}/>
		</Stack>
		<Box sx={{borderRadius: "5px", background: '#80808020', p:2}}>
		</Box>
	</Stack>;
}