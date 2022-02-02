import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-reset-password',
  templateUrl: './confirm-reset-password.component.html',
  styleUrls: ['./confirm-reset-password.component.css']
})
export class ConfirmResetPasswordComponent implements OnInit {

  public user: any;
  public data: any;
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
      'email': '',
      'newPassword': '',
      'code':''
    }
    this.message = 'Se ha enviado el código a tu dirección de correo electrónico'
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
    this.data.email = localStorage.getItem('email')
    this._userService.confirmForgotPassword(this.data.email, this.data.code, this.data.newPassword).subscribe(
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