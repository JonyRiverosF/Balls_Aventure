import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-olvidaste-c',
  templateUrl: './olvidaste-c.page.html',
  styleUrls: ['./olvidaste-c.page.scss'],
})
export class OlvidasteCPage implements OnInit {

  formularioOlvidaste:FormGroup;

  constructor(public fb:FormBuilder, public alertController:AlertController) {

    this.formularioOlvidaste=this.fb.group({
      'Correo': new FormControl("",[Validators.required,Validators.minLength(5),Validators.email]),
      'Respuesta': new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(70)])


    })

   }

  ngOnInit() {
  }

  async ingresar(){
    var f = this.formularioOlvidaste.value;
    
    if(this.formularioOlvidaste.invalid){
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
