import { Component, OnInit,Inject } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

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
    public url: any;
    
  constructor(
    public dialog: MatDialog,
    private _userService: UserService,
  ) {
 
   

    this.user = 'Palu';

    this.machines = [ 
/*     {
       'id':1,
      'name': 'M1',
      'owner': 'Hernan Palumbo',
      'state':'on',
      'active':true
    },
      {
       'id':2,
      'name': 'M2',
      'owner': 'Juan Castro',
        'state':'on',
        'active':true
    },
      {
       'id':3,
      'name': 'M3',
      'owner': 'Agustin Di Salvo',
        'state':'on',
        'active':true
    },
      {
       'id':4,
      'name': 'M4',
      'owner': 'Palu',
        'state':'off',
        'active':false
    },
      {
       'id':5,
      'name': 'M5',
      'owner': 'Palu',
        'state':'off',
        'active':false
    }, {
       'id':6,
      'name': 'M1',
      'owner': 'Hernan Palumbo',
      'state':'off',
      'active':false
    },
      {
       'id':7,
      'name': 'M2',
      'owner': 'Juan Castro',
        'state':'on',
        'active':true
    },
      {
       'id':8,
      'name': 'M3',
      'owner': 'Agustin Di Salvo',
        'state':'on',
        'active':true
    },
      {
       'id':9,
      'name': 'M4',
      'owner': 'Palu',
        'state':'off',
        'active':false
    },
      {
       'id':10,
      'name': 'M5',
      'owner': 'Palu',
        'state':'off',
        'active':false
    } */
    ]

  
   }
   openDialog(machine:any,$event: { preventDefault: any; },checked:boolean): void {
     $event.preventDefault();
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {machine: machine,
              checked:checked}
      
    });
    /* console.log(machine) */
    dialogRef.afterClosed().subscribe(result => {
     /*  console.log('The dialog was closed');
      console.log('Esta es tu URL para trabajar: https://asasasasas') */
     
    
    }); 
  }
  ngOnInit(): void {
   
    this._userService.getServerStatus().subscribe(
      res=>{
        this.machines = res
        console.log(this.machines)
     
        if(this.machines.State == "running"){
            this.machines.active = true
        }else{
          this.machines.active = false
          console.log('FALLAMOS')
        }
        console.log(this.machines)
      }, 
      err =>{
        console.log('No se encontraron instancias')
      }    
      );
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

/* alert(event:any){
  window.confirm('ok?')
  if(!confirm){
    event.preventDefault();
  }
} */

  toggleChange(machine:any,checked:boolean){
    console.log(machine)
    console.log(checked)
   machine.active = !machine.active;
   console.log(machine)
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
    console.log(machine)
   machine.active = !machine.active;

   /* O LE PONEMOS A CADA MAQUINA UN TRUE O FALSE EN ACTIVE SEGUN EL VALOR DE STATE QUE VIENE DE LA API O METO
   ESTA LOGICA DE ACA ABAJO */

 /*   if(machine.State == "running"){
     machine.State = "Off"
   }else{
    machine.State = "running"
   } */
   console.log(machine.active);
   console.log(machine)
  
   if(machine.active){
        this.power = 'on'
   }
   else{
        this.power = 'off'
   }
   console.log(this.power)
  /*  let token = localStorage.getItem('token'); */
   this._userService.getServerStatus().subscribe(
     res =>{
      console.log(res);
     },
     err =>{
      console.log(err);
      console.log('Fallo server status');
     }
   );
   this._userService.changePower(this.power).subscribe(
    res =>{
     console.log(res);
    },
    err =>{
     console.log(err);
     console.log('Fallo power change');
    }
  );

   this.url = 'https://asasasasas'
   if(machine.active){
     window.alert('Esta es tu URL para trabajar:' + machine.owner + this.url);
   }
  }
}