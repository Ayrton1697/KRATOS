import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    public user: any;
    public message:any;

    
  constructor(private _userService : UserService ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
   this.user =this._userService.getIdentity()
    }
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


