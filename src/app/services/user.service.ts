import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url:string;
  public identity:any;
  public token: any;

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
		return this._http.post( 'https://8nr1j98vpf.execute-api.us-east-2.amazonaws.com/dev/server-status', {headers:headers} );
	}
	changePower(power: any){
		let instances = ["i-0a6cc297a44c8e8a3"];
		let params = {'instances':instances,
					'power': power}
/* 	{"instances": ["i-0a6cc297a44c8e8a3"], "power":"off"

} */	console.log(params)
		let headers = new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');
		return this._http.post( 'https://8nr1j98vpf.execute-api.us-east-2.amazonaws.com/dev/power_change', params, {headers:headers} );
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
	console.log(data);
	console.log(user);
	
	/* 'http://localhost:3000/users' */

	let headers= new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');
	
	/* return this._http.post<any>('https://8nr1j98vpf.execute-api.us-east-2.amazonaws.com/dev/login',data,{headers:headers}); */
		return this._http.post<any>('https://8nr1j98vpf.execute-api.us-east-2.amazonaws.com/dev/login',user);
		//return this._http.get<any>('https://8nr1j98vpf.execute-api.us-east-2.amazonaws.com/dev/server-info');
	}



	logout(){
		localStorage.removeItem('token');
		localStorage.removeItem('identity');
		this._router.navigate(['']);
	}

	getIdentity(){

		let identity=JSON.parse(localStorage.getItem('identity') || '{}');

		if(identity && identity != 'undefined'){
			this.identity= identity;
		}else{
			this.identity=null;
		}
		return this.identity;

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
}
