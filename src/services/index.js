import {TodoLocalStorageRepository} from "../repositories/todo";
import TodoRepository from "../repositories/todo.repository";

export  default {
  todo:  new TodoRepository(),
  todo_old: new TodoLocalStorageRepository()
}
