import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  
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
      'email': ''
    }
    this.message = 'Ingresa una dirección de correo electrónico para enviar el código de confirmación'
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
    

    localStorage.setItem('email', this.data.email);
  
    this._userService.forgotPassword(this.data.email).subscribe(
      res =>{
       
      },
      err =>{
        
      }
    );
    
    setTimeout(() => {
      this._router.navigate(['/confirmResetPassword'])
    }, 500);
    
   /*  this._userService.confirmForgotPassword().subscribe(); */
  }

}
