import { ITask } from '../../modules/modal/types/tasks.interface.ts'

export type UserType = {
	name?: string
	id: string
	tasks: ITask[]
}

export type TypeUserContext = {
	user: UserType
	login: (name: string, userId: string) => void
	logout: () => void
}
