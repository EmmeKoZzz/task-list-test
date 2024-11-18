export interface TaskDto {
	id: string;
	title: string;
	description?: string;
	state: boolean;
	endAt?: Date;
	createAt: Date;
}