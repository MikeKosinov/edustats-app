export interface IMarksInterface{
  semester: number;
  discipline: string;
  type_of_control: 'екзамен' | 'залік';
  mark: number;
  teacher: string;
  date: string;
}
