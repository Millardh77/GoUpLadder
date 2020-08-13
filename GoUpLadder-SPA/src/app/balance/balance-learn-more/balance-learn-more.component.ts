import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-balance-learn-more',
  templateUrl: './balance-learn-more.component.html',
  styleUrls: ['./balance-learn-more.component.css']
})
export class BalanceLearnMoreComponent implements OnInit {

  registerMode = false;

  constructor(private http: HttpClient, private router: Router) { }

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
