import {Box, Button, Card, CardContent, Dialog, DialogTitle, Stack, TextField} from "@mui/material";
import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";

interface Props {
	title: string
	openState: [boolean, Dispatch<SetStateAction<boolean>>];
	defaultValues?: { title?: string, description?: string, id?: number };
	onAction: () => void;
	services: {
		getTasks: (page: number) => Promise<void>,
		action: (id: number, title: string, description?: string) => Promise<void>
	}
}

export default function TaskForm({defaultValues, services, onAction, openState: [openDialog, setOpenDialog], title}: Props) {
	const [fieldValidation, setFieldValidation] = useState({title: false})
	const [form, setForm] = useState(DefaultState());

	function DefaultState() {
		return {
			title: defaultValues?.title ?? '',
			id: defaultValues?.id ?? -1,
			description: defaultValues?.description
		}
	}

	function updateForm(field: 'title' | 'description', event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setForm((oldValue) => ({...oldValue, [field]: event.target.value}))
	}

	async function handleAction() {
		const normalizeStatus = {...form, title: form.title.trim(), description: form.description?.trim()};
		const {title, description, id} = normalizeStatus;
		setForm(normalizeStatus)

		if ((title === '')) {
			setFieldValidation({title: true})
			return;
		}
		setFieldValidation({title: false})

		await services.action(id, title, description)
		services.getTasks(1)
		onAction();
		setForm(DefaultState());
		setOpenDialog(false)
	}

	return <>
		<Dialog onClose={() => {
			setForm(DefaultState());
			setOpenDialog(!openDialog)
		}} open={openDialog}>
			<Card>
				<CardContent sx={{minWidth: '400px', display: 'flex', flexDirection: 'column'}}>
					<DialogTitle>{title}:</DialogTitle>
					<Stack spacing={2}>
						<TextField sx={{flex: 1}}
						           label="Title"
						           value={form?.title}
						           variant="outlined"
						           onChange={(e) => updateForm('title', e)}
						           error={fieldValidation.title}
						           helperText={fieldValidation.title ? 'Este campo es requerido.' : undefined}
						/>
						<TextField sx={{flex: 1}}
						           label="Description"
						           value={form?.description}
						           variant="outlined"
						           multiline
						           onChange={(e) => updateForm('description', e)}
						/>
						<Box sx={{display: 'flex', justifyContent: 'end'}}>
							<Button onClick={handleAction} size="large">Send</Button>
						</Box>
					</Stack>
				</CardContent>
			</Card>
		</Dialog>
	</>
} 