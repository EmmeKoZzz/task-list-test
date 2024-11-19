import {TaskDto} from "../../../../configurations/dto";
import {Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {Dispatch, SetStateAction, useState} from "react";
import TaskForm from "./TaskForm.tsx";

interface Props {
	task: TaskDto,
	services: {
		getTasks: (page: number, keyword?: string) => Promise<void>,
		deleteTask: (id: number) => Promise<void>,
		changeTaskStatus: (id: number) => Promise<void>,
		updateTask: (id: number, title: string, description?: string) => Promise<void>,
		setPagination: Dispatch<SetStateAction<{ page: number, size: number }>>
	}
}

export default function TaskItem({task, services}: Props) {
	const [openDialog, setOpenDialog] = useState(false);

	async function handleDelete() {
		await services.deleteTask(task.id);
		services.setPagination((old) => ({...old, page: 1}))
		services.getTasks(1);
	}

	async function handleChangeStatus() {
		await services.changeTaskStatus(task.id);
		services.setPagination((old) => ({...old, page: 1}))
		services.getTasks(1);
	}
	
	return <>
		<Accordion sx={{boxShadow: 'none', border: 1, borderColor: '#80808040'}}>
			<AccordionSummary
				expandIcon={<ExpandMore/>}
				aria-controls="panel3-content"
				id="panel3-header"
			>
				<Typography sx={{fontWeight: 600, textDecoration: !task.state ? '' : 'line-through'}}>
					{task.title}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{task.description}
			</AccordionDetails>
			<AccordionActions>
				<Button onClick={handleChangeStatus}
				        color={task.state ? 'success' : 'inherit'}>{task.state ? 'Completed' : 'No Completed'}</Button>
				<Button onClick={() => setOpenDialog(true)}>Edit</Button>
				<Button color="error" onClick={handleDelete}>Delete</Button>
			</AccordionActions>
		</Accordion>
		<TaskForm openState={[openDialog, setOpenDialog]}
		          defaultValues={task}
		          onAction={() => services.setPagination((old) => ({...old, page: 1}))}
		          services={{
			          getTasks: services.getTasks,
			          action: (id, t, d) => services.updateTask(id, t, d)
		          }}/>
	</>
}