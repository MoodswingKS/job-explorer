export interface SalaryRange {
  min: number;
  max: number;
}

export interface JobFunction {
  id: string;
  title: string;
  group: string;
  department: string;
  level: number;
  employeeCount: number;
  description: string;
  salary: SalaryRange;
  skills: string[];
  relatedFunctionIds: string[];
}
