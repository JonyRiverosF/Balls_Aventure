import { Component, OnInit } from '@angular/core';
import { DbservicioService } from 'src/app/services/dbservicio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  arregloIntentos:any =[{
    idI: 0,
    estrellas: 0 ,
    tiempo:0,
    completado:false,
    idNiveles:0,
    idUsuario:0

  }]

  arreglousuario:any =[{
    idU: 0,
    nombreU: '' ,
    correo:'',
    contrasena:'',
    foto:'',
    idPregunta:0,
    idRol:0,
    monedas:0,
    descripcion:'',
    respuesta:''
  }]

  infoUsuario:any;


  constructor(private activatedRouter:ActivatedRoute,private router: Router, public alertController: AlertController, private bd:DbservicioService) {
    this.activatedRouter.queryParams.subscribe(param =>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.infoUsuario = this.router.getCurrentNavigation()?.extras?.state?.["infoUsuario"];
        
       
      }
    })
   }

  ngOnInit() {
    this.bd.bdstate().subscribe(res=>{
      if(res){
        this.bd.fetchIntento().subscribe(datos=>{
          this.arregloIntentos=datos.filter(item=> item.idUsuario == this.infoUsuario.idU);
        })
      }
    })
    this.bd.bdstate().subscribe(res=>{
      if(res){
        this.bd.fetchUsuario().subscribe(datos=>{
          this.arreglousuario=datos.filter(item=> item.idU == this.infoUsuario.idU);
        })
      }
    })
  }

  

}