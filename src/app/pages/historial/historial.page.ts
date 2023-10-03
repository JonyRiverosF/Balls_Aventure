import { Component, OnInit } from '@angular/core';
import { DbservicioService } from 'src/app/services/dbservicio.service';
import { NavigationExtras,Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  arregloIntentos:any =[{
    idI: 0,
    estrellas: '' ,
    tiempo:0,
    completado:'',
    idNiveles:0,
    idUsuario:0

  }]
  infoUsuario:any;


  constructor(private activatedRouter:ActivatedRoute,private router: Router, public alertController: AlertController, private toastController: ToastController,private bd:DbservicioService) {
    this.activatedRouter.queryParams.subscribe(param =>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.infoUsuario = this.router.getCurrentNavigation()?.extras?.state?.["infoUsuario"];
        
       
      }
    })
   }

  ngOnInit() {
    this.bd.bdstate().subscribe(res=>{
      if(res){
        this.bd.fetchPregunta().subscribe(datos=>{
          this.arregloIntentos=datos;
        })
      }
    })
  }

}
