import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirm-sign-up',
  templateUrl: './confirm-sign-up.component.html',
  styleUrls: ['./confirm-sign-up.component.css']
})
export class ConfirmSignUpComponent implements OnInit {

  public user: any;
  public data: any;
  public session:any;
	public status!: string;
	public token!: string;
	public identity!: string;
	public message:string | undefined;
	public bool;
  constructor(
	private _userService:UserService,
	private _router: Router,
	private _http: HttpClient,
  ){
    
  	this.data= {
      'username': '',
      'newPassword': '',
    }
    this.message = 'Ingresa una nueva contraseña para desbloquear tu usuario'
   /*  this.user= new User(1,'','' ,'ROLE_USER','' ,''); */
	  this.bool = false;
  }

  
/* LLAMAR A 
(HAY QUE DECIRLE AL USER QUE PONGA EL MAIL TAMBIEN O QUE PRIMERO SE LOGEE, VA A HABER QUE DEFINIRLO)
1-  forgotPassword --> LA APP LE MANDA UN CODIGO AL MAIL, LO REDIRIJO A UNA INTERFAZ PARA
                        METER ESE CODIGO Y LA NUEVA PASS

2- LLAMO A confirmForgotPassword CON ESE CODIGO Y LA NUEVA PASS

3-CONTRASEÑA SE CAMBIO, REDIRIJO AL LOGIN

*/

  ngOnInit(): void {
  }

  onSubmit(data:any){
    console.log(this.data)
    this.data.username = localStorage.getItem('username')
    this.session = localStorage.getItem('session')
    this._userService.completeAuthChallenge(this.data.username, this.data.newPassword,this.session).subscribe(
      res =>{
       
        this._router.navigate(['/machines'])
      },
      err =>{
        
        this.message = err['error']['error']
    }
    );
  }

}
/* 
VIERNES:17:00 HS
QUIZAS EL PROBLEMA SEA QUE LA PRIMERA VEZ HAY QUE CAMBIAR LA PASS CON EL CHANGE PASSWORD 
EN VEZ DEL FORGOT PASSWORD, PROBAR ESO */