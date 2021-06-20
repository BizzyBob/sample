import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolYearComponent } from './school-year/school-year.component';

const routes: Routes = [
  { path: 'school-year', component: SchoolYearComponent },
  { path: '**', redirectTo: 'school-year' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
