import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras,Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {


  correousuario:string = "";
  claveusuario:string = "";
  edad:number=20;
  nombreusuario:string ="TigerShadoWX8";
  descripcionusuario:string ="juego mucho valo jiji";
  

  
  
  formularioLogin:FormGroup;

  constructor(public fb:FormBuilder, public alertController:AlertController,private router:Router,) {

    this.formularioLogin=this.fb.group({
      'Correo1': ['',Validators.required,Validators.minLength(5),Validators.email],
      'contraseña1': ['',Validators.required,Validators.minLength(5),Validators.maxLength(15)]

    })

    

   }

   get correo(){
    return this.formularioLogin.get('Correo1') as FormControl;
   }

   get contra(){
    return this.formularioLogin.get('contraseña1') as FormControl;
   }

   procesar(){
    console.log(this.formularioLogin.value);
   }


  ngOnInit() {
  }

  irlobby(){
    let navigationextra:NavigationExtras={
      state:{
        correoenviado:this.correousuario,
        edadenviado:this.edad,
        nombreenviado:this.nombreusuario,
        descripcion:this.descripcionusuario
      }
    }
    this.router.navigate(['/perfil-usuario'],navigationextra)
  }

  async ingresar(){
    var f = this.formularioLogin.value;
    console.log(this.formularioLogin)



    
  }
}


  

