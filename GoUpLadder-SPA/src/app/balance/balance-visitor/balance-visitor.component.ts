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
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' }
  ];
  
  public chartLabels: Array<any> = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  updateOnlyDatasets() {
    const firstChartData = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    // This line will update only data in your Chart
    this.chartDatasets = [
      { data: firstChartData },
  
    ];
  }

  // tslint:disable-next-line: member-ordering
  public summaries: any = this.chartDatasets;

  constructor(private balanceService: BalanceService) { }

  ngOnInit() {
    // this.balanceService.sayHello()
    //   .subscribe(
    //   result => {
    //     this.greetings = result;
    //   }
    //   );
  }
 public cacheDatasets:Array<any> = [
  { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' }
];


  filterTest(filterVal: any) {
    if (filterVal == "0")
        this.chartDatasets = this.cacheDatasets;
    else
        this.chartDatasets = this.cacheDatasets.filter((item) => item == filterVal);
}
}
