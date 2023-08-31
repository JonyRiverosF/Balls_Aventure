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
      'NombreUsuario': new FormControl("",[Validators.required,Validators.minLength(3)]),
      'Descripcion': new FormControl("",[Validators.maxLength(300)])


    })

  }
  ngOnInit() {
  }


  get nombreU(){
    return this.formularioModificar.get('NombreUsuario') as FormControl;
   }
  
  get Descri(){
    return this.formularioModificar.get('Descripcion') as FormControl;
   }

}
