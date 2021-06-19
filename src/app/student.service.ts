import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public getStudents() {
    return of(FAKE_STUDENTS);
  }

}

interface Student {
  Id        : number;
  Name      : string;
  StartYear : number;
  EndYear   : number;
  GPARecord : number[];
}

const FAKE_STUDENTS: Student[] = [
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
