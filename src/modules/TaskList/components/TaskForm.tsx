import {Box, Button, Card, CardContent, Dialog, DialogTitle, Stack, TextField} from "@mui/material";
import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";

interface Props {
	openState: [boolean, Dispatch<SetStateAction<boolean>>];
	defaultValues?: { title?: string, description?: string, id?: number };
	onAction: () => void;
	services: {
		getTasks: (page: number) => Promise<void>,
		action: (id: number, title: string, description?: string) => Promise<void>
	}
}

export default function TaskForm({defaultValues, services, onAction, openState: [openDialog, setOpenDialog]}: Props) {
	const [fieldValidation, setFieldValidation] = useState({title: false})
	const [form, setForm] = useState(defaultValues);

	function updateForm(field: 'title' | 'description', event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setForm((oldValue) => ({...oldValue, [field]: event.target.value.trim()}))
	}

	async function handleAction() {
		if ((form?.title ?? '').trim() === '') {
			setFieldValidation({title: true})
			return;
		}
		setFieldValidation({title: false})

		await services.action(defaultValues?.id ?? -1, form?.title ?? '', form?.description,)
		services.getTasks(1)
		onAction();
		setOpenDialog(false)
	}

	return <>
		<Dialog onClose={() => {
			setForm(defaultValues);
			setOpenDialog(!openDialog)
		}} open={openDialog}>
			<Card>
				<CardContent sx={{minWidth: '400px', display: 'flex', flexDirection: 'column'}}>
					<DialogTitle>Add new task:</DialogTitle>
					<Stack spacing={2}>
						<TextField sx={{flex: 1}}
						           label="Title"
						           value={form?.title}
						           variant="filled"
						           onChange={(e) => updateForm('title', e)}
						           error={fieldValidation.title}
						           helperText={fieldValidation.title ? 'Este campo es requerido.' : undefined}
						/>
						<TextField sx={{flex: 1}}
						           label="Description"
						           value={form?.description}
						           variant="filled"
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