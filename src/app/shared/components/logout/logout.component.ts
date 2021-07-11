import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/shared/services/security.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styles: [
  ]
})
export class LogoutComponent {

  constructor(private router: Router, private _security: SecurityService) { }
  
  logout(): void{
    this._security.logout().subscribe(
      data => {
       
        localStorage.clear();
        this.router.navigate(['/security/login']);
      }, err =>{
        console.log("logout", err);
      })
    
  }


}
