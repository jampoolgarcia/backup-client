import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../shared/services/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _security: SecurityService, private router: Router){}
  
  canActivate(){

    if(this._security.getCurrentUser()){
      // login true
      return true;
    }else{
      this.router.navigate(['/security/login']);
       return false; 
    }
  }

}
