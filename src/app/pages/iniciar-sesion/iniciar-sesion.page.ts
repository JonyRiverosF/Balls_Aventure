import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras,Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {


  //usuarioadmin:string="joni@gmail.com";
  //usuarionormal:string="dani@gmail.com";


  
  //edad:number=20;
  //nombreusuario:string ="TigerShadoWX8";
  //descripcionusuario:string ="juego mucho valo jiji";

  correousuario:string = "";
  claveusuario:string = "";
  

  arreglousuario:any =[{
    idU: 0,
    nombreU: '' ,
    correo:'',
    contrasena:'',
    idPregunta:0,
    idRol:0
  }]

  
  
  formularioLogin:FormGroup;

  constructor(public fb:FormBuilder, public alertController:AlertController,private router:Router,private bd:DbservicioService,private storage: Storage) {
    //for(var i = 0; i<this.arreglousuario.length; i++){
      //if(this.correousuario==this.arreglousuario[i].correo){
        //storage.set('usuario1d',this.arreglousuario[i]);
      //}
    
    
    this.formularioLogin=this.fb.group({
      'Correo1': new FormControl('',[Validators.required]),
      'contraseña1': new FormControl ('',[Validators.required])
    })
   }

   get correo(){
    return this.formularioLogin.get('Correo1') as FormControl;
   }

   get contra(){
    return this.formularioLogin.get('contraseña1') as FormControl;
   }

   


  ngOnInit() {
    this.bd.bdstate().subscribe(res=>{
      if(res){
        this.bd.fetchUsuario().subscribe(datos=>{
          this.arreglousuario=datos;
        })
      }
    })
  }

  /*irlobby(){
    let navigationextra:NavigationExtras={
    }
    this.router.navigate(['/perfil-usuario'],navigationextra)
  }*/

  admin_o_usuario(){
   for(var i = 0; i<this.arreglousuario.length; i++){
    if(this.correousuario==this.arreglousuario[i].correo){
      if(this.claveusuario==this.arreglousuario[i].contrasena){
        if(this.arreglousuario[i].idRol==1){
          
          let infoUsuario ={
            idU:this.arreglousuario[i].idU,
            correo:this.arreglousuario[i].correo,
            nombre:this.arreglousuario[i].nombreU,
            rol:this.arreglousuario[i].idRol,
            intento:this.arreglousuario[i].idIntento


          }
          let navigationextra:NavigationExtras={
            state:{
              infoUsuario:infoUsuario
            }
          }
          this.router.navigate(['/lobby'],navigationextra)
        }
        if(this.arreglousuario[i].idRol==2){
          this.router.navigate(['/admin-usuarios'])
        }
      }else{
        this.presentAlert("Contraseña incorrecta");
      }
    }//else{
      //this.presentAlert("Correo no existe");
    //}
   }
  }

  async presentAlert( msj:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }

  
}


  

