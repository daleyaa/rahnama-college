type Task = {
    id: number,
    title: string,
    isDone: boolean
}

interface IToDoList {
    addTask: (title: string) => Task;
    showTasks: () => Task[];
    filter: (fn: (task:Task) => boolean) => Task[];
    deleteTask: (id: number) => void;
    changeStatus: (id: number, status: boolean) => void;
    search: (text: string) => Task[];
}

class TodoList implements IToDoList {
    private lastCount: number = 0;
    private tasks: Task[] = [];

    addTask(title: string): Task {
        const task: Task = {
            id: this.lastCount++,
            title,
            isDone: false,
        };
        this.tasks.push(task)
        return task;
    }
    showTasks(): Task[] {
        return this.tasks;
    }
    filter(fn:(task:Task) => boolean): Task[] {
        const filteredTasks: Task[] = []
        for (const task of this.tasks) {
            if(fn(task)) 
                filteredTasks.push(task)
        }
        return filteredTasks
    }
    deleteTask(id: number): void {
        this.tasks = this.filter((task) => task.id !== id)
    }
    changeStatus(id: number, status: boolean): void {
        this.tasks = this.tasks.map((task) => ({...task, isDone: task.id === id ? status : task.isDone }));
    }
    search(text: string): Task[] {
        return this.filter((task) => task.title.toLowerCase().includes(text.toLowerCase()))
    }
}
