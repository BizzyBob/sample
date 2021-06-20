import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentService, Student } from '../student.service';

@Component({
  selector: 'app-school-year',
  templateUrl: './school-year.component.html',
  styleUrls: ['./school-year.component.sass']
})
export class SchoolYearComponent {

  public columns = ['year', 'attendence', 'gpa'];

  public statsByYear$: Observable<SchoolYearSummary[]> = this.studentService.getStudents().pipe(
    map(allStudents => {
      const allYears = allStudents.reduce<number[]>((all, s) => all.concat(s.yearsAttended), []);
      const uniqueYears = [... new Set(allYears)].sort();
      
      return uniqueYears.map(year => {
        const students = allStudents.filter(s => s.yearsAttended.some(y => y === year));
        const totalGpa = students.reduce((sum, s) => sum + s.gpaByYear.get(year)!, 0);

        return {
          year,
          students,
          averageGpa: totalGpa / students.length,
        };
      });
    })
  );

  constructor(private studentService: StudentService) { }

}

interface SchoolYearSummary {
  year       : number;
  students   : Student[];
  averageGpa : number;
}
