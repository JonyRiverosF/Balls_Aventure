import { Component,EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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
    descripcion:''
  }]

  pedirCorreo="";
  pedirUsuario="";
  pedirDesc="";

  idUsuario:any;

  infoUsuario:any;

  prueba=true;

  correoU="";
  nombre="";
  descripcion="";
  fotoN:any;
  
  //perfilUsuario=new EventEmitter<any>();

  constructor(public fb:FormBuilder,private router:Router, private activatedRouter:ActivatedRoute, public alertController:AlertController,private bd:DbservicioService) {
    this.activatedRouter.queryParams.subscribe(param =>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.infoUsuario = this.router.getCurrentNavigation()?.extras?.state?.["infoUsuario"];
        this.correoU= this.infoUsuario.correo;
        this.nombre= this.infoUsuario.nombre;
        this.descripcion= this.infoUsuario.descripcion;
        this.fotoN=this.infoUsuario.foto;
        this.idUsuario=this.infoUsuario.idU; 

        this.pedirCorreo=this.correoU;
        this.pedirUsuario=this.nombre;
        
        
      }
    })

    this.formularioModificar=this.fb.group({
      'NombreUsuario': new FormControl("",[Validators.required]),
      'Descripcion': new FormControl("",[Validators.required]),
      'Correo': new FormControl("",[Validators.required]),
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

    if(this.correoU == this.pedirCorreo){
      this.bd.actualizaPerfilUsuario(this.idUsuario,this.pedirCorreo,this.nombre,this.descripcion,this.fotoN);
      this.presentAlert("Usuario Modificado");
      let infoUsuario={
            idU:this.idUsuario,
            correo:this.pedirCorreo,
            nombre:this.nombre,
            foto:this.fotoN,
            descripcion:this.descripcion
        }
        let navigationextra:NavigationExtras={
          state:{
            infoUsuario:infoUsuario }
        }
      this.router.navigate(['/perfil-usuario'],navigationextra)
    }

    if (this.correoU != this.pedirCorreo) {
      for (let i = 0; i < this.arreglousuario.length; i++) {
        if (this.pedirCorreo === this.arreglousuario[i].correo) {
          this.prueba = false;
          this.presentAlert("Correo ya existente");
        }
      }
      if(this.prueba){
        this.bd.actualizaPerfilUsuario(this.idUsuario,this.pedirCorreo,this.nombre,this.descripcion ,this.fotoN);
        this.presentAlert("Usuario Modificado");
        let infoUsuario={
          idU:this.idUsuario,
          correo:this.pedirCorreo,
          nombre:this.nombre,
          foto:this.fotoN,
          descripcion:this.descripcion
          }
      let navigationextra:NavigationExtras={
        state:{
          infoUsuario:infoUsuario }
          }
        this.router.navigate(['/perfil-usuario'],navigationextra)
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
    this.fotoN= image2.dataUrl;
  };

}
