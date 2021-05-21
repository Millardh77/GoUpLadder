import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
 

  constructor(private http: HttpClient, private router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
   
  }

  // tslint:disable-next-line: typedef
  registerToggle() {
    this.registerMode = !this.registerMode;
  }
 
  // tslint:disable-next-line: typedef
  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}
