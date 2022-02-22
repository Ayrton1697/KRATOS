import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    title= 'Kratos';
    public novedades: any;
    public services:Array<string>;

    constructor(
    private _userService: UserService
  ) {
    this.services = [ 'EC2', 'RAM', 'STORAGE'] //'S3', 'RAM', 'STORAGE',

   }

  ngOnInit(): void {
    this._userService.getServerNews().subscribe(
      (res:any) =>{
       console.log(res);
       this.novedades = res;
      },
      err =>{
       console.log(err);
       console.log('No anda');
      }
    );


    

  }

}
