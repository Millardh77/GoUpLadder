import { Component, OnInit, forwardRef } from '@angular/core';
import { BalanceService } from '../../_services/balance.service';
import { Measure } from '../../_models/measure';
import { Measuretype } from '../../_models/measuretype';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Usermeasure } from 'src/app/_models/usermeasure';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-balance-member',
  templateUrl: './balance-member.component.html',
  styleUrls: ['./balance-member.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BalanceMemberComponent),
      multi: true,
    },
  ],
})
export class BalanceMemberComponent implements OnInit, ControlValueAccessor {
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
  user: User;
  public usermeasures: any;
  newUserMeasure: any = {};

  onChange: (_: any) => {};

  greetings = '';
  measures: any;

  measures1: Measure[];
  measures2: Measure[];
  measures3: Measure[];
  measures4: Measure[];
  measures5: Measure[];
  measures6: Measure[];
  measures7: Measure[];
  types: any;
  measureId: any;
  public chartType: string = 'bar';
  baseUrl = environment.apiUrl;

  public chartDatasets: Array<any> = new Array({
    data: [0, 100],
    label: 'Your Balance',
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
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public chartClicked(e: any): void {}
  public chartHovered(e: any): void {}

  // tslint:disable-next-line: member-ordering
  constructor(
    private route: ActivatedRoute,
    private balanceService: BalanceService,
    private alertify: AlertifyService,
    private http: HttpClient,
    private userService: UserService,
    private authService: AuthService
  ) {
    //this.user =  JSON.parse(localStorage.getItem('user'));
    this.cachedDatasets = this.chartDatasets;
  }
  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data['user'];
    });

    this.usermeasures = this.user['userMeasures'];
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

  // processMeasure1(element: Usermeasure) {
  //   this.changeSelectedOption1(
  //     this.measures1.filter((x) => x.measureIndex === element.measureIndex)[0]
  //       ?.description,
  //     +element.weight
  //   );
  // }
  // processMeasure2(element: Usermeasure) {
  //   this.changeSelectedOption2(
  //     this.measures2.filter((x) => x.measureIndex === element.measureIndex)[1]
  //       ?.description,
  //     +element.weight
  //   );
  // }
  // processMeasure3(element: Usermeasure) {
  //   this.changeSelectedOption3(
  //     this.measures3.filter((x) => x.measureIndex === element.measureIndex)[2]
  //       ?.description,
  //     +element.weight
  //   );
  // }
  // processMeasure4(element: Usermeasure) {
  //   this.changeSelectedOption4(
  //     this.measures4.filter((x) => x.measureIndex === element.measureIndex)[3]
  //       ?.description,
  //     +element.weight
  //   );
  // }

