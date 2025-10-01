import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientHistoryService {
  private apiUrl = 'http://localhost:3001/api/patients';

  constructor(private http: HttpClient) {}

  getPatients(): Observable<{ success: boolean; patients: any[] }> {
    return this.http.get<{ success: boolean; patients: any[] }>(this.apiUrl);
  }
}
