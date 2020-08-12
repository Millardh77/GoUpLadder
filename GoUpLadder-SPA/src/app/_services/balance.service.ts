import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Measure } from '../_models/measure';
import { Measuretype } from '../_models/measuretype';
import { Usermeasure } from '../_models/usermeasure';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  measures: any;

  baseUrl = environment.apiUrl;
  // Resolve HTTP using the constructor
  constructor(private http: HttpClient) { }

  getMeasures(id: number){
    return this.http.get<Measure[]>(this.baseUrl + 'measures/' + id );
   }
  
  getMeasureTypes() {
    return this.http.get<Measuretype[]>(this.baseUrl + 'measures/types');
   }

  getAllMeasures() {
    return this.http.get<Measure[]>(this.baseUrl + 'measures');
  }

  getUserMeasures(id: number) {
    return this.http.get<Usermeasure[]>(this.baseUrl + 'users/' + id + '/usermeasures')
  }

 
  sayHello(): Observable<any> {
    return this.http.get(this.baseUrl + 'hello')
    .pipe (
      map(response => {
      return response.toString();
    }, error => {
      console.log(error);
    })
    );
  }
}
