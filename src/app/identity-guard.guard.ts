import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _userService: UserService
  ){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    
    {
      let identity = this._userService.getIdentity();
      this._userService.watchLocalStorage.subscribe(
         value => {
         /*   console.log(value) */
         if (value != null){
          return true;
        }else{
          this._router.navigate(['login']);
          return false;
        }
         } 
      );
      if (identity != null){
        return true;
      }else{
        this._router.navigate(['login']);
        return false;
      }
    
  }


  
}
