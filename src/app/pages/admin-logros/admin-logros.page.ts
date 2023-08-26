import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-logros',
  templateUrl: './admin-logros.page.html',
  styleUrls: ['./admin-logros.page.scss'],
})
export class AdminLogrosPage implements OnInit {

  formularioLogros:FormGroup;

  constructor(public fb:FormBuilder, public alertController:AlertController) {

    this.formularioLogros=this.fb.group({
      'NombreLogro': new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(30)]),
      'Descripcion': new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(300)]),
      'Recompensa': new FormControl("",[Validators.required,Validators.min(1),Validators.max(60)])

    })
   }

  ngOnInit() {
  }

  async Enviar(){
    var f = this.formularioLogros.value;
    
    

    if(this.formularioLogros.invalid){
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
