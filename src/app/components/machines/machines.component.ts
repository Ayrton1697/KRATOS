import { Component, OnInit,Inject } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import { UserService } from 'src/app/services/user.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})

export class MachinesComponent implements OnInit {

    public machines = <any>[];
    public auth = false;
    public user:String;
    public checked!:boolean;
    machine: any;
    public message:any;
    public url: any;
    public loader: any;
    public power:any;


  constructor(
    public dialog: MatDialog,
    private _userService: UserService,
  ) {
 
 /*    this._userService.watchLocalStorage.subscribe(
      (value) => console.log(value)
   ) */

    this.user = 'Palu';
    this.loader = true;
    this.message = '';
/*     this.machines = [ 
    {
       'id':1,
      'Name': 'M1',
      'owner': 'Hernan Palumbo',
      'state':'on',
      'active':true
    },
      {
       'id':2,
      'Name': 'M2',
      'owner': 'Juan Castro',
        'state':'on',
        'active':true
    },
      {
       'id':3,
      'Name': 'M3',
      'owner': 'Agustin Di Salvo',
        'state':'on',
        'active':true
    },
      {
       'id':4,
      'Name': 'M4',
      'owner': 'Palu',
        'state':'off',
        'active':false
    },
      {
       'id':5,
      'Name': 'M5',
      'owner': 'Palu',
        'state':'off',
        'active':false
    }, {
       'id':6,
      'Name': 'M1',
      'owner': 'Hernan Palumbo',
      'state':'off',
      'active':false
    },
      {
       'id':7,
      'Name': 'M2',
      'owner': 'Juan Castro',
        'state':'on',
        'active':true
    },
      {
       'id':8,
      'Name': 'M3',
      'owner': 'Agustin Di Salvo',
        'state':'on',
        'active':true
    },
      {
       'id':9,
      'Name': 'M4',
      'owner': 'Palu',
        'state':'off',
        'active':false
    },
      {
       'id':10,
      'Name': 'M5',
      'owner': 'Palu',
        'state':'off',
        'active':false
    }
    ] */

  
   }
   openDialog(machine:any,$event: { preventDefault: any; },checked:boolean): void {
     $event.preventDefault();
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {machine: machine,
              checked:checked}
      
    });
    /* console.log(machine) */
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result != "" && result != undefined){
      

        machine.active = !machine.active;
        console.log(machine.active);
        console.log(machine)

      

        if(machine.active){
             this.power = 'on'

      /* SETEAMOS LA PROPIEDAD CHANGING PARA INDICAR QUE ESTA CAMBIANDO EL ESTADO, PARA CUANDO ABRAMOS EL SEGUNDO MODAL
      SOLO CUANDO LA PRENDEMOS YA QUE CUANDO APAGAMOS SACAMOS EL LOADER SIN ESPERAR. */

            this.machines.find((machines: { Id: any; }) => machines.Id == machine.Id).changing = true
        }
        else{
             this.power = 'off'
        }
      /*   console.log(this.power) */
       /*  let token = localStorage.getItem('token'); */
      
        this._userService.changePower(this.power,machine.Id,machine.Name).subscribe(
         (res:any)=>{
          console.log(res);
          console.log(machine)
          
         /*  this.getMachines(); */
         this._userService.getServerStatus().subscribe(
          res=>{
            this.loader = false;
            this.machines = res;
            console.log('Cargando maquina con id:')
          
            this.machine = this.machines.find((machines: { Id: any; }) => machines.Id == machine.Id);

            console.log( this.machine)

            let data = {machine: this.machine,
              apagado: this.machine.apagadoAuto,
              url:  this.machine.DNS_name
               }

            this._userService.watchMachine.next(data);

         for(var i = 0; i < this.machines.length;i++){
            if(this.machines[i].State == "running" || this.machines[i].State == "pending"){
              this.machines[i].active = true
            
            }else{
              this.machines[i].active = false
             
            }
            if(this.machines[i]['Auto-Shutdown'] == "On"){
              //this.machines[i].changing = false; // LA MAQUINA NO ESTA CAMBIANDO DE ESTADO,A ESTA ALTURA YA CAMBIO O NUNCA SE PIDIO EL CAMBIO. SE USA PARA EL LOADER DEL POPUP
              this.machines[i].apagadoAuto = true; //ESTOH HAY QUE CAMBIARLO, HAY QUE TRAER SI EL APAGADO ESTA ON U OFF DE LA TABLA Y AHI ASIGNARLO
            }else{
              this.machines[i].apagadoAuto = false;
            }
         }
          }, 
          err =>{
            console.log('No se encontraron instancias')
            this.loader = false;
            this.message = 'Error del servidor'
          }    
          );

          this.checked!=this.checked

          
         },
         (err:any) =>{
          console.log(err);
          console.log('Fallo power change');
         }
       );
    
     
        this.url = 'https://asasasasas22222'
        if(machine.active){
          window.alert('Esta es tu URL para trabajar:' + machine.owner + this.url);
        }

      }
    
    }); 
  }
  openSecondDialog(machine:any,$event: { preventDefault: any; }): void {
 
    $event.preventDefault();
    let data = {machine: machine,
      apagado: machine.apagadoAuto,
      url:  machine.DNS_name
       }
     this._userService.watchMachine.next(data);
   const dialogRef = this.dialog.open(OptionsDialogOverviewExampleDialog, {
     data:data
   });

   
/*    setTimeout(()=>{
    let data2 = {machine: machine,
      apagado: 'OSOOOOO',
      url:  'NI IDEAAAAAAAAAA'
       }
       console.log(data2)
    this._userService.watchMachine.next(data2);
   }, 2000) */
 
   dialogRef.afterClosed().subscribe(result => {  
     if(result != "" && result != undefined){
      result.machine.apagadoAuto = result.apagado
      console.log(result.machine);

      this._userService.scheduleShutdown(result.machine.Id, result.machine.apagadoAuto == true ? 'On' : 'Off').subscribe(
        res =>{
          console.log('Se modificó el apagado automático correctamente!')
          console.log(res)
        },
        err =>{
          console.log('Error al modificar el apagado automático')
          console.log(err)
        }
      )
     }else{
  /*     for(var i = 0; i < this.machines.length;i++){
        this.machines[i].apagadoAuto = true;
     } */
     }
   }); 
 }
  ngOnInit(): void {

    this.getMachines(true);


/*   this._userService.watchLocalStorage.next(localStorage.getItem('identity')); */
/*     
  setTimeout(()=>{
      localStorage.clear();
      this._userService.watchLocalStorage.next(localStorage.getItem('identity'));
    }, 500) */

    
/*    
    this._userService.getServerStatus().subscribe(
      res=>{
        this.bool = !this.bool;
        this.machines = res;
        console.log(this.machines)
     for(var i = 0; i < this.machines.length;i++){
        if(this.machines[i].State == "running"){
          this.machines[i].active = true
        }else{
          this.machines[i].active = false
         
        }
     }
    
        console.log(this.machines)
      }, 
      err =>{
        console.log('No se encontraron instancias')
      }    
      ); */
  let user = 'Palu'
    if (user == 'Palu'){
      this.auth = true;
    }
    let token = localStorage.getItem('token');

  /*   this._userService.getServerStatus().subscribe(
      res =>{
       console.log(res);
      },
      err =>{
       console.log(err);
       console.log('Falloooooooooooooooooo');
      }
    ); */

  }

