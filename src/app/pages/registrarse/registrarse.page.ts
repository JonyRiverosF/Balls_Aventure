import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras,Router } from '@angular/router';
import { ModificarContraPage } from '../modificar-contra/modificar-contra.page';
import { DbservicioService } from 'src/app/services/dbservicio.service';
import { Pregunta } from 'src/app/services/pregunta';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Usuario } from 'src/app/services/usuario';
//import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';


@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  arregloPreguntas:any =[{
    idP: 0,
    nombreP: '' 
  }]

  arreglousuario:any =[{
    idU: 0,
    nombreU: '' ,
    correo:'',
    idPregunta:0,
    idRol:0,
    foto:''
  }]

  imagenNueva: any ="";

  pedirUsuario="";
  pedirCorreo="";
  pedirPregunta:any;
  pedirRespuesta="";
  pedirContrasena="";
  pedirRol=1;
  descripcion="";
  monedas=0;
  infoUsuario:any;
  correoU="";
  prueba=true;

  contra1:string="";
  contra2:string="";
  mensaje:string="Las contraseñas no coinciden";

  formularioRegistro:FormGroup;
  
  //private faio: FingerprintAIO
  constructor(public fb:FormBuilder,public alertController:AlertController,private router:Router, private activatedRouter:ActivatedRoute, private bd:DbservicioService) {
    this.activatedRouter.queryParams.subscribe(param =>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.infoUsuario = this.router.getCurrentNavigation()?.extras?.state?.["infoUsuario"];
        this.correoU = this.infoUsuario.correo;
        
       
      }
    })
    
    this.formularioRegistro=this.fb.group({
      'nombre': new FormControl("",[Validators.required,Validators.minLength(3)]),
      'contraseña': new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(15),Validators.pattern(new RegExp("(?=.*[0-9])")),Validators.pattern(new RegExp("(?=.*[A-Z])")),Validators.pattern(new RegExp("(?=.*[a-z])"))]),
      'Confirmar_contraseña': new FormControl("",[Validators.required]),
      'Correo': new FormControl("",[Validators.required,Validators.minLength(5),Validators.email]),
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

   registrar(){
    this.prueba=true;
    if (this.correoU != this.pedirCorreo){
      for(let i=0;i<this.arreglousuario.length;i++){
        if(this.pedirCorreo == this.arreglousuario[i].correo){
          this.prueba=false;
          this.presentAlert("Correo ya existente");
        }
      }
    }
    if(this.prueba){
      if (this.contra1==this.contra2){
        this.bd.insertarUsuario(this.pedirRespuesta, this.pedirUsuario, this.pedirContrasena, this.pedirCorreo, this.descripcion,this.imagenNueva, this.monedas,this.pedirRol, this.pedirPregunta);
        this.bd.presentAlert("Usuario Agregado");
        this.router.navigate(['/iniciar-sesion'])
      } else{
        this.presentAlert("No hay coincidencias en las claves");
    } 
  }
}

   home(){
    this.router.navigate(['/home'])
   }

   
   
   
   
   


   get nombreU(){
    return this.formularioRegistro.get('nombre') as FormControl;
   }

   get contra(){
    return this.formularioRegistro.get('contraseña') as FormControl;
   }

   get confirmar_contra(){
    return this.formularioRegistro.get('Confirmar_contraseña') as FormControl;
   }

   get correo(){
    return this.formularioRegistro.get('Correo') as FormControl;
   }


  ngOnInit() {
    this.bd.bdstate().subscribe(res=>{
      if(res){
        this.bd.fetchPregunta().subscribe(datos=>{
          this.arregloPreguntas=datos;
        })
      }
    })

    this.bd.bdstate().subscribe(res=>{
      if(res){
        this.bd.fetchUsuario().subscribe(datos=>{
          this.arreglousuario=datos;
        })
      }
    })

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

  /*huella(){
  this.faio.isAvailable().then((result: any) => {
    this.faio.show({
      cancelButtonTitle: 'Cancelar',
      description: "Ingrese su huella para continuar",
      disableBackup: true,
      title: 'Balls aventure biometrics security',
      fallbackButtonTitle: 'FB Back Button',
      subtitle: ''
    })
      .then((result: any) => {
        //Esto ocurrirá cuando hayan coincidencias de las huellas digitales
        //this.bd.modificarUsuaro(this.id,this.nombre,this.correoIngresado,this.imagenNueva,this.telefono);
        //this.volverPerfil.emit(["false",this.nombre,this.correoIngresado,this.imagenNueva])
        //this.presentToast("bottom","Datos modificados !!",2500);
        //alert("Successfully Authenticated!")
      })
      .catch((error: any) => {
      });
    
  })
    .catch((error: any) => {
    
    });
  }*/



}
 



