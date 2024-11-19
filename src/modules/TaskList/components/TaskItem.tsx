import {TaskDto} from "../../../../configurations/dto";
import {Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";

interface Props {
	task: TaskDto
}

export default function TaskItem({task}: Props) {
	return <>
		<Accordion sx={{boxShadow: 'none', border: 1, borderColor: '#80808040'}}>
			<AccordionSummary
				expandIcon={<ExpandMore/>}
				aria-controls="panel3-content"
				id="panel3-header"
			>
				<Typography sx={{fontWeight: 600}}>
					{task.title}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{task.description}
			</AccordionDetails>
			<AccordionActions>
				<Button>Edit</Button>
				<Button color={'error'}>Delete</Button>
			</AccordionActions>
		</Accordion>
	</>
}