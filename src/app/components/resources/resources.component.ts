import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isEditable = false;
  public bool;
  public sent;
  public machines:any;
  public rams:any;
  public loader:any;


  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService
    ) {

    this.bool = false;
    this.sent = false;
    this.loader = false;

    this.machines = [
      {value: 'M1'},
      {value: 'M2'},
      {value: 'M3'},
      {value: 'M4'},
      {value: 'M5'},
   
    ];
  
    this.rams = [
      {value: '2 GB'},
      {value: '4 GB'},
      {value: '6 GB'},
      {value: '8 GB'},
      {value: '16 GB'}
    ];
   }

  ngOnInit() {
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
      });

      this.getMachines();
    }

    getMachines(){
      this.loader = true;
      this._userService.getServerStatus().subscribe(
        res=>{
          console.log(res)
          this.machines = res;
          this.loader = false;
        },
        err =>{
          console.log(err)
          this.loader = false;
        }
      )
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