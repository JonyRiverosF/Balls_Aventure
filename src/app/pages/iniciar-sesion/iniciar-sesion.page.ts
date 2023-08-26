import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {

  formularioLogin:FormGroup;

  constructor(public fb:FormBuilder, public alertController:AlertController) {

    this.formularioLogin=this.fb.group({
      'Correo': new FormControl("",[Validators.required,Validators.minLength(5),Validators.email]),
      'contraseña': new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(15),Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)])

    })
   }

  ngOnInit() {
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
