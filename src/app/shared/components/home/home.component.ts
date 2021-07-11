import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { configIcons } from '../../config/config-icons';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  size: string = "fa-8x";


  public cards: any[] = [
    {title: 'Médicos',  icon: `${configIcons.DOCTOR_ICON} ${this.size}`,  link: '/doctor/list', class: 'card card-hover text-center text-primary mb-4 mt-0 shadow-sm '},
    {title: 'Enfermer@s',  icon: `${configIcons.NURSE_ICON} ${this.size}`,  link: '/nurse/list', class: 'card card-hover text-center bg-gradient-primary text-white mb-4 mt-0 shadow-sm'},
    {title: 'Pacientes',  icon: `${configIcons.PATIENT_ICON} ${this.size}`,  link: '/patient/list', class: 'card card-hover text-center text-primary mb-4 mt-0 shadow-sm'},
    {title: 'Stock',  icon: `${configIcons.MEDICINE_ICON} ${this.size}`, link: '/medicine/stock', class: 'card card-hover text-center bg-gradient-primary text-white mb-4 mt-0 shadow-sm'},
    {title: 'Laboratorios',  icon: `${configIcons.LAB_ICON} ${this.size}`,  link: '/laboratoty/list', class: 'card card-hover text-center text-primary mb-4 mt-0 shadow-sm'},
    {title: 'Caja',  icon: `${configIcons.BOX_ICON} ${this.size}`,  link: '/box', class: 'card card-hover text-center bg-gradient-primary text-white shadow-sm'}
  ] 

  constructor(private router: Router, private _alert: AlertService) { }

  ngOnInit(): void {
    this._alert.title = 'Inicio';
  }

}
