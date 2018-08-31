import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { data } from '../app/ProjectAndTracks';
import { Data1 } from '../app/data';
import { Data } from '../app/EntityClasses/Data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  private URL: string = 'http://localhost:50534///api/GetTaskDetails';

  getData(): Observable<Data1[]> {
    return of(data);
  }

  getDataFromDataBase():Observable<Data> {
     return this.http.get<Data>(this.URL);
   }
  constructor(private http: HttpClient) { }
}
