import {useEffect, useState} from "react";
import ApiConf from '../../configurations/api.conf'
import {TaskDto} from "../../configurations/dto";
import axios, {AxiosError} from "axios";

const api = axios.create({baseURL: ApiConf.baseUrl})

export function useTaskService() {
	const [tasks, setTasks] = useState<TaskDto[]>([])
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<AxiosError | undefined>();

	useEffect(() => {
		async function getTasks() {
			setPending(true);
			try {
				const {data} = await api.get(ApiConf.tasks.root);
				setTasks(data);
			} catch (e: unknown) {
				setError(e as AxiosError)
			}
			setPending(false);
		}

		getTasks();
	}, [])

	return {tasks, pending, error}
}