import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-componente1',
  templateUrl: './componente1.component.html',
  styleUrls: ['./componente1.component.scss'],
})
export class Componente1Component  implements OnInit {
  constructor(private activatedRouter:ActivatedRoute,private router: Router, public alertController: AlertController,private bd:DbservicioService) { }

  ngOnInit() {}
/*
  //Caja
  cajaPosX =0;
  maxcaja: number = 75;
 
 
  //PJ y movimientos
  private isJumping = false;
  private enSuperficieDePlataforma = false;
  personajePosX = 0;
  personajePosY = 0;
  private verticalVelocity = 0;
  private isMovingLeft = false;
  private isMovingRight = false;
  private rotationInterval: any;
  public rotationDegrees = 0;
  maxX: number = 800; 
  maxY: number = 0; 
  
 
  //Puerta y estrellas
  estrellasrecojidas:number = 0;
  haTocadoEstrella1 = false;
  haTocadoEstrella2 = false;
  haTocadoEstrella3 = false;
  haTocadoPuerta = false;
  menus: boolean = false;
  nivelcompletado: boolean = false;
  puertaAbierta = false;
   
  
  //Timeout Con alerta
  tiempoExpirado: boolean = false;
  tiempoLimite: number = 30000;
  tiempoRestante!: number;
  public mostrarAlerta: boolean = false;
 
  infoUsuario:any;
  
  constructor(private activatedRouter:ActivatedRoute,private router: Router, public alertController: AlertController,private bd:DbservicioService) { }

  ngOnInit() {}

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
  colisionaarriba(element1: HTMLElement, element2: HTMLElement): boolean {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return (
      
      rect1.bottom > rect2.top &&
      rect1.left > rect2.top &&
      rect1.right > rect2.top &&
      rect1.top > rect2.top 
  
      
    );
  }
  volverAlInicio(){
    //window.location.href = '/lobby';
    this.router.navigate(['/lobby'])
  }
  
  volverAIntentarlo(){
    //window.location.href = '/tutorial';
    this.router.navigate(['/tutorial'])
  }
  
  
  //Movimiento Pj
 
  
  menu(){
    this.menus=true;
    this.bd.presentAlert('intento holi agregado');
    
    
    
  }
  reanudar(){
    this.menus=false;
  }

  moverPersonaje() {
    const llave = document.querySelector('.llave') as HTMLElement | null;
    const puerta1 = document.querySelector('.puerta1') as HTMLElement | null;
    const puerta = document.querySelector('.puerta') as HTMLElement | null;
    const estrella = document.querySelector('.estrella') as HTMLElement | null;
    const estrella1 = document.querySelector('.estrella1') as HTMLElement | null;
    const estrella2 = document.querySelector('.estrella2') as HTMLElement | null;
    const caja = document.querySelector('.caja') as HTMLElement | null;
    const personaje = document.querySelector('.pj') as HTMLElement | null;
    const personajeup = document.querySelector('.pjup') as HTMLElement | null;
    const pinchos = document.querySelector('.pinchos') as HTMLElement | null;
    const plataforma1 = document.getElementById('plataforma1');
    const plataforma2 = document.getElementById('plataforma2');
    const plataforma3 = document.getElementById('plataforma3');
    const plataforma4 = document.getElementById('plataforma4');
    const gravedad = 1.2; // Ajusta la fuerza de la gravedad según tus necesidades
    this.verticalVelocity += gravedad;
  
    // Mover el personaje verticalmente
    
   //arriba de plataformas
      if (personaje && plataforma1) {
      if (this.colisiona(personaje, plataforma1)) {
        this.verticalVelocity = 0; // Detener la gravedad
        
        this.enSuperficieDePlataforma = true;
      }
    }
    if (personaje && plataforma2) {
      if (this.colisiona(personaje, plataforma2)) {
        this.verticalVelocity = 0; // Detener la gravedad
        
        this.enSuperficieDePlataforma = true;
      }
    }
    if (personaje && plataforma3) {
      if (this.colisiona(personaje, plataforma3)) {
        this.verticalVelocity = 0; // Detener la gravedad
        
        this.enSuperficieDePlataforma = true;
      }
    }
    if (personaje && plataforma4) {
      if (this.colisiona(personaje, plataforma4)) {
        this.verticalVelocity = 0; // Detener la gravedad
        
        this.enSuperficieDePlataforma = true;
      }
    }
    this.personajePosY += this.verticalVelocity;
   //que la gravedad no haga que traspase el suelo
    if (this.personajePosY > this.maxY) {
      this.personajePosY = this.maxY; // Ajusta la posición para que no supere el límite inferior
      this.verticalVelocity = 0; // Detén la velocidad vertical (puede cambiar según tus necesidades)
      this.isJumping = false; 
    }
  
    if (personaje && llave) {
      if (this.colisiona(personaje, llave)) {
        this.puertaAbierta = true;
        llave.classList.add('disintegration-animation');
        
         
      }
      
    }
    if (personaje && puerta1 && !this.haTocadoPuerta) {
      if (this.colisiona(personaje, puerta1)) {
        
        this.nivelcompletado = true;
        
        this.haTocadoPuerta = true; 
  
      }
    }
    if (personaje && puerta) {
      if (this.colisiona(personaje, puerta)) {
       
  
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
  
    if (this.isMovingLeft) {
      this.personajePosX -= 2.5; 
      this.personajePosX = Math.max(this.personajePosX, 0); 
    }
  
    if (this.isMovingRight) {
      this.personajePosX += 2.5; 
      this.personajePosX = Math.min(this.personajePosX, this.maxX); 
    }
  
  }

  startMoving(direction: string) {
    if (direction === 'izquierda') {
      this.isMovingLeft = true;
    } else if (direction === 'derecha') {
      this.isMovingRight = true;
    } this.rotationInterval = setInterval(() => {
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
      this.verticalVelocity = -15;
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
      }, 16); 
    }
  }*/

}
