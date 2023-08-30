import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.page.html',
  styleUrls: ['./admin-usuarios.page.scss'],
})
export class AdminUsuariosPage implements OnInit {

  lista:any = [
    {
      nombreU:"Alfredin864",
      correo:"alfred0@gmail.com",
      fecha_nacimiento:"11/11/1999",
      Rol:"Usuario"
    },
    {
      nombreU:"Rod0192",
      correo:"rodin12@gmail.com",
      fecha_nacimiento:"9/28/2008",
      Rol:"Usuario"
    },
    {
      nombreU:"Danitza",
      correo:"Dani2003@gmail.com",
      fecha_nacimiento:"6/5/2003",
      Rol:"Admin"
    },
    {
      nombreU:"Jony",
      correo:"jonito@gmail.com",
      fecha_nacimiento:"4/07/2003",
      Rol:"Admin"
    },
    
  ];

  constructor() { }

  ngOnInit() {
  }

}
