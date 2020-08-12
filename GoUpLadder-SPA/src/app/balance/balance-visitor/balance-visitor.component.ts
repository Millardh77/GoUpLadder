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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BalanceVisitorComponent),
      multi: true,
    },
  ],
})
export class BalanceVisitorComponent implements OnInit, ControlValueAccessor {
  // dropdownControl = new FormControl(null, Validators.required);

  selectedOption: string;
  selectedOption1: string;
  selectedOption2: string;
  selectedOption3: string;
  selectedOption4: string;
  selectedOption5: string;
  selectedOption6: string;
  selectedOption7: string;

  balanceOptions: Array<any> = new Array(
    { optionIndex: 1, optionSelected: false, newWeight: 0, oldWeight: 0 },
    { optionIndex: 2, optionSelected: false, newWeight: 0, oldWeight: 0 },
    { optionIndex: 3, optionSelected: false, newWeight: 0, oldWeight: 0 },
    { optionIndex: 4, optionSelected: false, newWeight: 0, oldWeight: 0 },
    { optionIndex: 5, optionSelected: false, newWeight: 0, oldWeight: 0 },
    { optionIndex: 6, optionSelected: false, newWeight: 0, oldWeight: 0 },
    { optionIndex: 7, optionSelected: false, newWeight: 0, oldWeight: 0 }
  );

  option1Selected: boolean;
  option2Selected: boolean;
  option3Selected: boolean;
  option4Selected: boolean;
  option5Selected: boolean;
  option6Selected: boolean;
  option7Selected: boolean;

  onChange: (_: any) => {};

  greetings = '';
  measures: any;
  public measures1: any;
  public measures2: any;
  public measures3: any;
  public measures4: any;
  public measures5: any;
  public measures6: any;
  public measures7: any;

  types: any;
  measureId: any;
  public chartType: string = 'bar';
  baseUrl = environment.apiUrl;

  public chartDatasets: Array<any> = new Array({
    data: [0, 100],
    label: 'Balance Simulation',
  });