getMachines(first?:any){
  if(first){
    this.loader = true;
  }
  this._userService.getServerStatus().subscribe(
    res=>{
      this.loader = false;
      this.machines = res;
      /* this._userService.watchMachine.next(this.machines); */
   for(var i = 0; i < this.machines.length;i++){
      if(this.machines[i].State == "running" || this.machines[i].State == "pending"){
        this.machines[i].active = true
      
      }else{
        this.machines[i].active = false
       
      }
      if(this.machines[i]['Auto-Shutdown'] == "On"){
        //this.machines[i].changing = false; // LA MAQUINA NO ESTA CAMBIANDO DE ESTADO,A ESTA ALTURA YA CAMBIO O NUNCA SE PIDIO EL CAMBIO. SE USA PARA EL LOADER DEL POPUP
        this.machines[i].apagadoAuto = true; //ESTOH HAY QUE CAMBIARLO, HAY QUE TRAER SI EL APAGADO ESTA ON U OFF DE LA TABLA Y AHI ASIGNARLO
      }else{
        this.machines[i].apagadoAuto = false;
      }
     
   }
  
      console.log('Log del getMachines:');
      console.log(this.machines)
    }, 
    err =>{
    /*   console.log(err) */
      console.log('No se encontraron instancias')
    /*   console.log(this.machines) */
      this.machines = this.machines
      this.loader = false;
      this.message = 'Error del servidor'
    }    
    );
}
/* alert(event:any){
  window.confirm('ok?')
  if(!confirm){
    event.preventDefault();
  }
} */

  toggleChange(machine:any,checked:boolean){
  /*   console.log(machine)
    console.log(checked) */
   machine.active = !machine.active;
  /*  console.log(machine) */
   /* // console.log(  this.machines.find(this.machines.id === 5))

   console.log( this.machine = this.machines.find((x:any) => x.id === id))
   // ASIGNAR LO DE ARRIBA A UNA MACHINE Y YA LA TENGO PARA CAMBIAR EL STATE

   
    if(this.machine.state =='on'){
      this.machine.state = 'off'
      
    }else{
      if(this.machine.state =='off'){
        this.machine.state = 'on'
        
      }
    } 
    console.log(this.machine)
    console.log(this.machines)
 */


  }



