import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isEditable = false;

  foods = [
    {value: 'M1'},
    {value: 'M2'},
    {value: 'M3'},
    {value: 'M4'},
    {value: 'M5'},
 
  ];

  rams = [
    {value: '2 GB'},
    {value: '4 GB'},
    {value: '6 GB'},
    {value: '8 GB'},
    {value: '16 GB'}
  ];


  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
      });
    }
  }