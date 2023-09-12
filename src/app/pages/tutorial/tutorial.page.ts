import { Component, OnInit } from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  // Variable para rastrear la posición del personaje en píxeles
  personajePosX = 0;
  private isMovingLeft = false;
  private isMovingRight = false;
  private rotationInterval: any;
  public rotationDegrees = 0;
  
  
  constructor(private router:Router,public alertController :AlertController) { }

  
  moverPersonaje() {
    if (this.isMovingLeft) {
      this.personajePosX -= 2.5; // Ajusta la cantidad de píxeles según tu preferencia
    }
    if (this.isMovingRight) {
      this.personajePosX += 2.5; // Ajusta la cantidad de píxeles según tu preferencia
    }
  }

  startMoving(direction: string) {
    if (direction === 'izquierda') {
      this.isMovingLeft = true;
    } else if (direction === 'derecha') {
      this.isMovingRight = true;
    }

    // Iniciar rotación continua
    this.rotationInterval = setInterval(() => {
      this.rotationDegrees += 7.5;
       // Ajusta la cantidad de grados para la rotación
      this.moverPersonaje();
    }, 20); // Ajusta el intervalo según la velocidad de rotación
  }

  stopMoving(direction: string) {
    this.isMovingLeft = false;
    this.isMovingRight = false;

    // Detener rotación y movimiento
    clearInterval(this.rotationInterval);
  }




  ngOnInit() {
  }


  



  /*moverPersonaje(direccion: string) {
    // Función para mover el personaje
    if (direccion === 'izquierda') {
      this.personajePosX -= 10; // Mueve 10 píxeles hacia la izquierda
    } else if (direccion === 'derecha') {
      this.personajePosX += 10; // Mueve 10 píxeles hacia la derecha
    }
  }*/

  
  

  public alertButtons = [
     
    {header:"¿Volver al lobby?",
      text: 'REANUDAR',
      cssClass: 'alert-button-cancel',
      
    },
    {
      text: 'LOBBY',
      cssClass: 'alert-button-confirm',
      
     
      
    },
    
    
    
  ];

  async mostrarmenu() {
    const alert = await this.alertController.create({
      header: '¿Volver al lobby?',
      buttons: [
        {
          text: 'REANUDAR',
          cssClass: 'reanudar',
        },
        {
          text: 'LOBBY',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.router.navigate(['/lobby']);  
          },
        },
      ],
    });

    await alert.present();
  }





 
}

 
 

