import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {

  formularioModificar:FormGroup;

  constructor(public fb:FormBuilder, public alertController:AlertController) { 

    this.formularioModificar=this.fb.group({
      'NombreUsuario': new FormControl("",[Validators.required,Validators.minLength(5)]),
      'Edad': new FormControl("",[Validators.required,Validators.min(5),Validators.max(15)])


    })

  }
  ngOnInit() {
  }


  async ingresar(){
    var f = this.formularioModificar.value;
    
    if(this.formularioModificar.invalid){
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
