import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-skins',
  templateUrl: './admin-skins.page.html',
  styleUrls: ['./admin-skins.page.scss'],
})
export class AdminSkinsPage implements OnInit {

  formularioSkin:FormGroup;

  constructor(public fb:FormBuilder, public alertController:AlertController) { 

    this.formularioSkin=this.fb.group({
      'NombreSkin': new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(30)]),
      'PrecioSkin': new FormControl("",[Validators.required,Validators.min(10),Validators.max(60)])

    })
   }


  ngOnInit() {
  }

  async Enviar(){
    var f = this.formularioSkin.value;
    
    

    if(this.formularioSkin.invalid){
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
