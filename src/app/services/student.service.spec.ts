import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { StudentService } from './student.service';
import { StudentDto, Student } from '../models';

describe('[StudentService]', () => {
  let service: StudentService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ 
        StudentService,
        { provide: HttpClient, useValue: jasmine.createSpyObj<HttpClient>(['get']) }
      ]
    });

    service = TestBed.inject(StudentService);
    httpSpy = TestBed.inject<any>(HttpClient); 
  });

  describe('INIT', () => {
    it('should create the service', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('METHOD: getStudents', () => {
    
    beforeEach(() => httpSpy.get.and.returnValue(of(fakeStudentDtos)));

    it('should call the correct endpoint', done => {
      service.getStudents().subscribe(() => {
        expect(httpSpy.get).toHaveBeenCalledWith('http://apitest.sertifi.net/api/Students');
        done();
      });
    });

    it('should return array of students', done => {
      service.getStudents().subscribe(students => {
        expect(students).toEqual(expectedStudents);
        done();
      });
    });

  });
});

const fakeStudentDtos: StudentDto[] = [
  { Id: 1, Name: 'Fake Student', GPARecord: [1.1, 2.2, 3.3, 4.4], StartYear: 2001, EndYear: 2004 }
];

const expectedStudents: Student[] = [{ 
  id: 1, 
  name: 'Fake Student', 
  gpaByYear: new Map([[2001, 1.1], [2002, 2.2], [2003, 3.3], [2004, 4.4]]), 
  yearsAttended: [2001, 2002, 2003, 2004]
}];