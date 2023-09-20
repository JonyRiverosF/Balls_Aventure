import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-nivel-medio',
  templateUrl: './nivel-medio.page.html',
  styleUrls: ['./nivel-medio.page.scss'],
})
export class NivelMedioPage implements OnInit {

  // Variable para rastrear la posición del personaje en píxeles
  puertaAbierta = false;
  cajaPosX =0;
  personajePosX = 0;
  personajePosY = 0;
  private isMovingLeft = false;
  private isMovingRight = false;
  private rotationInterval: any;
  public rotationDegrees = 0;
  maxX: number = 800; // Ancho máximo del contenedor o pantalla
  maxcaja: number = 75;

  private isJumping = false; // Agrega una propiedad para rastrear si el personaje está saltando
  
  
   
  
  //Timeout Con alerta
  tiempoExpirado: boolean = false;
  tiempoLimite: number = 180000;
  tiempoRestante!: number;
  // Propiedad para controlar la visibilidad de la alerta
  public mostrarAlerta: boolean = false;

  @ViewChild('pj', { static: false }) personaje!: ElementRef;
  constructor(private router: Router, public alertController: AlertController) {
    this.calcularMaxX();
    this.calcularMaxcaja();
    
  }
  
  
  //Timeout Alerta
  ngOnInit() {
    setTimeout(() => {
      this.tiempoExpirado = true;
      this.mostrarAlerta = true; // Mostrar la alerta cuando se acabe el tiempo
  
      // Agrega la clase de animación de muerte a los elementos que deseas animar
      if (this.tiempoExpirado) {
        const personaje = document.getElementById('tu-personaje'); // Reemplaza 'tu-personaje' con el ID de tu personaje
        if (personaje) {
          personaje.classList.add('death-animation');
        }
      }
    }, this.tiempoLimite);
  
    let tiempoInicial = this.tiempoLimite / 1000; // Convertir a segundos
    this.tiempoRestante = tiempoInicial;
  
    const interval = setInterval(() => {
      if (!this.tiempoExpirado) {
        this.tiempoRestante -= 1;
        
        if (this.tiempoRestante < 0) {
          this.tiempoExpirado = true;
          clearInterval(interval);
        }
      }
    }, 1000);

    

  }

 

  
  
  volverAlInicio(){
    window.location.href = '/lobby';
  }
  
  volverAIntentarlo(){
    window.location.href = '/nivel-medio';
  }
  
  
  



  //Movimiento Pj
    ventana(){// Escucha el evento de redimensionamiento de la ventana para recalcular maxX si es necesario
    window.addEventListener('resize', () => {
      this.calcularMaxX();
      this.calcularMaxcaja();
    });}
  calcularMaxX() {
    // Obtén el ancho del contenedor o pantalla actualizado
    const contenedor = document.getElementById('tu-contenedor'); // Reemplaza 'tu-contenedor' con el ID de tu contenedor
    if (contenedor) {
      this.maxX = contenedor.clientWidth;
    }
  }
  calcularMaxcaja() {
    // Obtén el ancho del contenedor o pantalla actualizado
    const contenedorcaja = document.querySelector('.caja') as HTMLElement | null; // Reemplaza 'tu-contenedor' con el ID de tu contenedor
    if (contenedorcaja) {
      this.maxcaja = contenedorcaja.clientWidth;
    }
  }
  
