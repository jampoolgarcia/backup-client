import { Component, OnInit } from '@angular/core';
import { UserI } from '../../model/user';
import { AlertService } from '../../services/alert.service';

declare function sidebarToggle();

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: []
})
export class TopbarComponent implements OnInit {

  public title: string = "Usuarios";
  public userName: string = "";

  constructor(public _alert: AlertService) { }

  ngOnInit(): void {
    this.userName = this.getCurrentUserName();
  }

  getCurrentUserName(): string {
    let user_string = localStorage.getItem("currentUser");
    if (user_string) {
      let user: UserI = JSON.parse(user_string);
      return `${user.firstName} ${user.lastName}`;
    }
  }

  toggle(){
    sidebarToggle()
  }

}
