import {ITask} from '../modules/modal/types/tasks.interface.ts'
import {IUser} from '../modules/login/types/user.interface.ts'

export class TaskService {
  private readonly BASE_URL = 'http://localhost:3000/users'

  async fetchTasksByUserId(id: string): Promise<IUser> {
    try {
      const res = await fetch(`${this.BASE_URL}/${id}`)
      return await res.json()
    } catch (error) {
      return Promise.reject()
    }
  }

  async addTaskByUserId(userId: string, newTask: ITask) {
    try {
      const userResponse = await fetch(`${this.BASE_URL}/${userId}`)
      const user = await userResponse.json()

      const updatedTasks = [...user.tasks, newTask]

      const updateResponse = await fetch(`${this.BASE_URL}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...user, tasks: updatedTasks}),
      })

      return await updateResponse.json()
    } catch (error) {
      console.error('Failed to add task:', error)
      return Promise.reject(error)
    }
  }

  async deleteTaskByUserId(userId: string, taskId: string): Promise<void> {
    try {
      const userResponse = await fetch(`${this.BASE_URL}/${userId}`)
      const user = await userResponse.json()

      const updatedTasks = user.tasks.filter((task: ITask) => task.id !== taskId)

      const updateUserResponse = await fetch(`${this.BASE_URL}/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({tasks: updatedTasks}),
      })

      if (!updateUserResponse.ok) {
        throw new Error(`Не удалось обновить пользователя с ID: ${userId}`)
      }
    } catch (error) {
      console.error('Не удалось удалить задачу:', error)
      throw error
    }
  }

  async changeCheckBox(userId: string, taskId: string) {
    try {
      const userResponse = await fetch(`${this.BASE_URL}/${userId}`)
      const user = await userResponse.json()

      const updatedTasks = user.tasks.map((task: ITask) => {
        if (task.id === taskId) {
          return {...task, completed: !task.completed}
        }
        return task
      })

      const updateUserResponse = await fetch(`${this.BASE_URL}/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({tasks: updatedTasks}),
      })

      if (!updateUserResponse.ok) {
        throw new Error(`Не удалось обновить пользователя с ID: ${userId}`)
      }
    } catch (error) {
      console.error('Не удалось удалить задачу:', error)
      throw error
    }
  }
}
