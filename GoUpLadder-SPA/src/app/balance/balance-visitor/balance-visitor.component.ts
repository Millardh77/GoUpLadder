import { Component, OnInit, forwardRef } from '@angular/core';
import { BalanceService } from '../../_services/balance.service';
import { Measure } from '../../_models/measure';
import { Measuretype } from '../../_models/measuretype';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-balance-visitor',
  templateUrl: './balance-visitor.component.html',
  styleUrls: ['./balance-visitor.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BalanceVisitorComponent),
    multi: true,
  }]
})
export class BalanceVisitorComponent implements OnInit, ControlValueAccessor {
  // dropdownControl = new FormControl(null, Validators.required);
  
  

  selectedOption: string;
  selectedOption1: string;
  selectedOption2: string;
  selectedOption3: string;
  selectedOption4: string;

  balanceOptions: Array<any> = new Array({ optionIndex: 1, optionSelected: false, newWeight: 0, oldWeight: 0},
    { optionIndex: 2, optionSelected: false, newWeight: 0, oldWeight: 0},
    { optionIndex: 3, optionSelected: false, newWeight: 0, oldWeight: 0},
    { optionIndex: 4, optionSelected: false, newWeight: 0, oldWeight: 0});

  option1Selected: boolean;
  option2Selected: boolean;
  option3Selected: boolean;
  option4Selected: boolean;


  onChange: (_: any) => {};

  greetings = '';
  measures: any;
  public measures1: any;
  public measures2: any;
  public measures3: any;
  public measures4: any;
  types: any;
  measureId: any;
  public chartType: string = 'bar';
  baseUrl = environment.apiUrl;

   public chartDatasets: Array<any> = new Array(
    { data: [0, 100], label: 'Balance Simulation' }
  );
  
