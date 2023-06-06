import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../entities/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

   //baseURL for our REST endpoints
  baseURL = "http://localhost:9006/message";

  constructor(private http: HttpClient) { }

  addMessage(msg: Message): Observable<Object> {
    return this.http.post(`${this.baseURL}/addMsg`, msg);
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseURL}/getAllMsgs`);
  }

  getMsgBySenderId(senderId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseURL}/getMsgBySenderId/${senderId}`)
  }

  
}
