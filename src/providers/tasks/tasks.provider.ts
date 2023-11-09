import {TasksProviderTypes} from "@/providers/tasks/tasks.provider.types";
import TodoRepository from "@/repositories/todo.repository";

export const provider = (): TasksProviderTypes => ({
    todo: new TodoRepository()
});
