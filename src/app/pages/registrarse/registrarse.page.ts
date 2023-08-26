import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  formularioRegistro:FormGroup;

  constructor(public fb:FormBuilder,public alertController:AlertController) {
    
    this.formularioRegistro=this.fb.group({
      'nombre': new FormControl("",[Validators.required,Validators.minLength(3)]),
      'contraseña': new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(15),Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),
      'Confirmar_contraseña': new FormControl("",Validators.required),
      'Correo': new FormControl("",[Validators.required,Validators.minLength(5),Validators.email]),
      'Edad':new FormControl("",[Validators.required,Validators.min(6),Validators.max(30)])

    })
   }

  ngOnInit() {
  }


  async Registrar(){
    var f = this.formularioRegistro.value;


    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header:'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar'],
      });
  
      await alert.present();
      return;
    }
    var usuario ={
      nombre:f.nombre,
      contraseña:f.contraseña
    }
    localStorage.setItem('usuario',JSON.stringify(usuario));

  }
}