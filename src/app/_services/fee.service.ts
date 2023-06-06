import { Injectable } from '@angular/core';
import { Fee } from '../entities/fee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  baseURL = "http://localhost:9005/fees";

    constructor(private http: HttpClient) { }
  
    // : Observable<Object>
    payFees(fee: Fee) {
      return this.http.post(`${this.baseURL}/payFees`, fee, {responseType: 'text'});
    }
  
    getFeesDetails(id: number): Observable<Fee> {
      return this.http.get<Fee>(`${this.baseURL}/getFeesDetails/${id}`);
    }

    updateFees(fee: Fee): Observable<Object> {
      return this.http.put(`${this.baseURL}/updateFee`, fee);
    }
    
    getFeesByStudentId(studentId: string): Observable<Fee[]> {
      return this.http.get<Fee[]>(`${this.baseURL}/getFeesByStudentId/${studentId}`);
    }

    listFees(): Observable<Fee[]> {
      return this.http.get<Fee[]>(`${this.baseURL}/listFees`);
    }

}
