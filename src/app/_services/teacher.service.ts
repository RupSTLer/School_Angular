import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from '../entities/teacher';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

    //baseURL for our REST endpoints
    baseURL = "http://localhost:9002/teacher";
  
    constructor(private http: HttpClient) { }

    addTeacher(teacher:Teacher): Observable<Object>{
      return this.http.post(`${this.baseURL}/addTeacher`,teacher, {responseType: 'text'});
    }

    updateTeacher(teacherId: string,teacher: Teacher): Observable<Object>{
      return this.http.put(`${this.baseURL}/${teacherId}`,teacher);
    }

    getTeacherByTeacherId(teacherId: string): Observable<Teacher> {
      return this.http.get<Teacher>(`${this.baseURL}/${teacherId}`);
    }
  
    listAllTeachers(): Observable<Teacher[]>{
      return this.http.get<Teacher[]>(`${this.baseURL}/listTeachers`);
    }
  
    deleteTeacher(teacherId: string): Observable<Object> {
      return this.http.delete(`${this.baseURL}/${teacherId}`,{ responseType: 'text'});
    }
  
    countTeacher(): Observable<any>{
      return this.http.get(`${this.baseURL}/countTeacher`, {responseType: 'text'});
    }
}
