import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-s3',
  templateUrl: './s3.component.html',
  styleUrls: ['./s3.component.css']
})
export class S3Component implements OnInit {

  public user!: User;
	public status!: string;
	public token!: string;
	public identity!: string;
  public roles: any[];

  constructor(
	  private _userService: UserService
  ) {
    this.roles = ['Admin','User','Sales']
	this.user = new User(1,'','','','','','');
   }

  ngOnInit(): void {
    
  }

  onSubmit(_form: any){
    //console.log('hola')
  /* 	this._userService.login(this.user).subscribe(

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
