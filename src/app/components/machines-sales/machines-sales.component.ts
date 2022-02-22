import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-machines-sales',
  templateUrl: './machines-sales.component.html',
  styleUrls: ['./machines-sales.component.css']
})
export class MachinesSalesComponent implements OnInit {

  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isEditable = false;
  public bool;
  public sent;
  public machine: any;
  public maquina: any;
  public power: any;

  poc_machines = [
    {value: 'AI-images', state: 'Disponible'},
    {value: 'AI-ppe-detection', state: 'Disponible'},
    {value: 'AI-detección-de-texto',state: 'No disponible'},
    {value: 'AI-sentiment-analysis',state: 'Disponible'},
    {value: 'AI-Generación-de-texto',state: 'No disponible'}
 
  ];


/*   rams = [
    {value: '2 GB'},
    {value: '4 GB'},
    {value: '6 GB'},
    {value: '8 GB'},
    {value: '16 GB'}
  ]; */


  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService) 
    {  
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

      this.poc_machines.sort  /* ORDENAR PARA QUE APAREZCAN PRIMERO LOS DISPONIBLES */
    }
    
    sendStepper(stepper: any){
      console.log(this.firstFormGroup)
      /* if() */
      this.bool = false;
      this.sent=false;
      this.bool = true,
     console.log(this.firstFormGroup.value['firstCtrl'])
     this.maquina = this.firstFormGroup.value['firstCtrl']

     this.bool = false;
     this.sent = true;

     this._userService.pocPower(this.maquina, 'On').subscribe(
      (res: any) =>{
        console.log(res)
        this.sent=false
      },
       (err: any) =>{
        console.log(err)
      }
     );
      





  /*     setTimeout( () => {
        this.bool = false;
        this.sent = true;
        this.setSent();
       },
				2000); */
/*      
        this._userService.pocPower(this.machine, 'On').subscribe(
          res =>{
            console.log(res)
            if(SE PRENDIO BIEN){
              setTimeout( ()=>{
                this._userService.pocPower(this.machine, 'Off').subscribe(
                  res =>{
                    console.log('SE APAGO')
                  },
                  err =>{
                    console.log('NO SE APAGO')
                  }
                );
              }, 1000 * 60 * 30)
            }
          },
          err =>{
            console.log(err)
          }
          ); */

    }
 /*    setSent(){
      setTimeout( ()=>this.sent=false, 2000)
    } */
    
  }