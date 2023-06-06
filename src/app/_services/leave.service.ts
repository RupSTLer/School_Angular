import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Leave } from '../entities/leave';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

    //baseURL for our REST endpoints
    baseURL = "http://localhost:9004/leave";

    constructor(private http: HttpClient) { }
  
    // Observable<Object>
    applyLeave(leave: Leave)  {
      return this.http.post(`${this.baseURL}/applyLeave`, leave, {responseType: 'text'});
    }
  
    getLeaveDetailsByStudentId(studentId: string): Observable<Leave[]> {
      return this.http.get<Leave[]>(`${this.baseURL}/getLeaveDetailsByStudentId/${studentId}`);
    }

    listLeaves(): Observable<Leave[]> {
      return this.http.get<Leave[]>(`${this.baseURL}/listLeaves`);
    }

    updateLeave(leave: Leave): Observable<Object> {
      return this.http.put(`${this.baseURL}/updateLeave`, leave, {responseType: 'text'});
    }
    
    approveLeave(id: number)
    {
      return this.http.put(`${this.baseURL}/approve/${id}`, { responseType: 'text' });
    }

    rejectLeave(id: number)
    {
      return this.http.put(`${this.baseURL}/reject/${id}`, { responseType: 'text' });
    }

}
