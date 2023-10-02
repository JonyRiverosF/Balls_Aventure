import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { NavigationExtras,Router } from '@angular/router';
import { ModificarContraPage } from '../modificar-contra/modificar-contra.page';
import { DbservicioService } from 'src/app/services/dbservicio.service';
import { Pregunta } from 'src/app/services/pregunta';

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

  arregloPreguntas1:any =[{
    idP: 3,
    nombreP: 'asdmkoasdc'
  },{idP:4,
  nombreP:'adawd'}]

  arreglousuario:any =[{
    idU: 0,
    nombreU: '' ,
    correo:'',
    idPregunta:0,
    idRol:0
  }]

  pedirUsuario="";
  pedirCorreo="";
  pedirPregunta:any;
  pedirRespuesta="";
  pedirContrasena="";
  pedirRol=1;
  des="";
  monedas=0;
  foto="";
  

  contra1:string="";
  contra2:string="";
  mensaje:string="Las contraseñas no coinciden";

  formularioRegistro:FormGroup;
  

  constructor(public fb:FormBuilder,public alertController:AlertController,private router:Router, private bd:DbservicioService) {
    this.formularioRegistro=this.fb.group({
      'nombre': new FormControl("",[Validators.required,Validators.minLength(3)]),
      'contraseña': new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(15),Validators.pattern(new RegExp("(?=.*[0-9])")),Validators.pattern(new RegExp("(?=.*[A-Z])")),Validators.pattern(new RegExp("(?=.*[a-z])")),Validators.pattern(new RegExp("(?=.*[$@^!%*?&])"))]),
      'Confirmar_contraseña': new FormControl("",[Validators.required]),
      'Correo': new FormControl("",[Validators.required,Validators.minLength(5),Validators.email]),
    })
   }
  
   /*eliminar(x:any){
    this
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

   registrar(){
    if (this.contra1==this.contra2){
      //this.presentAlert("tipoID--"+String(typeof this.pedirPregunta));
      //this.presentAlert("idPregunta-- "+String(this.pedirPregunta));  
      this.bd.insertarUsuario(this.pedirRespuesta, this.pedirUsuario, this.pedirContrasena, this.pedirCorreo, this.des,this.foto, this.monedas,this.pedirRol, this.pedirPregunta);
      this.bd.presentAlert("Usuario Agregado");
      this.router.navigate(['/iniciar-sesion'])
    }else{
      this.presentAlert("No hay coincidencias en las claves");
    }
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


 
}