  public chartLabels: Array<any> = ['Me', 'The World'];
  // public cachedDatasets: Array<any> = [];
  public cachedDatasets: any;
  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)'
       ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255,99,132,1)'
       ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

   // tslint:disable-next-line: member-ordering
   constructor(private balanceService: BalanceService, private alertify: AlertifyService, private http: HttpClient) { 
    this.cachedDatasets = this.chartDatasets;
  }

  ngOnInit() {
    this.selectedOption = "Select Option";
    this.selectedOption1 = "Select Option";
    this.selectedOption2 = "Select Option";
    this.selectedOption3 = "Select Option";
    this.selectedOption4 = "Select Option";
    
    this.processMeasures();
  }

  loadAllMeasures(filterVal: any) {
    this.measures = this.balanceService.getAllMeasures();
   } 

   processMeasures() {
     const testType = this.getAllMeasureTypes();
   
   }

   processMeasure1() {
    }
   processMeasure2() {
    }
  processMeasure3() {
     }
  processMeasure4() {
   }

   getMeasures(filterVal: any){
    this.http.get<Measure[]>(this.baseUrl + 'measures/' + filterVal).subscribe(response => {
      switch (filterVal) {
        case 1:
          this.measures1 = response;
          for (let index = 0; index < this.measures1.length; index++) {
            this.measures1[index].index = index + 1;
           }
           console.log(this.measures1);
          return this.measures1;
          break;
        case 2:
          this.measures2 = response;
          for (let index = 0; index < this.measures2.length; index++) {
            this.measures2[index].index = index + 1;
           }
           console.log(this.measures2);
          return this.measures2;
          break;
        case 3:
          this.measures3 = response;
          for (let index = 0; index < this.measures3.length; index++) {
            this.measures3[index].index = index + 1;
           }
           console.log(this.measures3);
          return this.measures3;
          break;
        case 4:
          this.measures4 = response;
          for (let index = 0; index < this.measures4.length; index++) {
            this.measures4[index].index = index + 1;
           }
           console.log(this.measures4);
          return this.measures4;
          break;
        default:
          break;
      }
    }, error => {
      console.log(error);
    });
    return this.measures1;
  }

   getAllMeasures() {
    this.http.get<Measure[]>(this.baseUrl + 'measures').subscribe(response => {
      this.measures1 = response;
    }, error => {
      console.log(error);
    });
    return this.measures1;
  }

  getAllMeasureTypes() {
    this.http.get<Measuretype[]>(this.baseUrl + 'measures/types').subscribe(response => {
      this.types = response;
      console.log(this.types);
      for (let index = 0; index < this.types.length; index++) {
        const element = this.types[index];
        console.log('In for', element);
        this.getMeasures(element.id);
        switch (index) {
          case 1:
            this.processMeasure1();
            break;
          case 2:
            this.processMeasure2();
            break;
          case 3:
            this.processMeasure3();
            break;
          case 4:
            this.processMeasure4();
            break;
          default:
            break;
        }
      }
    }, error => {
      console.log(error);
    });
    return this.types;
  }
  writeValue(value: string) {
    switch (value) {
      case '1':
        this.selectedOption1 = value;
        console.log('writeValue:' + value);
        break;
      case '2':
          this.selectedOption2 = value;
          break;
      case '3':
        this.selectedOption3 = value;
        break;
      case '4':
        this.selectedOption4 = value;
        break;
      default:
        break;
    }
     
  }

  registerOnChange(fn: (_: any) => {}) {
    this.onChange = fn;
  }
  changeSelectedOption1(option: string, weight: number) {
        this.selectedOption1 = option;
        console.log('balanceOptions: ', this.balanceOptions);
        this.balanceOptions[0].optionSelected = true;
        this.balanceOptions[0].newWeight = weight;
        this.updateChartData(0);
        this.option1Selected = true;
        console.log('changeOption1:' + option + ' Add weight: ' + weight, this.option1Selected);
  }
  changeSelectedOption2(option: string, weight: number) {
      this.selectedOption2 = option;
      this.balanceOptions[1].optionSelected = true;
        this.balanceOptions[1].newWeight = weight;
        this.updateChartData(1);
      this.option2Selected = true;
      console.log('changeOption2:' + option + ' Add weight: ' + weight, this.option2Selected);
  }
  changeSelectedOption3(option: string, weight: number) {
    this.selectedOption3 = option;
    this.balanceOptions[2].optionSelected = true;
        this.balanceOptions[2].newWeight = weight;
        this.updateChartData(2);
    this.option3Selected = true;
    
    console.log('changeOption3:' + option + ' Add weight: ' + weight, this.option3Selected);
  }
 changeSelectedOption4(option: string, weight: number) {
  this.selectedOption4 = option;
  this.balanceOptions[3].optionSelected = true;
  this.balanceOptions[3].newWeight = weight;
  this.updateChartData(3);
  this.option4Selected = true;
  
  console.log('changeOption4:' + option + ' Add weight: ' + weight, this.option4Selected);
  }
  updateChartData(option: number) {
    console.log('cacheddataset:', this.cachedDatasets, this.cachedDatasets[0].data[0]);
    const myWeight = this.cachedDatasets[0].data[0] >= 100
        ? this.cachedDatasets[0].data[0]
        : this.cachedDatasets[0].data[0] + this.balanceOptions[option].newWeight - this.balanceOptions[option].oldWeight;
    const worldWeight = this.cachedDatasets[0].data[1] <= 0
        ? this.cachedDatasets[0].data[1]
        : this.cachedDatasets[0].data[1] - this.balanceOptions[option].newWeight + this.balanceOptions[option].oldWeight;
    const firstChartData = [
      myWeight, worldWeight
      ];
    // This line will update only data in your Chart
    this.chartDatasets = [
      { data: firstChartData }
    ];

    console.log('updatedchartDatasets: ', this.chartDatasets, firstChartData,
    this.balanceOptions[option].newWeight, this.balanceOptions[option].oldWeight);

    this.balanceOptions[option].oldWeight = this.balanceOptions[option].newWeight;
    this.balanceOptions[option].newWeight = 0;
    this.cachedDatasets = this.chartDatasets;
  }

  registerOnTouched() { }

  onHidden(): void {
    console.log('Dropdown is hidden');
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }
}
