import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-nivel-dificil',
  templateUrl: './nivel-dificil.page.html',
  styleUrls: ['./nivel-dificil.page.scss'],
})
export class NivelDificilPage implements OnInit {

  //Caja
  cajaPosX =0;
  maxcaja: number = 75;


  //PJ y movimientos
  private isJumping = false;
  personajePosX = 0;
  personajePosY = 0;
  private isMovingLeft = false;
  private isMovingRight = false;
  private rotationInterval: any;
  public rotationDegrees = 0;
  maxX: number = 800; 
  

  //Puerta y estrellas
  estrellasrecojidas:number = 0;
  haTocadoEstrella1 = false;
  haTocadoEstrella2 = false;
  haTocadoEstrella3 = false;
  menus: boolean = false;
  nivelcompletado: boolean = false;
  puertaAbierta = false;
   
  
  //Timeout Con alerta
  tiempoExpirado: boolean = false;
  tiempoLimite: number = 180000;
  tiempoRestante!: number;
  public mostrarAlerta: boolean = false;

  @ViewChild('pj', { static: false }) personaje!: ElementRef;
  constructor(private router: Router, public alertController: AlertController) {
    this.calcularMaxX();
  }
  
  //Timeout Alerta
  ngOnInit() {
    setTimeout(() => {
      this.tiempoExpirado = true;
      this.mostrarAlerta = true; 
      if (this.tiempoExpirado) {
        const personaje = document.getElementById('tu-personaje'); 
        if (personaje) {
          personaje.classList.add('death-animation');
        }
      }
    }, this.tiempoLimite);
  
    let tiempoInicial = this.tiempoLimite / 1000; 
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
    window.location.href = '/nivel-dificil';
  }
  
  
  //Movimiento Pj
    ventana(){
    window.addEventListener('resize', () => {
      this.calcularMaxX();
    });}
  calcularMaxX() {
    const contenedor = document.getElementById('tu-contenedor'); 
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
    const personaje = document.querySelector('.pj') as HTMLElement | null;
    const pinchos = document.querySelector('.pinchos') as HTMLElement | null;
    const caja = document.querySelector('.caja') as HTMLElement | null;
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
        this.estrellasrecojidas++;
        this.haTocadoEstrella1 = true;
      }
    }
  
    if (personaje && estrella1 && !this.haTocadoEstrella2) {
      if (this.colisiona(personaje, estrella1)) {
        estrella1.classList.add('disintegration-animation');
        this.estrellasrecojidas++; 
        this.haTocadoEstrella2 = true; 
        }
     }
  
    if (personaje && estrella2 && !this.haTocadoEstrella3) {
      if (this.colisiona(personaje, estrella2)) {
        estrella2.classList.add('disintegration-animation');
        this.estrellasrecojidas++; 
        this.haTocadoEstrella3 = true; 
        }
    }
    
    if (personaje && caja) {
      if (this.colisiona(personaje, caja)) {  
        this.cajaPosX -= -1; 
      }
    
    if (this.isMovingLeft) {
      this.personajePosX -= 2.5; 
      this.personajePosX = Math.max(this.personajePosX, 0); 
    }

    if (this.isMovingRight) {
      this.personajePosX += 2.5; 
      this.personajePosX = Math.min(this.personajePosX, this.maxX); 
      }
    
    }

    if (personaje && pinchos) {
      if (this.colisiona(personaje, pinchos)) {
          personaje.classList.add('disintegration-animation'); 
          setTimeout(() => {
            personaje.classList.add('disintegration-animation');
            this.mostrarAlerta = true;
            setTimeout(() => {
              this.mostrarAlerta = true;
              this.personajePosX = 0; 
            }, 5000); 
          }, 1000); 
        }
      }
    }
  
  startMoving(direction: string) {
    if (direction === 'izquierda') {
      this.isMovingLeft = true;
    } else if (direction === 'derecha') {
      this.isMovingRight = true;
    }
    this.rotationInterval = 
    setInterval(() => {
      this.rotationDegrees += 8;
      this.moverPersonaje();
    }, 15); 
  }
  
  stopMoving(direction: string) {
    if (direction === 'izquierda') {
      this.isMovingLeft = false;
    } else if (direction === 'derecha') {
      this.isMovingRight = false;
    }
    clearInterval(this.rotationInterval);
  }
  
  
  
  //Saltar Pj
  saltarPersonaje() {
    if (!this.isJumping) {
      this.isJumping = true;
      const jumpHeight = -100;
      const jumpDuration = 500; 
  
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
      }, 16); 
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
  
    

    //Colision con caja
    /*colisionarConCaja() {
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
    }*/


    //Funcion para colisiones
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

  }

