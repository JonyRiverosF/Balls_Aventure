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
      'Respuesta': new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(30)])


    })

   }

   get correo(){
    return this.formularioOlvidaste.get('Correo') as FormControl;
   }

   get respuesta(){
    return this.formularioOlvidaste.get('Respuesta') as FormControl;
   }





  ngOnInit() {
  }

  

}
