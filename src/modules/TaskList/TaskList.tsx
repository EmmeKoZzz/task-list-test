import {Card, CardContent, Snackbar, Stack, Typography} from '@mui/material';
import {useEffect, useMemo, useState} from "react";
import {useTaskService} from "../../hooks";
import {TaskItem, TaskListOperations} from "./components";
import {CustomPagination, CustomScrollBox, PendingSpin} from "../../components";
import style from './TaskList.module.css'

interface Props {
	name?: string;
}

export default function TaskList({name}: Props) {
	const [{page, size}, setPagination] = useState({page: 1, size: 5});
	const {tasks, pending, services, error, tasksCount} = useTaskService(size);
	const [errorNotification, setErrorNotification] = useState(false);

	const listContent = useMemo(() => {
		return pending 
			? <PendingSpin/> 
			: tasks.map((task) => <TaskItem task={task} key={task.id} services={{...services, setPagination}}/>)
	}, [pending, tasks])

	useEffect(() => {
		setErrorNotification(!!error);
	}, [error]);

	useEffect(() => {
		if (page > 0)
			services.getTasks(page);
	}, [page,size]);

	return <>
		<Card sx={{height: .9}}>
			<CardContent sx={{height: 1}}>
				<Stack sx={{px: 3, py: 2, height: 1}}>
					<Stack spacing={2} sx={{p: 2}}>
						<Typography variant="h4">
							{name || 'Your Task List'}
						</Typography>
						<TaskListOperations taskServices={services} onAdd={() => setPagination({size, page: 1})}/>
					</Stack>
					<CustomScrollBox className={style.listContent}>
						{listContent}
					</CustomScrollBox>
					<CustomPagination currentPage={page} pagesCount={Math.ceil(tasksCount / size)} onChangePage={setPagination}/>
				</Stack>
			</CardContent>
		</Card>
		<Snackbar
			anchorOrigin={{vertical: 'top', horizontal: 'right'}}
			open={errorNotification}
			onClose={() => setErrorNotification(false)}
			autoHideDuration={5000}
			message={"Something wrong happen!!: " + error?.status}
		/>
	</>
}