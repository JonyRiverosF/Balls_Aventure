import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.page.html',
  styleUrls: ['./admin-usuarios.page.scss'],
})
export class AdminUsuariosPage implements OnInit {

  //nombreUsuario:any;

  lista:any = [
    {
      idU:0,
      correo:"",
      nombre:"",
      rol:0,
      intento:0,
    } 
  ];

  constructor(private router:Router, private activatedRouter:ActivatedRoute,private bd:DbservicioService) { 
    /*this.activatedRouter.queryParams.subscribe(param =>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.nombreUsuario = this.router.getCurrentNavigation()?.extras?.state?.["infoUsuario"];
       
      }
    })*/
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

}
