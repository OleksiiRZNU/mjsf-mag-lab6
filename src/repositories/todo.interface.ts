import {Task} from "@/models/task";

export default interface TodoRepositoryInterface {

    create(task: Task): Promise<Task>

    save(task: Task): Promise<Task>

    find(id: string): Promise<Task>

    fetch(): Promise<Task[]>

    delete(id: string): Promise<boolean>


}