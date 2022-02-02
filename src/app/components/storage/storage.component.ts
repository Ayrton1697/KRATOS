import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isEditable = false;
  public bool;
  public sent;
  
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


  constructor(private _formBuilder: FormBuilder) {
    this.bool = false;
    this.sent = false;
   }

  ngOnInit() {
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
      });
    }

    sendStepper(){
      console.log('holaaaa')
      this.bool = false;
      this.sent=false;
      this.bool = true,
      
      setTimeout( () => {
        this.bool = false;
        this.sent = true;
        this.setSent();
       },
				2000);
     
      

    }
    setSent(){
      setTimeout( ()=>this.sent=false, 2000)
    }
    
  }