import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  nombreRecibido:string = "";
  edadRecibida:number = 0;
  correorecibido:string="";
  descripcion:string ="";
  infoUsuario:any;
  imagenNueva: any ="";

  arreglousuario:any =[{
    idU: 0,
    nombreU: '' ,
    correo:'',
    contrasena:'',
    idPregunta:0,
    respuesta:'',
    foto:''
  }]

  constructor(private router:Router, private activatedRouter:ActivatedRoute, public alertController:AlertController,private bd:DbservicioService,) {
    this.activatedRouter.queryParams.subscribe(param =>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.infoUsuario = this.router.getCurrentNavigation()?.extras?.state?.["infoUsuario"];
        
       
      }
    })
   }

   irModificar() {
    const navigationExtras: NavigationExtras = {
      state: {
        idUsuario: this.arreglousuario[0].idU, // Pasar el idUsuario a la página de modificación de perfil
      }
    };
    this.router.navigate(['/modificar-perfil'], navigationExtras);
  }
   
  ngOnInit() {
    this.bd.bdstate().subscribe(res=>{
      if(res){
        this.bd.fetchUsuario().subscribe(datos=>{
          this.arreglousuario=datos;
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

}
