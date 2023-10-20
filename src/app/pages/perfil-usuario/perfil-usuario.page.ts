import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';
import { Share } from '@capacitor/share';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  descripcion:string ="";
  infoUsuario:any;
  imagenNueva: any ="";
  correousuario:string ="";

  arreglousuario:any =[{
    idU: 0,
    nombreU: '' ,
    correo:'',
    contrasena:'',
    idPregunta:0,
    respuesta:'',
    descripcion:'',
    foto:''
  }]
  arreglousuarios:any =[{
    idU: 0,
    nombreU: '' ,
    correo:'',
    contrasena:'',
    idPregunta:0,
    respuesta:'',
    descripcion:'',
    foto:''
  }]

  constructor(private router:Router, private activatedRouter:ActivatedRoute, public alertController:AlertController,private bd:DbservicioService) {
    this.activatedRouter.queryParams.subscribe(param =>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.infoUsuario = this.router.getCurrentNavigation()?.extras?.state?.["infoUsuario"];
        this.correousuario=this.infoUsuario.correo;
        this.descripcion=this.infoUsuario.descripcion;
      }
    })
   }

   irModificar() {
        let navigationextra:NavigationExtras={
          state:{
            infoUsuario:this.infoUsuario}
        };
    this.router.navigate(['/modificar-perfil'], navigationextra);
    }
  


home(){
  this.router.navigate(['/home']);
}
   
  ngOnInit() {
    /*this.bd.bdstate().subscribe(res=>{
      if(res){
        this.bd.fetchUsuario().subscribe(datos=>{
          this.arreglousuarios=datos.filter(item=>item.idU == this.infoUsuario.idU);
        })
      }
    })*/
    this.bd.bdstate().subscribe(res=>{
      if(res){
        this.bd.fetchUsuario().subscribe(datos=>{
          this.arreglousuario=datos;
        })
      }
    })
  }

//Funcion de Share que pueda mandar la informacion y la foto que quiera seleccionar
async share() {
  const options = {};
  try {
    const { photos } = await Camera.pickImages(options);

    if (photos.length > 0) {
      const imagePaths = photos.map(photo => photo.path!);
      const shareText = `Nombre: ${this.infoUsuario.nombre}\nCorreo: ${this.correousuario}\nDescripción: ${this.descripcion}`;

      await Share.share({
        title: 'Perfil de usuario',
        text: shareText,
        files: imagePaths,
      });
    } else {
      console.error("No se seleccionaron imágenes de la galería.");
    }
  } catch (error) {
    console.error("Error al compartir imágenes de la galería:", error);
  }
}

//Share Informacion Usuario
/*async share() {
  if (this.infoUsuario) {
    const shareText = `Nombre: ${this.infoUsuario.nombre}\nCorreo: ${this.correousuario}\nDescripción: ${this.descripcion}`;
    try {
      await Share.share({
        title: 'Perfil de usuario',
        text: shareText,
      });
    } catch (error) {
      this.presentAlert('Error al compartir: ' + error);
    }
  } else {
    this.presentAlert('No se pudo compartir porque los datos del usuario están vacíos.');
  }
}*/


//Foto que quiera enviar el Usuario
/*async share() {
  const options = {};
  try {
    const { photos } = await Camera.pickImages(options);

    if (photos.length > 0) {
      const imagePaths = photos.map(photo => photo.path!);

      await Share.share({
        files: imagePaths,
      });
    } else {
      console.error("No se seleccionaron imágenes de la galería.");
    }
  } catch (error) {
    console.error("Error al compartir imágenes de la galería:", error);
  }
}*/

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