  moverPersonaje() {
    if (this.isMovingLeft) {
      this.personajePosX -= 2.5; // Ajusta la cantidad de píxeles según tu preferencia
      this.personajePosX = Math.max(this.personajePosX, 0); // Límite izquierdo
    }
    if (this.isMovingRight) {
      this.personajePosX += 2.5; // Ajusta la cantidad de píxeles según tu preferencia
      this.personajePosX = Math.min(this.personajePosX, this.maxX); // Límite derecho
    }
    this.colisionarConCaja();
    
    const llave = document.querySelector('.llave') as HTMLElement | null;
    const caja = document.querySelector('.caja') as HTMLElement | null;
    const personaje = document.querySelector('.pj') as HTMLElement | null;
    const pinchos = document.querySelector('.pinchos') as HTMLElement | null;
  
    if (personaje && llave) {
      if (this.colisiona(personaje, llave)) {
        this.puertaAbierta = true;
        llave.classList.add('disintegration-animation');
        
        
      }
    }

if (personaje && caja) {
  if (this.colisiona(personaje, caja)) {
    
    this.cajaPosX -= -1; // Ajusta la posición hacia atrás (puedes ajustar el valor según tus necesidades)
  }
}

  if (personaje && pinchos) {
    if (this.colisiona(personaje, pinchos)) {
      // Realiza acciones cuando el personaje colisiona con los pinchos (por ejemplo, muerte)
      personaje.classList.add('disintegration-animation'); // Agrega la clase de animación

      setTimeout(() => {
        // Elimina la clase de animación después de un tiempo (ajusta el tiempo según lo necesario)
        personaje.classList.add('disintegration-animation');

        // Muestra la alerta después de que termine la animación
        this.mostrarAlerta = true;

        // Limpia la alerta después de cierto tiempo (ajusta el tiempo según lo necesario)
        setTimeout(() => {
          this.mostrarAlerta = true;
          this.personajePosX = 0; // Reinicia la posición del personaje u otras acciones de "muerte"
        }, 5000); // Cambia el tiempo de espera según tus necesidades
      }, 1000); // Cambia el tiempo de espera según la duración de tu animación
    }
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
      this.rotationDegrees += 8;
      // Ajusta la cantidad de grados para la rotación
      this.moverPersonaje();
    }, 15); // Ajusta el intervalo según la velocidad de rotación
  }
  
  stopMoving(direction: string) {
    if (direction === 'izquierda') {
      this.isMovingLeft = false;
    } else if (direction === 'derecha') {
      this.isMovingRight = false;
    }
  
    // Detener rotación y movimiento
    clearInterval(this.rotationInterval);
  }
  
  
  
  
  saltarPersonaje() {
    if (!this.isJumping) {
      this.isJumping = true;
      const jumpHeight = -100; // Ajusta la altura del salto según tu preferencia
      const jumpDuration = 500; // Ajusta la duración del salto según tu preferencia
  
      const initialPosY = this.personajePosY+2;
      const startTime = Date.now();
  
      const jumpInterval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
  
        if (elapsedTime >= jumpDuration) {
          clearInterval(jumpInterval);
          this.isJumping = false;
        } else {
          const progress = elapsedTime / jumpDuration;
          this.personajePosY = initialPosY + jumpHeight * Math.sin(progress * Math.PI);
        }
      }, 16); // Intervalo de actualización (aproximadamente 60 FPS)
    }
  }

  
  
  //Volver Al inicio
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
    
    colisionarConCaja() {
      const personaje = document.querySelector('.pj') as HTMLElement;
      const caja = document.querySelector('.caja') as HTMLElement;
    
      if (personaje && caja) {
        const personajeRect = personaje.getBoundingClientRect();
        const cajaRect = caja.getBoundingClientRect();
    
        // Detecta la colisión en el eje X
        if (personajeRect.right > cajaRect.left && personajeRect.left < cajaRect.right) {
          // Ajusta la posición horizontal del personaje
          if (personajeRect.right < cajaRect.right) {
            // Personaje colisiona desde la izquierda, ajusta a la izquierda de la caja
            this.personajePosX = cajaRect.left - personajeRect.width;
          } else {
            // Personaje colisiona desde la derecha, ajusta a la derecha de la caja
            this.personajePosX = cajaRect.right;
          }
        }
    
        
        if (personajeRect.bottom < cajaRect.top && personajeRect.top > cajaRect.bottom && personajeRect.top <= cajaRect.top) {
          this.personajePosY = cajaRect.top - personajeRect.height;
        }
        if (this.personajePosY >= cajaRect.top) {
          this.personajePosY <= cajaRect.top;
        }
      }
    }
   
    


    
    
    
    
  
    


// Función para verificar colisiones entre dos elementos
colisiona(element1: HTMLElement, element2: HTMLElement): boolean {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}


// Lógica para mostrar la alerta (ajusta esta lógica según tus necesidades)
mostrarAlertaFuncion() {
  this.mostrarAlerta = true;
}






}