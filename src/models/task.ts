import {Md5} from "ts-md5"
const salt = "ramdom_str";
export class Task {

  id: string = '';
  title: string = '';
  description: string = '';
  status: string = '';

  static TS_COMPLETED:string = 'completed'
  static TS_INCOMPLETED:string = 'incompleted'

  constructor() {
    this.id = Md5.hashStr(Date.now()+salt)
    this.title = "";
    this.description = "";
    this.status = Task.TS_INCOMPLETED;
  }
}
