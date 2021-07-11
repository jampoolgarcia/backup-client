import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemI } from 'src/app/shared/model/menu-item';
import { configIcons } from '../../config/config-icons';

declare function sidebarToggle();

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class SidebarComponent implements OnInit {

  menuItems: MenuItemI[] = [
    {
      title: "Inicio",
      isDivider: true,
      link: '/',
      class: "",
      icon: "fas fa-fw fa-home"
    },
    {
      title: "Médicos",
      isHeading: true,
      heading: 'Personal',
      link: '/doctor/list',
      class: "",
      icon: configIcons.DOCTOR_ICON
    },
    {
      title: "Enfermer@",
      link: '/nurse/list',
      class: "",
      icon: configIcons.NURSE_ICON
    },
    {
      title: "Pacientes",
      isDivider: true,
      link: '/patient/list',
      class: "",
      icon: configIcons.PATIENT_ICON
    },
    {
      title: "Medicamentos",
      isHeading: true,
      heading: 'Inventario',
      link: '',
      class: "collapse",
      icon: configIcons.MEDICINE_ICON,
      childrens: [
        {
          title: 'Stock',
          link: '/medicine/stock',
        },
        {
          title: 'Kardex',
          link: '/medicine/kardex',
        },
        {
          title: 'Lista de Ingresos',
          link: '/medicine/incomeRecord',
        }
      ]
    },
    {
      title: "Laboratorio",
      isHeading: true,
      heading: 'Módulos',
      link: '',
      class: "collapse",
      icon: configIcons.LAB_ICON,
      childrens: [
        {
          title: 'Listado',
          link: '/laboratory/list',
        },
        {
          title: 'Pruebas',
          link: '/laboratory/test',
        }
      ]
    },
  ];

  constructor(public rauter: Router)
   {}

  ngOnInit(): void {
  }

  toggle(){
    sidebarToggle()
  }


  
}
