import {Box, Button, Card, CardContent, Dialog, DialogTitle, Divider, InputBase, Stack, TextField} from '@mui/material';
import {Add, Search} from '@mui/icons-material';
import {ChangeEvent, useState} from "react";

interface Props {
	onAdd: () => void,
	taskServices: {
		addTask: (title: string, description: string) => Promise<void>,
		getTasks: (page: number, string?: string) => Promise<void>
	}
}

const defaultDialogFormValue = {
	title: '',
	description: ''
}

export default function TaskListOperations({taskServices, onAdd}: Props) {
	const [search, setSearch] = useState('');
	const [openDialog, setOpenDialog] = useState(false);
	const [fieldValidation, setFieldValidation] = useState({title: false})
	const [form, setForm] = useState(defaultDialogFormValue);

	function updateForm(field: 'title' | 'description', event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setForm((oldValue) => ({...oldValue, [field]: event.target.value.trim()}))
	}

	async function handleAdd() {
		if (form.title.trim() === '') {
			setFieldValidation({title: true})
			return;
		}
		setFieldValidation({title: false})

		await taskServices.addTask(form.title, form.description)
		taskServices.getTasks(1)
		onAdd();
		setOpenDialog(false)
	}

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
		<Dialog onClose={() => setOpenDialog(!openDialog)} open={openDialog}>
			<Card>
				<CardContent sx={{minWidth: '400px', display: 'flex', flexDirection: 'column'}}>
					<DialogTitle>Add new task:</DialogTitle>
					<Stack spacing={2}>
						<TextField sx={{flex: 1}}
						           label="Title"
						           variant="filled"
						           onChange={(e) => updateForm('title', e)}
						           error={fieldValidation.title}
						           helperText={fieldValidation.title ? 'Este campo es requerido.' : undefined}
						/>
						<TextField sx={{flex: 1}}
						           label="Description"
						           variant="filled"
						           multiline
						           onChange={(e) => updateForm('description', e)}
						/>
						<Box sx={{display: 'flex', justifyContent: 'end'}}>
							<Button onClick={handleAdd} size="large">Send</Button>
						</Box>
					</Stack>
				</CardContent>
			</Card>
		</Dialog>
	</>
}