  public chartLabels: Array<any> = ['Me', 'The World'];
  // public cachedDatasets: Array<any> = [];
  public cachedDatasets: any;
  public chartColors: Array<any> = [
    {
      backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255,99,132,1)'],
      borderWidth: 2,
    },
  ];

  public chartOptions: any = {
    responsive: true,
  };
  public chartClicked(e: any): void {}
  public chartHovered(e: any): void {}

  // tslint:disable-next-line: member-ordering
  constructor(
    private balanceService: BalanceService,
    private alertify: AlertifyService,
    private http: HttpClient
  ) {
    this.cachedDatasets = this.chartDatasets;
  }

  ngOnInit() {
    this.selectedOption = 'Select Option';
    this.selectedOption1 = 'Select Option';
    this.selectedOption2 = 'Select Option';
    this.selectedOption3 = 'Select Option';
    this.selectedOption4 = 'Select Option';
    this.selectedOption5 = 'Select Option';
    this.selectedOption6 = 'Select Option';
    this.selectedOption7 = 'Select Option';

    this.processMeasures();
  }

  loadAllMeasures(filterVal: any) {
    this.measures = this.balanceService.getAllMeasures();
  }

  processMeasures() {
    const testType = this.getAllMeasureTypes();
  }
  getMeasures(filterVal: any) {
    // this.measureId = filterVal;
    this.balanceService.getMeasures(filterVal).subscribe(
      (res) => {
        // this.measures = result.result;
        switch (filterVal) {
          case 1:
            this.measures1 = res;
            for (let index = 0; index < this.measures1.length; index++) {
              this.measures1[index].index = index + 1;
            }
            console.log(this.measures1);
            return this.measures1;
            break;
          case 2:
            this.measures2 = res;
            for (let index = 0; index < this.measures2.length; index++) {
              this.measures2[index].index = index + 1;
            }
            console.log(this.measures2);
            return this.measures2;
            break;
          case 3:
            this.measures3 = res;
            for (let index = 0; index < this.measures3.length; index++) {
              this.measures3[index].index = index + 1;
            }
            console.log(this.measures3);
            return this.measures3;
            break;
          case 4:
            this.measures4 = res;
            for (let index = 0; index < this.measures4.length; index++) {
              this.measures4[index].index = index + 1;
            }
            console.log(this.measures4);
            return this.measures4;
            break;
          case 5:
            this.measures5 = res;
            for (let index = 0; index < this.measures5.length; index++) {
              this.measures5[index].index = index + 1;
            }
            console.log(this.measures5);
            return this.measures5;
            break;
          case 6:
            this.measures6 = res;
            for (let index = 0; index < this.measures6.length; index++) {
              this.measures6[index].index = index + 1;
            }
            console.log(this.measures6);
            return this.measures6;
            break;
          case 7:
            this.measures7 = res;
            for (let index = 0; index < this.measures7.length; index++) {
              this.measures7[index].index = index + 1;
            }
            console.log(this.measures7);
            return this.measures7;
            break;
          default:
            break;
        }
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
  processMeasure1() {}
  processMeasure2() {}
  processMeasure3() {}
  processMeasure4() {}
  processMeasure5() {}
  processMeasure6() {}
  processMeasure7() {}

  getAllMeasures() {
    //this.http.get<Measure[]>(this.baseUrl + 'measures').subscribe(response => {
    this.balanceService.getAllMeasures().subscribe(
      (res) => {
        this.measures = res;
      },
      (error) => {
        console.log(error);
      }
    );
    return this.measures1;
  }

  getAllMeasureTypes() {
    //this.http.get<Measuretype[]>(this.baseUrl + 'measures/types').subscribe(response => {
    this.balanceService.getMeasureTypes().subscribe(
      (res) => {
        this.types = res;
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
            case 5:
              this.processMeasure5();
              break;
            case 6:
              this.processMeasure6();
              break;
            case 7:
              this.processMeasure7();
              break;
            default:
              break;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
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
      case '5':
        this.selectedOption5 = value;
        break;
      case '6':
        this.selectedOption6 = value;
        break;
      case '7':
        this.selectedOption7 = value;
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
    console.log(
      'changeOption1:' + option + ' Add weight: ' + weight,
      this.option1Selected
    );
  }
  changeSelectedOption2(option: string, weight: number) {
    this.selectedOption2 = option;
    this.balanceOptions[1].optionSelected = true;
    this.balanceOptions[1].newWeight = weight;
    this.updateChartData(1);
    this.option2Selected = true;
    console.log(
      'changeOption2:' + option + ' Add weight: ' + weight,
      this.option2Selected
    );
  }
  changeSelectedOption3(option: string, weight: number) {
    this.selectedOption3 = option;
    this.balanceOptions[2].optionSelected = true;
    this.balanceOptions[2].newWeight = weight;
    this.updateChartData(2);
    this.option3Selected = true;

    console.log(
      'changeOption3:' + option + ' Add weight: ' + weight,
      this.option3Selected
    );
  }
  changeSelectedOption4(option: string, weight: number) {
    this.selectedOption4 = option;
    this.balanceOptions[3].optionSelected = true;
    this.balanceOptions[3].newWeight = weight;
    this.updateChartData(3);
    this.option4Selected = true;

    console.log(
      'changeOption4:' + option + ' Add weight: ' + weight,
      this.option4Selected
    );
  }
  changeSelectedOption5(option: string, weight: number) {
    this.selectedOption5 = option;
    this.balanceOptions[4].optionSelected = true;
    this.balanceOptions[4].newWeight = weight;
    this.updateChartData(4);
    this.option5Selected = true;

    console.log(
      'changeOption5:' + option + ' Add weight: ' + weight,
      this.option5Selected
    );
  }
  changeSelectedOption6(option: string, weight: number) {
    this.selectedOption6 = option;
    this.balanceOptions[5].optionSelected = true;
    this.balanceOptions[5].newWeight = weight;
    this.updateChartData(5);
    this.option6Selected = true;

    console.log(
      'changeOption6:' + option + ' Add weight: ' + weight,
      this.option6Selected
    );
  }
  changeSelectedOption7(option: string, weight: number) {
    this.selectedOption7 = option;
    this.balanceOptions[6].optionSelected = true;
    this.balanceOptions[6].newWeight = weight;
    this.updateChartData(6);
    this.option7Selected = true;

    console.log(
      'changeOption7:' + option + ' Add weight: ' + weight,
      this.option7Selected
    );
  }
  updateChartData(option: number) {
    console.log(
      'cacheddataset:',
      this.cachedDatasets,
      this.cachedDatasets[0].data[0]
    );
    const myWeight =
      this.cachedDatasets[0].data[0] >= 100
        ? this.cachedDatasets[0].data[0]
        : this.cachedDatasets[0].data[0] +
          this.balanceOptions[option].newWeight -
          this.balanceOptions[option].oldWeight;
    const worldWeight =
      this.cachedDatasets[0].data[1] <= 0
        ? this.cachedDatasets[0].data[1]
        : this.cachedDatasets[0].data[1] -
          this.balanceOptions[option].newWeight +
          this.balanceOptions[option].oldWeight;
    const firstChartData = [myWeight, worldWeight];
    // This line will update only data in your Chart
    this.chartDatasets = [{ data: firstChartData }];

    console.log(
      'updatedchartDatasets: ',
      this.chartDatasets,
      firstChartData,
      this.balanceOptions[option].newWeight,
      this.balanceOptions[option].oldWeight
    );

    this.balanceOptions[option].oldWeight = this.balanceOptions[
      option
    ].newWeight;
    this.balanceOptions[option].newWeight = 0;
    this.cachedDatasets = this.chartDatasets;
  }

  registerOnTouched() {}

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
