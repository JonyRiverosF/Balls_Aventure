import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-contra',
  templateUrl: './modificar-contra.page.html',
  styleUrls: ['./modificar-contra.page.scss'],
})
export class ModificarContraPage implements OnInit {

  formularioModiContra:FormGroup;

  constructor(public fb:FormBuilder, public alertController:AlertController) {

    this.formularioModiContra=this.fb.group({
      'Contraseña': new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(15),Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),
      'ContraseñaConfirm': new FormControl("",[Validators.required])


    })

   }

  ngOnInit() {
  }

  async ingresar(){
    var f = this.formularioModiContra.value;
    
    if(this.formularioModiContra.invalid){
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
