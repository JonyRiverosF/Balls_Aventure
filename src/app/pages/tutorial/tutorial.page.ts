import { Component, OnInit } from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss', ],
})
export class TutorialPage implements OnInit {

  // Variable para rastrear la posición del personaje en píxeles
personajePosX = 0;
personajePosY = 0; 
haTocadoEstrella1 = false;
haTocadoEstrella2 = false;
haTocadoEstrella3 = false;
estrellasrecojidas:number = 0;
private isMovingLeft = false;
private isMovingRight = false;
private rotationInterval: any;
public rotationDegrees = 0;
maxX: number = 800; // Ancho máximo del contenedor o pantalla

puertaAbierta:boolean = false;

//Timeout Con alerta
tiempoExpirado: boolean = false;
tiempoLimite: number = 30000;
tiempoRestante!: number;
menus: boolean = false;
mostrarAlerta: boolean = false;
nivelcompletado: boolean = false;


constructor(private router: Router, public alertController: AlertController) {
  // Calcula el ancho máximo del contenedor o pantalla una vez que la vista esté cargada
  this.calcularMaxX();
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
  window.location.href = '/tutorial';
}


//Movimiento Pj
  ventana(){// Escucha el evento de redimensionamiento de la ventana para recalcular maxX si es necesario
  window.addEventListener('resize', () => {
    this.calcularMaxX();
  });}
calcularMaxX() {
  // Obtén el ancho del contenedor o pantalla actualizado
  const contenedor = document.getElementById('tu-contenedor'); // Reemplaza 'tu-contenedor' con el ID de tu contenedor
  if (contenedor) {
    this.maxX = contenedor.clientWidth;
  }
}
menu(){
  this.menus=true;
}
reanudar(){
  this.menus=false;
}

moverPersonaje() {
  const llave = document.querySelector('.llave') as HTMLElement | null;
  const puerta1 = document.querySelector('.puerta1') as HTMLElement | null;
  const estrella = document.querySelector('.estrella') as HTMLElement | null;
  const estrella1 = document.querySelector('.estrella1') as HTMLElement | null;
  const estrella2 = document.querySelector('.estrella2') as HTMLElement | null;
  const caja = document.querySelector('.caja') as HTMLElement | null;
  const personaje = document.querySelector('.pj') as HTMLElement | null;
  const pinchos = document.querySelector('.pinchos') as HTMLElement | null;

  if (personaje && llave) {
    if (this.colisiona(personaje, llave)) {
      this.puertaAbierta = true;
      llave.classList.add('disintegration-animation');
      
       
    }
    
  }
  if (personaje && puerta1) {
    if (this.colisiona(personaje, puerta1)) {
      this.nivelcompletado = true;

    }
  }
  if (personaje && estrella && !this.haTocadoEstrella1) {
    if (this.colisiona(personaje, estrella)) {
      estrella.classList.add('disintegration-animation');
      this.estrellasrecojidas++; // Incrementa el contador en uno
      this.haTocadoEstrella1 = true; // Marca que el personaje ha tocado una estrella
    }
  }
  
  if (personaje && estrella1 && !this.haTocadoEstrella2) {
    if (this.colisiona(personaje, estrella1)) {
      estrella1.classList.add('disintegration-animation');
      this.estrellasrecojidas++; // Incrementa el contador en uno
      this.haTocadoEstrella2 = true; // Marca que el personaje ha tocado una estrella
    }
  }
  
  if (personaje && estrella2 && !this.haTocadoEstrella3) {
    if (this.colisiona(personaje, estrella2)) {
      estrella2.classList.add('disintegration-animation');
      this.estrellasrecojidas++; // Incrementa el contador en uno
      this.haTocadoEstrella3 = true; // Marca que el personaje ha tocado una estrella
    }
  }

  
  
  
  
  
  

  if (this.isMovingLeft) {
    this.personajePosX -= 2.5; // Ajusta la cantidad de píxeles según tu preferencia
    this.personajePosX = Math.max(this.personajePosX, 0); // Límite izquierdo
  }
  if (this.isMovingRight) {
    this.personajePosX += 2.5; // Ajusta la cantidad de píxeles según tu preferencia
    this.personajePosX = Math.min(this.personajePosX, this.maxX); // Límite derecho
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



//Saltar Pj
private isJumping = false; // Agrega una propiedad para rastrear si el personaje está saltando

saltarPersonaje() {
  if (!this.isJumping) {
    this.isJumping = true;
    const jumpHeight = -100; // Ajusta la altura del salto según tu preferencia
    const jumpDuration = 500; // Ajusta la duración del salto según tu preferencia

    const initialPosY = this.personajePosY-20;
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
}

 
 

