import {useEffect, useState} from "react";
import ApiConf from '../../configurations/api.conf'
import {TaskDto} from "../../configurations/dto";
import axios, {AxiosError} from "axios";

const api = axios.create({baseURL: ApiConf.baseUrl})

export function useTaskService(size: number) {
	const [tasks, setTasks] = useState<TaskDto[]>([])
	const [tasksCount, setTasksCount] = useState(0)
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<AxiosError | undefined>();

	async function getTasks(page: number, keyword?: string) {
		setPending(true);
		try {
			const {data} = await api.get(ApiConf.tasks.root, {params: {size, page, keyword}});
			setTasks(data.data);
			setTasksCount(data.count);
		} catch (e: unknown) {
			setError(e as AxiosError)
		}
		setPending(false);
	}

	async function addTask(title: string, description?: string) {
		setPending(true);
		try {
			await api.post(ApiConf.tasks.root, {title, description});
		} catch (e: unknown) {
			setError(e as AxiosError)
		}
		setPending(false);
	}

	async function updateTask(id: number, title: string, description?: string) {
		setPending(true);
		try {
			await api.put(ApiConf.tasks.root + id, {title, description});
		} catch (e: unknown) {
			setError(e as AxiosError)
		}
		setPending(false);
	}

	async function deleteTask(id: number) {
		setPending(true);
		try {
			await api.delete(ApiConf.tasks.root + id);
		} catch (e: unknown) {
			setError(e as AxiosError)
		}
		setPending(false);
	}

	async function changeTaskStatus(id: number) {
		setPending(true);
		try {
			await api.patch(ApiConf.tasks.root + id);
		} catch (e: unknown) {
			setError(e as AxiosError)
		}
		setPending(false);
	}

	useEffect(() => {
		getTasks(1)
	}, [])

	return {tasks, tasksCount, pending, error, services: {getTasks, addTask, updateTask, deleteTask, changeTaskStatus}}
}