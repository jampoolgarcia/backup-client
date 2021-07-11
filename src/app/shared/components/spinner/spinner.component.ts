import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: []
})
export class SpinnerComponent implements OnInit {

  constructor(private router: Router, private _spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loader()
  }

  loader(){
    this.router.events.subscribe(event =>{
      if(event instanceof NavigationStart){
        this._spinnerService.show();
      }else if(event instanceof NavigationEnd){
        this._spinnerService.hide();
      }
    })
  }

}
