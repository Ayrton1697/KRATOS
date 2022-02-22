import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import { User } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IdentityGuard } from 'src/app/identity-guard.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public user!: User;
	public session!:any;
	public username!:any;
	public email!:any;
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
    
  	this.user= new User(1,'','','' ,'ROLE_USER','' ,'');
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
			
			console.log(res);
			this.bool = false;
			/* console.log(JSON.stringify(res)) */
		if(user){
			if(res['type'] != 'new_password_required'){
				console.log(user)
				/* this.identity = JSON.parse(user); */
				/* console.log(JSON.stringify(user)) */
				this.user['role'] = res['User']['UserAttributes'].find((item: { Name: string; }) => item.Name == 'custom:rol')['Value'];
				console.log(user);
				this.message = 'Inicio de sesión exitoso';
				this.token = res.AccessToken;
				localStorage.setItem('token',this.token);
				localStorage.setItem('identity',JSON.stringify(this.user));

				this._userService.watchLocalStorage.next(localStorage.getItem('identity'));

				localStorage.setItem('email',JSON.stringify(this.user.email));
			/* 	localStorage.setItem('role',JSON.stringify(res['User']['UserAttributes']['custom:role'])); */
				
				this.email = localStorage.getItem('email');
				this.username = this.email.substring(1, this.email.indexOf('@'))
				localStorage.setItem('username', this.username);

				setTimeout(()=>{
					localStorage.clear();
					this._userService.watchLocalStorage.next(localStorage.getItem('identity'));
				}, 1000*60*60)
			}
				

			/* 	localStorage.clear(); */
			if(res['type'] == 'new_password_required'){
				
				this.session = res['session'];
				localStorage.setItem('session',this.session)
			
				setTimeout( () => {this._router.navigate(['/confirmSignUp'])},
				1000);
			}else{
				setTimeout( () => {this._router.navigate([''])},
				1000);
			}
				
				

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

