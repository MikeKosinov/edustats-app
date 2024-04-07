export  interface IStudent {
  name:string,
  last_name:string,
  group:string,
  semester:number,
  discipline:string,
  type_of_control:  'екзамен'|'залік',
  mark:number,
  teacher:string,
  date:string
}
