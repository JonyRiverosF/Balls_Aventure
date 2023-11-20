import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.page.html',
  styleUrls: ['./admin-usuarios.page.scss'],
})

export class AdminUsuariosPage implements OnInit {

  lista:any = [
    {
      idU:0,
      correo:"",
      nombre:"",
      rol:0,
      intento:0,
    } 
  ];

  constructor(private router:Router, private bd:DbservicioService) { }

  ngOnInit() {
    const storedData = localStorage.getItem('usuarioLocal');
    if (storedData) {
      this.lista = JSON.parse(storedData);
    } else {
      this.bd.bdstate().subscribe(res => {
        if (res) {
          this.bd.fetchUsuario().subscribe(datos => {
            this.lista = datos;
            localStorage.setItem('usuarioLocal', JSON.stringify(datos));
          });
        }
      });
    }
  }
  
  verDetallesUsuario(usuario: any) {
    this.router.navigate(['/usuario-normal', { datosUsuario: JSON.stringify(usuario) }]);
  }

}


