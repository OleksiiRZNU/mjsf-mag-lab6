import TodoRepositoryInterface from "@/repositories/todo.interface";
import {Task} from "@/models/task";

export default class TodoRepository implements TodoRepositoryInterface {

    create(task: Task): Promise<Task> {
        return new Promise<Task>((resolve) => {
            const todos = this.getAllTodos();
            todos.push(task);

            this.updateTodos(todos);
            resolve(task);
        });
    }

    delete(id: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            const todos = this.getAllTodos().filter(task => task.id !== id);
            this.updateTodos(todos);
            resolve(true);
        });
    }

    fetch(): Promise<Task[]> {
        return new Promise<Task[]>((resolve) => resolve(this.getAllTodos()));
    }

    find(id: string): Promise<Task> {
        return new Promise<Task>((resolve, reject) => {
            const task = this.getAllTodos()
                .find(task => task.id === id);

            if (typeof task !== "undefined") {
                resolve(task);
            } else {
                reject("Can not find task");
            }
        });
    }

    save(task: Task): Promise<Task> {
        return new Promise((resolve, reject) => {
            let records = this.getAllTodos();
            const existingRecord = records.find(_task => _task.id === task.id);
            if (typeof existingRecord !== "undefined"){
                const index = records.indexOf(existingRecord);

                records[index] = task;
                this.updateTodos(records);

                resolve(task);
            } else {
                reject('Task is not exist');
            }
        });
    }


    getAllTodos(): Task[] {
        return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem("todos") || '') : [];
    }

    updateTodos(tasks: Task[]): Task[] {
        localStorage.setItem('todos', JSON.stringify(tasks));

        return this.getAllTodos();
    }

}