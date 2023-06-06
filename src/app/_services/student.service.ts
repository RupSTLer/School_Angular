import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Student } from '../entities/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  //baseURL for our REST endpoints
  baseURL = "http://localhost:9003/student";

  constructor(private httpClient: HttpClient) { }

  // Observable<Object>
  addStudent(student: Student)  {
    return this.httpClient.post(`${this.baseURL}/addStudent`, student, {responseType: 'text'});
  }

  updateStudent(studentId: string, student: Student): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${studentId}`, student);
  }

  getStudentByStudentId(studentId: string): Observable<Student> {
    return this.httpClient.get<Student>(`${this.baseURL}/${studentId}`);
  }

  listAllStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseURL}/listStudents`);
  }

  deleteStudent(studentId: string): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${studentId}`, { responseType: 'text' });
  }

  countStudent(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/countStudent`, { responseType: 'text' });
  }


  // getStudentById(id: number): Observable<Student> {
  //   return this.httpClient.get<Student>(`${this.baseURL}/${id}`);
  // }

}

