import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  private apiUrl = 'http://localhost:8083/measurements'; // Replace with your measurement microservice URL

  constructor(private http: HttpClient) {}

  createMeasurement(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
