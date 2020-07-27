import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  baseUrl = environment.apiUrl;
  // Resolve HTTP using the constructor
  constructor(private http: HttpClient) { }

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
