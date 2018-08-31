import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators,} from '@angular/forms';
import { Data1 } from '../data';
import { Project } from '../EntityClasses/Project';
import {Track} from '../EntityClasses/Track';
import { Data } from '../EntityClasses/Data';
import { TaskQuality} from '../EntityClasses/TaskQuality';
import { TaskStatus } from '../EntityClasses/TaskStatus';
import { GetDataService } from '../get-data.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  myForm: FormGroup;
  datas: Project[];
  tracks: Track[];
  startMinDate = new Date(2016, 0, 1);
  startMaxDate = new Date().toJSON().slice(0,10);

  endMinDate;
  endMaxDate = new Date(2020, 0, 1);

  dbData: Data;

  myquality: string;
  qualitylist: TaskQuality[];
  mystatus: string;
  statuss: TaskStatus[];

  constructor(private myService: GetDataService) { }

  ngOnInit() {
    console.log('HI');
    this.myForm = new FormGroup({
      employeeID: new FormControl('', Validators.compose([ Validators.required, Validators.pattern('[M|m][1][0-9]{6}')])),
      projects: new FormControl(null,[Validators.required]),
      tracks: new FormControl(null,[Validators.required]),
      startDate: new FormControl(Validators.required),
      endDate: new FormControl(Validators.required),
      status: new FormControl(Validators.required),
      quality: new FormControl(Validators.required),
    });
    this.myService.getDataFromDataBase().subscribe(data => {this.datas=data.Projects; this.qualitylist = data.TaskQualityList; this.statuss = data.TaskStatusList;});    
   //this.myService.getData().subscribe(data => this.datas = data);
  }
  onChange( projectSelected ){
    
    this.myForm.controls['tracks'].reset();   
    //console.log(projectSelected);
    for(let data of this.datas){
      if(data.Description === projectSelected){
        this.tracks = data.ProjectTrackList;
        console.log(this.tracks);
      }
    }
  }

  setEndMinDate(dateSelected){
    console.log('Hello');
    this.myForm.controls['endDate'].reset();
    this.endMinDate = dateSelected;
    console.log(this.endMinDate);
  }
  onSubmit(): boolean {
    const check: boolean = window.confirm("Do you want to confirm this?");
    if(check){
        let formValue = this.myForm.value;
        console.log(formValue);
        this.myForm.reset();
        return true;
      }
      else{
        this.myForm.enable();
        return false;
      }  
  }
}
