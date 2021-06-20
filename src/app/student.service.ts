import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public getStudents() {
    return of(FAKE_STUDENTS).pipe(
      map(dtos => dtos.map(transform))
    );
  }

}

interface StudentDto {
  Id        : number;
  Name      : string;
  StartYear : number;
  EndYear   : number;
  GPARecord : number[];
}

export interface Student {
  id            : number,
  name          : string;
  gpaByYear     : Map<number, number>;
  yearsAttended : number[]
}

function transform(dto: StudentDto): Student {
  const gpaMap = new Map<number, number>();
  dto.GPARecord.forEach((gpa, i) => gpaMap.set(dto.StartYear + i, gpa));
  const yearsAttended = dto.GPARecord.map((gpa, i) => dto.StartYear + i);

  return {
    id        : dto.Id,
    name      : dto.Name,
    gpaByYear : gpaMap,
    yearsAttended
  };
} 

const FAKE_STUDENTS: StudentDto[] = [
  {
      "Id": 1,
      "Name": "Jack",
      "StartYear": 2013,
      "EndYear": 2016,
      "GPARecord": [ 3.4, 2.1, 1.2, 3.6 ]
  },
  {
      "Id": 2,
      "Name": "Jill",
      "StartYear": 2010,
      "EndYear": 2013,
      "GPARecord": [ 3.3, 2.3, 1.1, 3.7 ]
  }
];
