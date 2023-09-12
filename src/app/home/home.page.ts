import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DbservicioService } from '../services/dbservicio.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nombreusuario:string="Dani";
  edad:number=20;
  lista: any =[{
    nombre:"jose",
    edad:35,
    apellido:"Juarez"
  }]
  nom:string="";

  constructor(private router: Router, private alertController: AlertController, private toastController: ToastController, private db : DbservicioService ) {}

  sumar(){
    this.nombreusuario;
    console.log("hola mundo");
   
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'mensajito',
      message: 'esta es una alerta',
      buttons: ['OK'],
    });

    await alert.present();
  }
  irpagina1(){
    console.log("hola mundo");
    this.router.navigate(['/iniciar-sesion']);
    //this.presentAlert();
    this.presentToast("top");
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Hola mundo!',
      duration: 1500,
      position: position,
      
    });

    await toast.present();
  }
  

}
