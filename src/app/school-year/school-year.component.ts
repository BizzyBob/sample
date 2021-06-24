import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Student } from '../models';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-school-year',
  templateUrl: './school-year.component.html',
  styleUrls: ['./school-year.component.sass']
})
export class SchoolYearComponent {

  private year$ = new Subject<number>();
  
  @ViewChild(MatDrawer) drawer!: MatDrawer;

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

  public details$ = combineLatest([this.year$, this.statsByYear$]).pipe(
    map(([year, stats]) => stats.find(s => s.year === year)),
    tap(() => this.drawer.open())
  );

  public selectYear(year: number) {
    this.year$.next(year);
  }

  constructor(private studentService: StudentService) { }

}

interface SchoolYearSummary {
  year       : number;
  students   : Student[];
  averageGpa : number;
}
