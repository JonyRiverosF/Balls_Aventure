import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras,Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {


  usuarioadmin:string="joni@gmail.com";
  usuarionormal:string="dani@gmail.com";


  correousuario:string = "";
  claveusuario:string = "";
  edad:number=20;
  nombreusuario:string ="TigerShadoWX8";
  descripcionusuario:string ="juego mucho valo jiji";
  

  
  
  formularioLogin:FormGroup;

  constructor(public fb:FormBuilder, public alertController:AlertController,private router:Router,) {

    this.formularioLogin=this.fb.group({
      'Correo1': new FormControl('',[Validators.required,Validators.minLength(5),Validators.email]),
      'contraseña1': new FormControl ('',[Validators.required,Validators.minLength(5),Validators.maxLength(15)])

    })

    

   }

   get correo(){
    return this.formularioLogin.get('Correo1') as FormControl;
   }

   get contra(){
    return this.formularioLogin.get('contraseña1') as FormControl;
   }

   


  ngOnInit() {
  }

  irlobby(){
    let navigationextra:NavigationExtras={
      state:{
        correoenviado:this.correousuario,
        edadenviado:this.edad,
        nombreenviado:this.nombreusuario,
        descripcion:this.descripcionusuario
      }
    }
    this.router.navigate(['/perfil-usuario'],navigationextra)
  }

  admin_o_usuario(){
    if(this.correousuario==this.usuarioadmin){
      this.router.navigate(['/admin-usuarios'],)

    }
    else{
      let navigationextra:NavigationExtras={
        state:{
          correoenviado:this.correousuario,
         
        }
      }

      this.router.navigate(['/lobby'],navigationextra)

    }
  }

  
}


  

