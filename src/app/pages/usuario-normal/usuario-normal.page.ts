import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-usuario-normal',
  templateUrl: './usuario-normal.page.html',
  styleUrls: ['./usuario-normal.page.scss'],
})


export class UsuarioNormalPage implements OnInit {
  usuario: any;
  idUsuario:number=0;
  idUsuario1:number=0;
  datosUsuario:any;

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

  arreglouRol:any =[{
    idR: 0,
    nombreR: '' 
  }]

  pedirRol:any;


  constructor(private router:Router, private activatedRouter:ActivatedRoute, private bd:DbservicioService,public alertController:AlertController) {
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
    const datosUsuario = localStorage.getItem('usuarioLocal');
    if (datosUsuario) {
      this.arreglousuario = JSON.parse(datosUsuario);
    }
    this.activatedRouter.paramMap.subscribe((params) => {
      const datosUsuario = params.get('datosUsuario');
      if (datosUsuario) {
        this.usuario = JSON.parse(datosUsuario);
        this.idUsuario = this.usuario.idU;
      }
    });
    this.bd.bdstate().subscribe(res => {
      if (res) {
        this.bd.fetchUsuario().subscribe(datos => {
          this.arreglousuario = datos;
        })
      }
    })
    this.bd.bdstate().subscribe(res => {
      if (res) {
        this.bd.fetchrol().subscribe(datos => {
          this.arreglouRol = datos;
        })
      }
    })
  }
  
  async presentAlert( msj:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }

  modificarRol(){
    this.bd.actualizarRolUsuario(this.idUsuario, this.pedirRol );
    //this.presentAlert("idUsuario es: " + this.idUsuario);
    //this.presentAlert("idUsuario1 es: " + this.idUsuario1);
    this.presentAlert("Rol Modificado");
    this.router.navigate(['/admin-usuarios'])
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
