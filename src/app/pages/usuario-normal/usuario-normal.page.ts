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

  arreglousuario:any =[{
    idU: 0,
    nombreU: '' ,
    correo:'',
    contrasena:'',
    idPregunta:0,
    respuesta:'',
    foto:'',
    idRol:''
  }]

  arreglouRol:any =[{
    idR: 0,
    nombreR: '' 
  }]

  pedirRol:any;


  constructor(private router:Router, private activatedRouter:ActivatedRoute, private bd:DbservicioService,public alertController:AlertController) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe((params) => {
      const datosUsuario = params.get('datosUsuario');
      if (datosUsuario) {
        this.usuario = JSON.parse(datosUsuario);
        this.idUsuario=this.usuario.idU;
        //this.idUsuario1=this.usuario.idUsuario;
        
      }
    });
    this.bd.bdstate().subscribe(res=>{
      if(res){
        this.bd.fetchUsuario().subscribe(datos=>{
          this.arreglousuario=datos;
        })
      }
    })
    this.bd.bdstate().subscribe(res=>{
      if(res){
        this.bd.fetchrol().subscribe(datos=>{
          this.arreglouRol=datos;
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

}
