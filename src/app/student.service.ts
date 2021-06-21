import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private api = 'http://apitest.sertifi.net/api';

  constructor(private http: HttpClient) { }

  public getStudents() {
    return this.http.get<StudentDto[]>(`${this.api}/Students`).pipe(
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
