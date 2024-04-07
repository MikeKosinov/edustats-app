import {IStudentCard} from "../interfaces/students/IStudentCard.interface";
import {IStudent} from "../interfaces/students/IStudent.interface";
import {IMarksInterface} from "../interfaces/marks/IMarks.interface";

export class StudentDataFormatter{
  constructor() {
  }

  static transformToStudentCards(students: IStudent[]): IStudentCard[] {
    const studentCardsMap = new Map<string, IStudentCard>();

    students.forEach(student => {
      const key = `${student.name}-${student.last_name}-${student.group}`;

      if (!studentCardsMap.has(key)) {
        const studentCard: IStudentCard = {
          name: student.name,
          last_name: student.last_name,
          group: student.group,
          marks: [],
        };
        studentCardsMap.set(key, studentCard);
      }

      const studentCard = studentCardsMap.get(key);

      if (studentCard) {
        const mark: IMarksInterface = {
          semester: student.semester,
          discipline: student.discipline,
          type_of_control: student.type_of_control,
          mark: student.mark,
          teacher: student.teacher,
          date: student.date,
        };
        studentCard.marks.push(mark);
      }
    });
    return Array.from(studentCardsMap.values());
  }
}
