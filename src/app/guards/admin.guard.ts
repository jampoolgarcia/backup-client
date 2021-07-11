import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../shared/services/security.service';
import { UserI } from '../shared/model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _security: SecurityService, private router: Router){}  
  
  
  canActivate() {

    let user: UserI = this._security.getCurrentUser();

    if(Object.is(user.role, 2)){
      // proveedor
      return true;
    }else{
      
      this.router.navigate(['/security/login']);
       return false; 
    }
  }
  
}
