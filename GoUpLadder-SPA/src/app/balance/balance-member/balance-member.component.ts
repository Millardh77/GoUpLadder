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
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BalanceMemberComponent),
    multi: true,
  }]
})
export class BalanceMemberComponent implements OnInit, ControlValueAccessor {
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
  types: any;
  measureId: any;
  public chartType: string = 'bar';
  baseUrl = environment.apiUrl;

   public chartDatasets: Array<any> = new Array(
    { data: [0, 100], label: 'Your Balance' }
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
   constructor(private route: ActivatedRoute, private balanceService: BalanceService, 
    private alertify: AlertifyService, private http: HttpClient, 
    private userService: UserService, private authService: AuthService) {
    //this.user =  JSON.parse(localStorage.getItem('user'));
    this.cachedDatasets = this.chartDatasets;
    
  }
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.usermeasures = this.user['userMeasures'];
    this.selectedOption = 'Select Option';
    this.selectedOption1 = 'Select Option';
    this.selectedOption2 = 'Select Option';
    this.selectedOption3 = 'Select Option';
    this.selectedOption4 = 'Select Option';
    
    this.processMeasures();
    // this.processDropDowns();
  }

  loadAllMeasures(filterVal: any) {
    this.measures = this.balanceService.getAllMeasures();
   } 

   processMeasures() {
     const testType = this.getAllMeasureTypes();
   
   }

   processMeasure1(element: Usermeasure) {
     const filteredArray = this.measures1.filter(x => x.measureIndex === element.measureIndex);
     const descrip = filteredArray[0].description;
     this.changeSelectedOption1(this.measures1.filter(x => x.measureIndex === element.measureIndex)[0].description, +element.weight);
    }
   processMeasure2(element: Usermeasure) {
    this.changeSelectedOption1(this.measures2.filter(x => x.measureIndex === element.measureIndex)[0].description, +element.weight);
    }
  processMeasure3(element: Usermeasure) {
    this.changeSelectedOption1(this.measures3.filter(x => x.measureIndex === element.measureIndex)[0].description, +element.weight);
     }
  processMeasure4(element: Usermeasure) {
    this.changeSelectedOption1(this.measures4.filter(x => x.measureIndex === element.measureIndex)[0].description, +element.weight);
   }

   getMeasures(filterVal: any){
    this.balanceService.getMeasures(filterVal).subscribe(res => {
      switch (filterVal) {
        case 1:
          this.measures1 = res;
          // for (let index = 0; index < this.measures1.length; index++) {
          //   this.measures1[index].index = index + 1;
          //  }
           console.log(this.measures1);
           this.processMeasure1(this.usermeasures[0]);
          return this.measures1;
          break;
        case 2:
          this.measures2 = res;
          // for (let index = 0; index < this.measures2.length; index++) {
          //   this.measures2[index].index = index + 1;
          //  }
           console.log(this.measures2);
           this.processMeasure2(this.usermeasures[1]);
           return this.measures2;
          break;
        case 3:
          this.measures3 = res;
          // for (let index = 0; index < this.measures3.length; index++) {
          //   this.measures3[index].index = index + 1;
          //  }
             console.log(this.measures3);
             this.processMeasure3(this.usermeasures[2]);
             return this.measures3;
          break;
        case 4:
          this.measures4 = res;
          // for (let index = 0; index < this.measures4.length; index++) {
          //   this.measures4[index].index = index + 1;
          //  }
           console.log(this.measures4);
           this.processMeasure4(this.usermeasures[3]);
          return this.measures4;
          break;
        default:
          break;
      }
    }, error => {
      console.log(error);
    });
    //return this.measures1;
  }

  //  getAllMeasures() {
  //   this.http.get<Measure[]>(this.baseUrl + 'measures').subscribe(response => {
  //     this.measures1 = response;
  //   }, error => {
  //     console.log(error);
  //   });
  //   return this.measures1;
  // }