  getMeasures(filterVal: any) {
    this.balanceService.getMeasures(filterVal).subscribe(
      (res) => {
        let arrayNum: any;
        switch (filterVal) {
          case 1:
            this.measures1 = res;
            console.log(this.measures1);
            arrayNum = this.usermeasures[
              this.usermeasures.findIndex((i) => i.measureTypeId === 1)
            ];
            if (arrayNum != null) {
              this.initializeOptions(arrayNum, filterVal);
            }
            return this.measures1;
            break;
          case 2:
            this.measures2 = res;
            console.log(this.measures2);
            arrayNum = this.usermeasures[
              this.usermeasures.findIndex((i) => i.measureTypeId === 2)
            ];
            if (arrayNum != null) {
              this.initializeOptions(arrayNum, filterVal);
            }
            return this.measures2;
            break;
          case 3:
            this.measures3 = res;
            console.log(this.measures3);
            arrayNum = this.usermeasures[
              this.usermeasures.findIndex((i) => i.measureTypeId === 3)
            ];
            if (arrayNum != null) {
              this.initializeOptions(arrayNum, filterVal);
            }
            return this.measures3;
            break;
          case 4:
            this.measures4 = res;
            console.log(this.measures4);
            arrayNum = this.usermeasures[
              this.usermeasures.findIndex((i) => i.measureTypeId === 4)
            ];
            if (arrayNum != null) {
              this.initializeOptions(arrayNum, filterVal);
            }
            return this.measures4;
            break;
          case 5:
            this.measures5 = res;
            console.log(this.measures5);
            arrayNum = this.usermeasures[
              this.usermeasures.findIndex((i) => i.measureTypeId === 5)
            ];
            if (arrayNum != null) {
              this.initializeOptions(arrayNum, filterVal);
            }
            return this.measures5;
            break;

          case 6:
            this.measures6 = res;
            console.log(this.measures6);
            arrayNum = this.usermeasures[
              this.usermeasures.findIndex((i) => i.measureTypeId === 6)
            ];
            if (arrayNum != null) {
              this.initializeOptions(arrayNum, filterVal);
            }
            return this.measures6;
            break;
          case 7:
            this.measures7 = res;
            console.log(this.measures7);
            arrayNum = this.usermeasures[
              this.usermeasures.findIndex((i) => i.measureTypeId === 7)
            ];
            if (arrayNum != null) {
              this.initializeOptions(arrayNum, filterVal);
            }
            return this.measures7;
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  
  }

  getAllMeasureTypes() {
    this.balanceService.getMeasureTypes().subscribe(
      (res) => {
        this.types = res;
        console.log(this.types);
        for (let index = 0; index < this.types.length; index++) {
          const element = this.types[index];
          console.log('In get all measure types for', element);
          this.getMeasures(element.id);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    return this.types;
  }
  getUserMeasures() {
    this.userService.getUserMeasures(this.user.id).subscribe(
      (res) => {
        this.usermeasures = res;
        console.log('In getUserMeasures', this.usermeasures);
       },
      (error) => {
        console.log(error);
      }
    );
    return this.usermeasures;

  }

  loadUserMeasures() {
    this.http.get<Usermeasure[]>(this.baseUrl + 'users/' + this.authService.decodedToken.nameid +
      '/usermeasures').subscribe(response => {
      this.usermeasures = response;
      console.log('User Measures in loadUsermeasures: ', this.usermeasures);
      return this.usermeasures;
    }, error => {
      console.log(error);
    });
    return this.usermeasures;
      // console.log('User Measures in loadUserameasures2: ', this.usermeasures);

  }

  createUserMeasure() {
    this.userService
      .createUserMeasure(
        this.authService.decodedToken.nameid,
        this.newUserMeasure
      )
      .subscribe(
        (usermeasure: Usermeasure) => {
          this.usermeasures.unshift(usermeasure);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  deleteUserMeasure(id: number) {
    this.userService
      .deleteUserMeasure(id, this.authService.decodedToken.nameid)
      .subscribe(
        () => {
          this.usermeasures.splice(
            this.usermeasures.findIndex((m) => m.id === id),
            1
          );
        },
        (error) => {
          this.alertify.error('Failed to delete the user measure');
        }
      );
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
  initializeOptions(usermeasure: any, measureId: number) {
    switch (measureId) {
      case 1:
        this.selectedOption1 = usermeasure.description;
        this.balanceOptions[0].optionSelected = true;
        this.balanceOptions[0].newWeight = usermeasure.weight;
        this.updateChartData(0);
        this.option1Selected = true;
        break;
      case 2:
        this.selectedOption2 = usermeasure.description;
        this.balanceOptions[1].optionSelected = true;
        this.balanceOptions[1].newWeight = usermeasure.weight;
        this.updateChartData(1);
        this.option2Selected = true;
        break;
      case 3:
        this.selectedOption3 = usermeasure.description;
        this.balanceOptions[2].optionSelected = true;
        this.balanceOptions[2].newWeight = usermeasure.weight;
        this.updateChartData(2);
        this.option3Selected = true;
        break;
      case 4:
        this.selectedOption4 = usermeasure.description;
        this.balanceOptions[3].optionSelected = true;
        this.balanceOptions[3].newWeight = usermeasure.weight;
        this.updateChartData(3);
        this.option4Selected = true;
        break;
      case 5:
        this.selectedOption5 = usermeasure.description;
        this.balanceOptions[4].optionSelected = true;
        this.balanceOptions[4].newWeight = usermeasure.weight;
        this.updateChartData(4);
        this.option5Selected = true;
        break;
      case 6:
        this.selectedOption6 = usermeasure.description;
        this.balanceOptions[5].optionSelected = true;
        this.balanceOptions[5].newWeight = usermeasure.weight;
        this.updateChartData(5);
        this.option6Selected = true;
        break;
      case 7:
        this.selectedOption7 = usermeasure.description;
        this.balanceOptions[6].optionSelected = true;
        this.balanceOptions[6].newWeight = usermeasure.weight;
        this.updateChartData(6);
        this.option7Selected = true;
        break;

      default:
        break;
    }
  }
  changeSelectedOption1(option: string, weight: number) {
    this.selectedOption1 = option;
    console.log('balanceOptions: ', this.balanceOptions);
    this.balanceOptions[0].optionSelected = true;
    this.balanceOptions[0].newWeight = weight;
    this.updateChartData(0);
    this.option1Selected = true;
    const arrayNum = this.measures1[
      this.measures1.findIndex((i) => i.description === option)
    ].measureIndex;
    this.newUserMeasure = {
      Weight: weight,
      MeasureTypeId: 1,
      MeasureIndex: arrayNum,
      UserId: this.authService.decodedToken.nameid,
      Description: option
    };
    const testtype = this.measures1.find(measures1 => measures1.description === option).measureTypeId;
    const result = this.usermeasures.find(usermeasure => usermeasure.measureTypeId === testtype);
    if (result != null) {
      this.deleteUserMeasure(result.id);
    }
    this.createUserMeasure();
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
    const arrayNum = this.measures2[
      this.measures2.findIndex((i) => i.description === option)
    ].measureIndex;
    this.newUserMeasure = {
      Weight: weight,
      MeasureTypeId: 2,
      MeasureIndex: arrayNum,
      UserId: this.authService.decodedToken.nameid,
      Description: option
    };
    const testtype = this.measures2.find(measures2 => measures2.description === option).measureTypeId;
    const result = this.usermeasures.find(usermeasure => usermeasure.measureTypeId === testtype);
    if (result != null) {
      this.deleteUserMeasure(result.id);
    }
    this.createUserMeasure();
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
    const arrayNum = this.measures3[
      this.measures3.findIndex((i) => i.description === option)
    ].measureIndex;
    this.newUserMeasure = {
      Weight: weight,
      MeasureTypeId: 3,
      MeasureIndex: arrayNum,
      UserId: this.authService.decodedToken.nameid,
      Description: option
    };
    const testtype = this.measures3.find(measures3 => measures3.description === option).measureTypeId;
    const result = this.usermeasures.find(usermeasure => usermeasure.measureTypeId === testtype);
    if (result != null) {
      this.deleteUserMeasure(result.id);
    }
    this.createUserMeasure();
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
    const arrayNum = this.measures4[
      this.measures4.findIndex((i) => i.description === option)
    ].measureIndex;
    this.newUserMeasure = {
      Weight: weight,
      MeasureTypeId: 4,
      MeasureIndex: arrayNum,
      UserId: this.authService.decodedToken.nameid,
      Description: option
    };
    const testtype = this.measures4.find(measures4 => measures4.description === option).measureTypeId;
    const result = this.usermeasures.find(usermeasure => usermeasure.measureTypeId === testtype);
    if (result != null) {
      this.deleteUserMeasure(result.id);
    }
    this.createUserMeasure();
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
    const arrayNum = this.measures5[
      this.measures5.findIndex((i) => i.description === option)
    ].measureIndex;
    this.newUserMeasure = {
      Weight: weight,
      MeasureTypeId: 5,
      MeasureIndex: arrayNum,
      UserId: this.authService.decodedToken.nameid,
      Description: option
    };
    const testtype = this.measures5.find(measures5 => measures5.description === option).measureTypeId;
    const result = this.usermeasures.find(usermeasure => usermeasure.measureTypeId === testtype);
    if (result != null) {
      this.deleteUserMeasure(result.id);
    }
    this.createUserMeasure();
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
    const arrayNum = this.measures6[
      this.measures6.findIndex((i) => i.description === option)
    ].measureIndex;
    this.newUserMeasure = {
      Weight: weight,
      MeasureTypeId: 6,
      MeasureIndex: arrayNum,
      UserId: this.authService.decodedToken.nameid,
      Description: option
    };
    const testtype = this.measures6.find(measures6 => measures6.description === option).measureTypeId;
    const result = this.usermeasures.find(usermeasure => usermeasure.measureTypeId === testtype);
    if (result != null) {
      this.deleteUserMeasure(result.id);
    }
    this.createUserMeasure();
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
    const arrayNum = this.measures7[
      this.measures7.findIndex((i) => i.description === option)
    ].measureIndex;
    this.newUserMeasure = {
      Weight: weight,
      MeasureTypeId: 7,
      MeasureIndex: arrayNum,
      UserId: this.authService.decodedToken.nameid,
      Description: option
    };
    const testtype = this.measures7.find(measures7 => measures7.description === option).measureTypeId;
    const result = this.usermeasures.find(usermeasure => usermeasure.measureTypeId === testtype);
    if (result != null) {
      this.deleteUserMeasure(result.id);
    }
    this.createUserMeasure();
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
