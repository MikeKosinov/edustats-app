import {IMarksInterface} from "../marks/IMarks.interface";

export  interface IStudentCard {
  name:string,
  last_name:string,
  group:string,
  marks:IMarksInterface[],
}
