import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-logros',
  templateUrl: './logros.page.html',
  styleUrls: ['./logros.page.scss'],
})

export class LogrosPage implements OnInit {
  
  arregloLogros: any[] = [{
    idL: 0,
    nombreL: '',
    descripcion: '',
    recompensa: 0
  }];
  arregloInter: any[] = [{
    idUsuario: 0,
    idLogro: 0
  }];
  arregloIntentos:any =[{
    idI: 0,
    estrellas: 0 ,
    tiempo:0,
    completado:false,
    idNiveles:0,
    idUsuario:0

  }]
  infoUsuario: any;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    private bd: DbservicioService
  ) {
    this.activatedRouter.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.infoUsuario = this.router.getCurrentNavigation()?.extras?.state?.["infoUsuario"];
      }
    });
  }

  ngOnInit() {
    this.cargarLogros();
    this.cargarInteracciones();
    this.cargarintentos();
    

  }

  private cargarLogros() {
    this.bd.bdstate().subscribe(res => {
      if (res) {
        this.bd.fetchLogro().subscribe(datos => {
          this.arregloLogros = datos;
        });
      }
    });
  }
  private cargarintentos() {
    this.bd.bdstate().subscribe(res=>{
      if(res){
        this.bd.fetchIntento().subscribe(datos=>{
          this.arregloIntentos=datos.filter(item=> item.idUsuario == this.infoUsuario.idU);
        })
      }
    })
  }

  private cargarInteracciones() {
    if (this.infoUsuario) {
      this.bd.bdstate().subscribe(res => {
        if (res) {
          this.bd.fetchinter().subscribe(datos => {
            this.arregloInter = datos.filter(item => item.idUsuario == this.infoUsuario.idU); 
          });
        }
      });
    }
  }
  private agregarinter(){
    for(var i = 0; i<this.arregloIntentos.length; i++){
      if(this.arregloIntentos[i].idNiveles==1){
        if(this.arregloIntentos[i].completado==true){
          this.bd.insertarInter(this.infoUsuario.idU, 1);
          this.bd.presentAlert('inter tutorial agregado');
        }
      }
    }
  }
  
 
}