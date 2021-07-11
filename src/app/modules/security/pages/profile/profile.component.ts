import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/shared/model/user';
import { SecurityService } from 'src/app/shared/services/security.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  user: UserI;
  

  constructor(private _securityService: SecurityService) { }

  ngOnInit(): void {
    this.user =  this._securityService.getCurrentUser();
    this.user.firstName
  }

  get fullName(): string{
    return `${this.user.firstName} ${this.user.lastName}`
  }

  get role(): string {
    return this.user.role == 2 ? 'Admin' : 'Usuario';
  }

}
