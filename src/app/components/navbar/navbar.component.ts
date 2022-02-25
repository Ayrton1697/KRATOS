import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    public user: any;
    public message:any;
    public username: string | undefined;
    
  constructor(private _userService : UserService ) {

    if(typeof String.prototype.trim !== 'function') {
      String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, ''); 
      }
    }
    
    this.user = JSON.parse(this._userService.getIdentity())
    if(this.user){
      this.username = this.user.email.substring(0,this.user.email .indexOf('.'));
    }
   
   

  }

  ngOnInit(): void {
   /*  this.getUser(); */
  
    
  }

 /*  getUser(){
   this.user =this._userService.getIdentity()
    } */

  logout(){
    this.message = 'Has salido exitosamente';
    localStorage.removeItem('identity')
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    localStorage.removeItem('session')
    localStorage.removeItem('email')
    localStorage.clear();
    this._userService.watchLocalStorage.next(localStorage.getItem('identity'));
  }

  
  }


