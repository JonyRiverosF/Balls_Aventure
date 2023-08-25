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
      'nombre': new FormControl("",Validators.required),
      'contraseña': new FormControl("",Validators.required),
      'Confirmar_contraseña': new FormControl("",Validators.required),
      'Correo': new FormControl("",Validators.required)

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