export interface Student {
    id            : number,
    name          : string;
    gpaByYear     : Map<number, number>;
    yearsAttended : number[]
  }
  