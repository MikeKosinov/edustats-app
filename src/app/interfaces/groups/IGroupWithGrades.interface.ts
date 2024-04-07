export interface IGroupWithGrades {
  group: string;
  grades: {
    '90-100': number;
    '82-89': number;
    '73-81': number;
    '64-72': number;
    '60-63': number;
    'не склав': number;
  };
}

