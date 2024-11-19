import {Box, Card, CardContent, Stack, Typography} from '@mui/material';
import TaskListOperations from './components/TaskListOperations.tsx';
import {Ref, useMemo, useRef, useState} from "react";
import {useTaskService} from "../../hooks";
import TaskItem from "./components/TaskItem.tsx";
import ListPending from "./components/ListPending.tsx";
import ListPagination from "./components/ListPagination.tsx";

interface Props {
	name?: string;
}

export default function TaskList({name}: Props) {
	const [search, setSearch] = useState('');
	const [{page, size}, setPagination] = useState({page: 1, size: 1});
	const {tasks, pending} = useTaskService();
	const stackParent = useRef<HTMLDivElement>()

	const listContent = useMemo(() => {
		return pending ? <ListPending/> : tasks.map((task) => <TaskItem task={task}/>)
	}, [pending, tasks])

	return <Card sx={{height: .9}}>
		<CardContent sx={{height: 1}}>
			<Stack spacing={2} sx={{px: 3, py: 2, height: 1}}>
				<Stack spacing={2} sx={{p: 2}}>
					<Typography variant="h2">
						{name || 'Your Task List'}
					</Typography>
					<TaskListOperations onInput={setSearch}/>
				</Stack>
				<Box sx={{flexGrow: 1}} ref={stackParent}>
					<Stack sx={{
						borderRadius: "5px",
						overflowY: 'scroll',
						maxHeight: stackParent.current ? stackParent.current.clientHeight + 'px' : 1,
						display: 'flex'
					}}>
						{listContent}
					</Stack>
				</Box>
				<ListPagination currentPage={page} pagesCount={tasks.length / size} onChangePage={setPagination}/>
			</Stack>
		</CardContent>
	</Card>
	
	

}