import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url:string;
  public identity:any;
  public token: any;
  public watchLocalStorage = new BehaviorSubject(localStorage.getItem('identity'));
  public watchMachine = new BehaviorSubject<any>('any');

  constructor(
    private _http: HttpClient,
    private _router:Router

  ) {
    this.url = global.url;

   }

   register(user: any):Observable<any>{

		let json= JSON.stringify(user);
		let params= 'json='+json;

		let headers= new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');

		return this._http.post(this.url+'register', params, {headers:headers});
	}
	
	getServerNews(){
		/* let params= 'json='+json; */
		let headers= new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');
									/*   .set('AccessToken',this.token); */
		return this._http.post( 'https://8nr1j98vpf.execute-api.us-east-2.amazonaws.com/dev/get-databases', {headers:headers} );
	}

	getServerStatus(){
		/* let params= 'json='+json; */
		let headers= new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');
									/*   .set('AccessToken',this.token); */
		let token = {
						'token' : localStorage.getItem('token')
					}
		
		return this._http.post( 'https://8nr1j98vpf.execute-api.us-east-2.amazonaws.com/dev/server-status',token ,{headers:headers});
	}
	changePower(power: any,instances:any){
		/* let instances = ["i-0a6cc297a44c8e8a3"]; */
		let instance_list = [""+instances+""]
		let params = {'instances':instance_list,
					'power': power}
		
/* 	{"instances": ["i-0a6cc297a44c8e8a3"], "power":"off"

} */	
		let headers = new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');
		return this._http.post( 'https://8nr1j98vpf.execute-api.us-east-2.amazonaws.com/dev/power_change', params, {headers:headers} );
	}
	pocPower(pocInstance:any, power:any){
		let pocInstace = pocInstance
		let params = {'maquina': pocInstace,
					'power': power}

		console.log(params)
		let headers = new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');
		return this._http.post( 'https://8nr1j98vpf.execute-api.us-east-2.amazonaws.com/dev/poc_power', params, {headers:headers} );
	}

	mock(){
	
		/* let params= 'json='+json; */

		let headers= new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');
									/*   .set('AccessToken',this.token); */
		/* return this._http.get('https://8nr1j98vpf.execute-api.us-east-2.amazonaws.com/dev/login',{headers:headers} ); */
		/* return this._http.get('https://8nr1j98vpf.execute-api.us-east-2.amazonaws.com/dev/get-server-info' ); */
/* 		return this._http.get('https://8nr1j98vpf.execute-api.us-east-2.amazonaws.com/dev/hello' ); */
		return this._http.get('https://jsonplaceholder.typicode.com/todos/1', {headers:headers} );
	}
	
/* 	login(user:any,gettoken=null):Observable<any>{
		
		if(gettoken !=null){
			user.gettoken='true';

		}

	 	let json= JSON.stringify(user);
	 	let params= 'json='+json;

	 	let headers= new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');

	 
	 	return this._http.post(this.url+'api', params, {headers:headers});
	} */

	


		login(user:any,gettoken=null):Observable<any>{

	user= {
		'username': user.email,
		'password': user.password
	}
	let data = JSON.stringify(user);
	
	
	/* 'http://localhost:3000/users' */

	let headers= new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');
	
	/* return this._http.post<any>('https://8nr1j98vpf.execute-api.us-east-2.amazonaws.com/dev/login',data,{headers:headers}); */
		return this._http.post<any>('https://8nr1j98vpf.execute-api.us-east-2.amazonaws.com/dev/login',user);
		//return this._http.get<any>('https://8nr1j98vpf.execute-api.us-east-2.amazonaws.com/dev/server-info');
	}



	logout(){
		localStorage.removeItem('token');
		localStorage.removeItem('identity');
		localStorage.clear();
		this.watchLocalStorage.next(localStorage.getItem('identity'));
		this._router.navigate(['']);
	}

	getIdentity(){

		/* let identity=JSON.parse(localStorage.getItem('identity') || '{}'); */
		let identity = localStorage.getItem('identity')
		if(identity && (identity != undefined || identity != null)){
			this.identity= identity;
			
		}else{
			this.identity=null;
			
		}
		return this.identity;
/* 		return true; */

	}
	getToken(){
		let token= localStorage.getItem('token');

		if(token && token !='undefined'){
			this.token=token;
		}else{
			this.token=null;
		}
		return this.token;
	}
	
	forgotPassword(email:any){
		let params = {
			'step': 1,
			'username':email	
		}
		
		let headers= new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');

		return this._http.post('https://8nr1j98vpf.execute-api.us-east-2.amazonaws.com/dev/reset_password',params,{headers:headers});

	}
	confirmForgotPassword(email:any, code:any, newPassword:any){

		let params = {
			'step': 2,
			'username': email,
			'confirmation_code': code,
			'new_password': newPassword
			}
		
		let headers= new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');

		return this._http.post('https://8nr1j98vpf.execute-api.us-east-2.amazonaws.com/dev/reset_password',params,{headers:headers});
	}

	completeAuthChallenge(username:any, newPassword:any,session:any){
		let params = {
			'step':3,
			'username': username,
			'new_password':newPassword,
			'Session':session
		}
		
		let headers = new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');

		return this._http.post('https://8nr1j98vpf.execute-api.us-east-2.amazonaws.com/dev/reset_password',params, {headers:headers});

	}
}
