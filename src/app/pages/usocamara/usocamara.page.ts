import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Share } from '@capacitor/share';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-usocamara',
  templateUrl: './usocamara.page.html',
  styleUrls: ['./usocamara.page.scss'],
})
export class UsocamaraPage implements OnInit {
  image :any;

  constructor(private activatedRoute: ActivatedRoute,public toastController: ToastController, private alertController: AlertController) { }

  ngOnInit() {
  }

  /*async share() {
    try {
      // Compartir título, texto y URL
      await Share.share({
        title: 'See cool stuff',
        text: 'Really awesome thing you need to see right meow',
        url: 'http://ionicframework.com/',
        dialogTitle: 'Share with buddies',
      });
    } catch (e) {
      this.presentAlert("Error en share1: " + e);
    }
  
    try {
      // Compartir solo texto
      await Share.share({
        text: 'Really awesome thing you need to see right meow',
      });
    } catch (e) {
      this.presentAlert("Error en share2: " + e);
    }
  
    try {
      // Compartir solo URL
      await Share.share({
        url: 'http://ionicframework.com/',
      });
    } catch (e) {
      this.presentAlert("Error en share3: " + e);
    }
  
    try {
      // Compartir un archivo local utilizando el parámetro 'url'
      const photo = await Camera.getPhoto(options);
      await Share.share({
        url: photo.path,
      });
    } catch (e) {
      this.presentAlert("Error en share4: " + e);
    }
  
    try {
      // Compartir varios archivos utilizando el parámetro 'files'
      const { photos } = await Camera.pickImages(options);
      await Share.share({
        files: photos.map(photo => photo.path!),
      });
    } catch (e) {
      this.presentAlert("Error en share5: " + e);
    }
  }*/

  share(){
    Share.share({
      title: 'Prueba de Share',
      text: 'Revisemos si funciona esta vaina',
      url: 'http://ionicframework.com/',
    });
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
