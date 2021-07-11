import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemI } from '../../model/menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: []
})
export class MenuComponent implements OnInit {

  @Input() listItems: MenuItemI[];

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
