import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import { User } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user!: User;
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
    
  	this.user= new User(1,'','' ,'ROLE_USER','' ,'');
	  this.bool = false;
  }

  ngOnInit(): void {

  }

  onSubmit(user: any){
	  this.bool = true;
		this.message = '';
	this._userService.login(this.user).subscribe(
		res=>{
		/* 	const user=res.find((a:any)=>{
			   return a.email === this.user.email && a.password === this.user.password;
			   
			}); */
			console.log(res)
			this.bool = false;
			//console.log(JSON.stringify(res))
			if(user){
				this.message = 'Inicio de sesión exitoso';

				setTimeout( () => {this._router.navigate([''])},
				1000);
				

			}else{
				this.message = 'Error de autenticacion';
			}
		},
		err=>{
			this.bool = false;
			this.message = err.error['error'];
		}

		
	);
	
	/* this._userService.login(this.user).subscribe(
		res=>{
			if(res.status != 'error'){
				this.user = res.user;
				this.token = res.token;
				localStorage.setItem('token',this.token);
				localStorage.setItem('user_email',JSON.stringify(this.user.email));
				localStorage.setItem('user_name',JSON.stringify(this.user.name));
			}else{
				console.log('Hay algo mal');
			}
		},
		err=>{
			console.log(err);
		}

	); */
  	/* this._userService.login(this.user).subscribe(

  		response=>{
				
	  			if(response.status != 'error'){
	  				
	  				this.status= response.status;
	  				this.token= response;
	  				
	  				//Identidad del usuario

	  				this._userService.login(this.user,true).subscribe(

	  					response=>{
	  						this.identity=response;
	  					
	  						localStorage.setItem('token',this.token);
	  						localStorage.setItem('identity',JSON.stringify(this.identity));
  							this._router.navigate(['/turnos']);
	  					},error=>{
	  						this.status='error';
	  					});

	  			}else{
	  				this.status= 'error';
	  				console.log('error');
	  			}


  		},
  		error=>{
			this.status = 'error';
			console.log('error');
  		}

  		); */

 }

  
  	

}