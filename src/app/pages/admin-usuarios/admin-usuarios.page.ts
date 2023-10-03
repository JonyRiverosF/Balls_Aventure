import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  
  constructor(private activatedRoute: ActivatedRoute,private router:Router, private activatedRouter:ActivatedRoute,private bd:DbservicioService) { 
  
  }

  ngOnInit() {
    

    this.bd.bdstate().subscribe(res=>{
      if(res){
        this.bd.fetchUsuario().subscribe(datos=>{
          this.lista=datos;
        })
      }
    })
  }
  // Función para ver los detalles del usuario y navegar a la página de destino
  verDetallesUsuario(usuario: any) {
    // Navega a la página de destino y pasa los datos del usuario como parámetros
    this.router.navigate(['/usuario-normal', { datosUsuario: JSON.stringify(usuario) }]);
  }
}


