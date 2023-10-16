import { Component,EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';


@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {

  formularioModificar:FormGroup;
  imagenNueva:any;

  arreglousuario:any =[{
    idU: 0,
    nombreU: '' ,
    correo:'',
    contrasena:'',
    idPregunta:0,
    respuesta:'',
    foto:'',
    desc:''
  }]

  pedirCorreo="";
  pedirUsuario="";
  pedirDesc="";
  idUsuario:any;
  infoUsuario:any;
  prueba=true;

  correoU="";
  //perfilUsuario=new EventEmitter<any>();

  constructor(public fb:FormBuilder,private router:Router, private activatedRouter:ActivatedRoute, public alertController:AlertController,private bd:DbservicioService) {
    this.activatedRouter.queryParams.subscribe(param =>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.idUsuario = this.router.getCurrentNavigation()?.extras?.state?.["idUsuario"];
        this.infoUsuario = this.router.getCurrentNavigation()?.extras?.state?.["infoUsuario"];
        this.correoU= this.infoUsuario.correo;
        
      }
    })

    this.formularioModificar=this.fb.group({
      'NombreUsuario': new FormControl("",[Validators.required,Validators.minLength(3)]),
      'Descripcion': new FormControl("",[Validators.maxLength(300)]),
      'Correo': new FormControl("",[Validators.required,Validators.minLength(5),Validators.email]),
    })

  }
  ngOnInit() {
    this.bd.bdstate().subscribe(res => {
      if (res) {
        this.bd.fetchUsuario().subscribe(datos => {
          this.arreglousuario = datos;
        });
      }
    });
  }
  
  /*perfil(){
    this.perfilUsuario.emit(["false"]);
  }*/

  get correo(){
    return this.formularioModificar.get('Correo') as FormControl;
   }

  get nombreU(){
    return this.formularioModificar.get('NombreUsuario') as FormControl;
   }
  
  get Descri(){
    return this.formularioModificar.get('Descripcion') as FormControl;
   }


  
   modificarP() {
    this.prueba = true;
    if (this.correoU !== this.pedirCorreo) {
      for (let i = 0; i < this.arreglousuario.length; i++) {
        if (this.pedirCorreo === this.arreglousuario[i].correo) {
          this.prueba = false;
          this.presentAlert("Correo ya existente");
        }
      }
    }
    if (this.prueba) {
      if (this.pedirCorreo || this.pedirUsuario || this.pedirDesc || this.imagenNueva) {
        this.bd.actualizaPerfilUsuario(this.idUsuario,this.pedirCorreo,this.pedirUsuario,this.pedirDesc ,this.imagenNueva);
        this.presentAlert("Usuario Modificado");
        this.router.navigate(['/perfil-usuario']);
      } else {
        this.presentAlert("No se han realizado cambios");
        this.router.navigate(['/perfil-usuario']);
      }
    }
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

  takePicture = async () => {
    const image2 = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source:CameraSource.Photos
    });
    this.imagenNueva= image2.dataUrl;
  };

}
