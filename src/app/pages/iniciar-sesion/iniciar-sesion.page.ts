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
      'Correo': new FormControl("",[Validators.required,Validators.minLength(5),Validators.email]),
      'contraseña': new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(15),Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)])

    })
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
    
    

    if(this.formularioLogin.invalid){
      const alert = await this.alertController.create({
        header:'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar'],
      });
  
      await alert.present();
      return;
    }
  }
}
