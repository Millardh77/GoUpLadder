import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Measure } from '../_models/measure';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  measures: any;

  baseUrl = environment.apiUrl;
  // Resolve HTTP using the constructor
  constructor(private http: HttpClient) { }

  getMeasures(id){
    this.http.get<Measure[]>(this.baseUrl + 'measures/' + id).subscribe(response => {
      this.measures = response;
    }, error => {
      console.log(error);
    });
    return this.measures;
  }

  getAllMeasures() {
    this.http.get<Measure[]>(this.baseUrl + 'measures').subscribe(response => {
      this.measures = response;
    }, error => {
      console.log(error);
    });
    return this.measures;
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