  getAllMeasureTypes() {
    this.balanceService.getMeasureTypes().subscribe(res => {
      this.types = res;
      console.log(this.types);
      for (let index = 0; index < this.types.length; index++) {
        const element = this.types[index];
        console.log('In for', element);
        this.getMeasures(element.id);
        //const testUserMeasures = this.loadUserMeasures();
        // switch (index) {
        //   case 0:
        //     this.processMeasure1(this.usermeasures[0]);
        //     break;
        //   case 1:
        //     this.processMeasure2(this.usermeasures[1]);
        //     break;
        //   case 2:
        //     this.processMeasure3(this.usermeasures[2]);
        //     break;
        //   case 3:
        //     this.processMeasure4(this.usermeasures[3]);
        //     break;
        //   default:
        //     break;
        // }
      }
    }, error => {
      console.log(error);
    });
    return this.types;
  }

  // loadUserMeasures() {
  //   // const currentUserId = +this.authService.decodedToken.nameid;
  //   // this.userService.getUserMeasures(this.authService.decodedToken.nameid)
  //   this.http.get<Usermeasure[]>(this.baseUrl + 'users/' + this.authService.decodedToken.nameid +
  //     '/usermeasures').subscribe(response => {
  //     this.usermeasures = response;
  //     return this.usermeasures;
  //     console.log('User Measures in loadUsermeasures: ', this.usermeasures);
      
  //   }, error => {
  //     console.log(error);
  //   });
  //   return this.usermeasures;
  //     // console.log('User Measures in loadUserameasures2: ', this.usermeasures);
    
  // }

  createUserMeasure() {
    this.userService.createUserMeasure(this.authService.decodedToken.nameid, this.newUserMeasure)
      .subscribe((usermeasure: Usermeasure) => {
         this.usermeasures.unshift(usermeasure);
         //this.newUserMeasure.content = '';
    }, error => {
      this.alertify.error(error);
    });
  }
  
  deleteUserMeasure(id: number) {
      this.userService.deleteUserMeasure(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.usermeasures.splice(this.usermeasures.findIndex(m => m.id === id), 1);
        // this.alertify.success('Measure has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the user measure');
      });
  }

  // processDropDowns() {
  //   const testUserMeasures = this.loadUserMeasures();
    
  // }

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
        const arrayNum = this.measures1[this.measures1.findIndex(i => i.description === option)].measureIndex;
        this.newUserMeasure = {weight: weight, measureTypeId: 1, measureIndex: arrayNum };
        if (this.usermeasures[0] != null)
        {
          this.deleteUserMeasure(this.usermeasures[0].id);
        }
        this.createUserMeasure();
        console.log('changeOption1:' + option + ' Add weight: ' + weight, this.option1Selected);
  }
  changeSelectedOption2(option: string, weight: number) {
      this.selectedOption2 = option;
      this.balanceOptions[1].optionSelected = true;
        this.balanceOptions[1].newWeight = weight;
        this.updateChartData(1);
      this.option2Selected = true;
      const arrayNum = this.measures2.findIndex(i => i.description === option);
      this.newUserMeasure = {weight: weight, measureTypeId: 1, measureIndex: arrayNum };
        if (this.usermeasures[1] != null)
        {
          this.deleteUserMeasure(this.usermeasures[1].id);
        }
        this.createUserMeasure();
      console.log('changeOption2:' + option + ' Add weight: ' + weight, this.option2Selected);
  }
  changeSelectedOption3(option: string, weight: number) {
    this.selectedOption3 = option;
    this.balanceOptions[2].optionSelected = true;
        this.balanceOptions[2].newWeight = weight;
        this.updateChartData(2);
    this.option3Selected = true;
    const arrayNum = this.measures3.findIndex(i => i.description === option);
    this.newUserMeasure = {weight: weight, measureTypeId: 1, measureIndex: arrayNum };
    if (this.usermeasures[2] != null)
    {
      this.deleteUserMeasure(this.usermeasures[2].id);
    }
    this.createUserMeasure();
    console.log('changeOption3:' + option + ' Add weight: ' + weight, this.option3Selected);
  }
 changeSelectedOption4(option: string, weight: number) {
  this.selectedOption4 = option;
  this.balanceOptions[3].optionSelected = true;
  this.balanceOptions[3].newWeight = weight;
  this.updateChartData(3);
  this.option4Selected = true;
  const arrayNum = this.measures4.findIndex(i => i.description === option);
  this.newUserMeasure = {weight: weight, measureTypeId: 1, measureIndex: arrayNum };
  if (this.usermeasures[3] != null)
  {
    this.deleteUserMeasure(this.usermeasures[3].id);
  }
  this.createUserMeasure();
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
