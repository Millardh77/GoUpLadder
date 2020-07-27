import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../_services/balance.service';

@Component({
  selector: 'app-balance-visitor',
  templateUrl: './balance-visitor.component.html',
  styleUrls: ['./balance-visitor.component.css']
})
export class BalanceVisitorComponent implements OnInit {
  greetings = '';
  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [
    { data: [45, 45], label: 'Simulated Balance' }
  ];

  public chartLabels: Array<any> = ['The World', 'Me'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(75, 192, 192, 0.2)'
    
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(75, 192, 192, 1)'
        
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  constructor(private balanceService: BalanceService) { }

  ngOnInit() {
    // this.balanceService.sayHello()
    //   .subscribe(
    //   result => {
    //     this.greetings = result;
    //   }
    //   );
  }
}