/*   checkUser(){
    let user = 'Palu'
    if (user == 'Palu'){
      return true;
    }else{
      return false;
    }
  }*/
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.html',
  styleUrls: ['./dialog.css']
})
export class DialogOverviewExampleDialog {
  public url:any;
  public power: any; 
  constructor(
    private _userService: UserService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
   
    
    @Inject(MAT_DIALOG_DATA) public data:any) {}

  onNoClick(event: { preventDefault: any; }): void {
    event.preventDefault
    this.dialogRef.close();
  }

  toggleChange(machine:any){
 /*    console.log(machine) */
   machine.active = !machine.active;

   /* O LE PONEMOS A CADA MAQUINA UN TRUE O FALSE EN ACTIVE SEGUN EL VALOR DE STATE QUE VIENE DE LA API O METO
   ESTA LOGICA DE ACA ABAJO */

 /*   if(machine.State == "running"){
     machine.State = "Off"
   }else{
    machine.State = "running"
   } */
/*    console.log(machine.active);
   console.log(machine) */
  
   if(machine.active){
        this.power = 'on'
   }
   else{
        this.power = 'off'
   }
   console.log(this.power)
  /*  let token = localStorage.getItem('token'); */
 
   this._userService.changePower(this.power,machine.Id, machine.Name).subscribe(
    (res:any)=>{
     console.log(res);
    
    },
    (err:any) =>{
     console.log(err);
     console.log('Fallo power change');
    }
  );
  this._userService.getServerStatus().subscribe(
    res =>{
     console.log('GetServerStatus despues del power change:');
     console.log(res);
    },
    err =>{
     console.log(err);
     console.log('Fallo server status');
    }
  );

   this.url = machine['DNS_name']
   if(machine.active){
     window.alert('Esta es tu URL para trabajar:' + machine.owner + this.url);
   }
  }
}

function res(res: any, arg1: any, arg2: { console: Console; "": any; }, arg3: (err: any) => void) {
  throw new Error('Function not implemented.');
}


@Component({
  selector: 'options-app-dialog',
  templateUrl: './options-dialog.html',
  styleUrls: ['./options-dialog.css']
})
export class OptionsDialogOverviewExampleDialog {
  public url:any;
  public power: any; 
  public apagadoAuto = true;
  public checked:any;
  constructor(
    private _userService: UserService,
    public dialogRef: MatDialogRef<OptionsDialogOverviewExampleDialog>,

    @Inject(MAT_DIALOG_DATA) public data:any, 
    ) {

      this._userService.watchMachine.subscribe(
        value => {
         data.machine = value.machine
         data.apagado = value.apagado
         data.url = value.url

       /*   console.log('NUEVO VALOR')
         console.log('Log de data')
         console.log(data)
         console.log('Log del value original')
         console.log(value) */

       /*   28/1, 17:04 
         HAY QUE HACER QUE ESTOS DATOS SE ACTUALICEN EN EL DIALOG AUTOMATICAMENTE DESP DE QUE SEAN PUSHEADOS,
         IGUAL YA MEDIO QUE FUNCIONA PERO VER DE QUE QUEDE BIEN TODA LA DATA */
     }
      )
  
    }

  onNoClick(event: { preventDefault: any; }): void {
    event.preventDefault
    this.dialogRef.close();
  }

  toggleChange(machine:any){
    console.log(machine)
   machine.active = !machine.active;

   console.log(machine.active);
   console.log(machine)
  
   if(machine.active){
        this.power = 'on'
   }
   else{
        this.power = 'off'
   }

 

/*   this._userService.getServerStatus().subscribe(
    res =>{
     console.log(res);
    },
    err =>{
     console.log(err);
     console.log('Fallo server status');
    }
  ); */

   this.url = 'https://asasasasas'

   if(machine.active){
     window.alert('Esta es tu URL para trabajar:' + machine.owner + this.url);
   }
  }

  consoleLog(value:any){
/*     setTimeout(() => {
      console.log(value)
      console.log(this.data.apagado)
    }, 3000) */
  /*   console.log(value)
      console.log(this.data.apagado) */
   
  }
/*   openThirdDialog(machine:any,$event: { preventDefault: any; }): void {
    console.log(machine)
    $event.preventDefault();
   const dialogRef = this.dialog.open(OptionsDialogOverviewExampleDialog, {
     data: {machine: machine,
       url:  'https://url-de-la-instancia.aws'
             }
     
   });
 
   dialogRef.afterClosed().subscribe(result => {
     console.log(result)   
     if(result != "" && result != undefined){
      console.log(result)
     }else{
      for(var i = 0; i < this.machines.length;i++){
        this.machines[i].apagadoAuto = true;
     }
     }
   }); 
 } */
}