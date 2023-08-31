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
      'Contraseña': new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(15),Validators.pattern(new RegExp("(?=.*[0-9])")),Validators.pattern(new RegExp("(?=.*[A-Z])")),Validators.pattern(new RegExp("(?=.*[a-z])")),Validators.pattern(new RegExp("(?=.*[$@^!%*?&])"))]),
      'ContraseñaConfirm': new FormControl("",[Validators.required])


    })

   }

   get contra(){
    return this.formularioModiContra.get('Contraseña') as FormControl;
   }
   get confirmar_contra(){
    return this.formularioModiContra.get('ContraseñaConfirm') as FormControl;
   }

  ngOnInit() {
  }

  

}
