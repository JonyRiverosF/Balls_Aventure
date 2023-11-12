import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

import { DbservicioService } from 'src/app/services/dbservicio.service';


@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss',],
})
export class TutorialPage implements OnInit {

  //Caja
  cajaPosX = 0;
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
  maxy: number = 800;
  empezo: boolean = false;



  //Puerta y estrellas
  estrellasrecojidas: number = 0;
  haTocadoEstrella1 = false;
  haTocadoEstrella2 = false;
  haTocadoEstrella3 = false;
  haTocadoEstrella4 = false;
  haTocadoPuerta = false;
  menus: boolean = false;
  moverEmpezar: boolean = false;
  nivelcompletado: boolean = false;
  puertaAbierta = false;


  //Timeout Con alerta
  tiempoExpirado: boolean = false;
  tiempoLimite: number = 30000;
  tiempoRestante!: number;
  public mostrarAlerta: boolean = false;
  movimientoPixelesx = 72;
  movimientoPixelesy = 60;

  infoUsuario: any;
  id: number = 0;

  @ViewChild('pj', { static: false }) personaje!: ElementRef;

  constructor(private activatedRouter: ActivatedRoute, private router: Router, private bd: DbservicioService) {

    this.activatedRouter.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.infoUsuario = this.router.getCurrentNavigation()?.extras?.state?.["infoUsuario"];
        //this.id=this.infoUsuario.idU;

      }
    })
    this.calcularMaxX();

  }

  //Timeout Alerta
  ngOnInit() {
    this.moverempezar();
    console.log(this.empezo);
    setInterval(() => {

      this.enemys();
      this.estrella();
    }, 100);
    setTimeout(() => {


      this.tiempoExpirado = true;
      this.mostrarAlerta = true;
      if (this.tiempoExpirado) {
        this.bd.insertarIntento(this.estrellasrecojidas, 0, false, 1, this.infoUsuario.idU);
        //this.bd.presentAlert('intento fallido agregado');
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



  //Redireccion
  volverAlInicio() {
    // window.location.href = '/lobby';
    let navigationextra: NavigationExtras = {
      state: {
        infoUsuario: this.infoUsuario,


      }

    }
    this.router.navigate(['/lobby'], navigationextra)
    this.isJumping = false;
    this.enSuperficieDePlataforma = false;
    this.personajePosX = 0;
    this.personajePosY = 0;
    this.verticalVelocity = 0;
    this.isMovingLeft = false;
    this.isMovingRight = false;

    this.rotationDegrees = 0;



    //Puerta y estrellas
    this.estrellasrecojidas = 0;
    this.haTocadoEstrella1 = false;
    this.haTocadoEstrella2 = false;
    this.haTocadoEstrella3 = false;
    this.haTocadoPuerta = false;
    this.menus = false;
    this.nivelcompletado = false;
    this.puertaAbierta = false;


    //Timeout Con alerta
    this.tiempoExpirado = false;

    this.mostrarAlerta = false;

  }


  volverAIntentarlo() {
    //window.location.href = '/tutorial';
    // this.router.navigate(['/tutorial'])
    //this.router.navigateByUrl('/tutorial');

    const currentUrl = this.router.url;
    this.router.navigateByUrl('/lobby', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


  //Movimiento Pj
  ventana() {// 
    window.addEventListener('resize', () => {
      this.calcularMaxX();
    });
  }

  calcularMaxX() {
    const contenedor = document.getElementById('tu-contenedor');
    if (contenedor) {
      this.maxX = contenedor.clientWidth;
      this.maxy = contenedor.clientHeight;
      //this.maxY = contenedor.clientHeight;
    }
  }

  menu() {
    this.menus = true;
    // this.bd.insertarIntento(this.estrellasrecojidas, 0, true, 1, this.infoUsuario.idU);
    //this.bd.presentAlert('intento  agregado');


    //this.bd.presentAlert('intento  infousuario'+this.infoUsuario.idU);


  }
  reanudar() {
    console.log("Botón reanudar presionado");
    this.menus = false;
  }
  moverempezar() {
    this.moverEmpezar = true;

  }

  moverPersonaje() {
    const llave = document.querySelector('.llave') as HTMLElement | null;
    const enemy1 = document.querySelector('.enemy1') as HTMLElement | null;
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


    if (personaje && puerta1 && !this.haTocadoPuerta) {
      if (this.colisiona(personaje, puerta1)) {
        this.bd.insertarIntento(this.estrellasrecojidas, 0, true, 1, this.infoUsuario.idU);
        this.bd.insertarInter(this.infoUsuario.idU, 1);
        this.bd.presentAlert('inter tutorial agregado');
        this.bd.presentAlert('intento  agregado');

        this.nivelcompletado = true;

        this.haTocadoPuerta = true;

      }
    }


    if (personaje && estrella && !this.haTocadoEstrella1) {
      if (this.colisiona(personaje, estrella)) {
        estrella.classList.add('disintegration-animation');
        this.estrellasrecojidas++;
        this.haTocadoEstrella1 = true;
      }
    }




  }
  estrella() {
    const e1 = document.getElementById('estrella1');
    const e2 = document.getElementById('estrella2');
    const e3 = document.getElementById('estrella3');
    const e4 = document.getElementById('estrella4');
    const personaje = document.querySelector('.pj') as HTMLElement | null;
    if (personaje && e1 && e2 && e3 && e4) {
      if (!this.haTocadoEstrella1) {
        if (this.colisiona(personaje, e1)) {
          console.log('colision');
          this.estrellasrecojidas += 1;
          e1.classList.add('disintegration-animation');
          this.haTocadoEstrella1 = true;

        }
      }
      if (!this.haTocadoEstrella2) {
        if (this.colisiona(personaje, e2)) {
          console.log('colision');
          this.estrellasrecojidas += 1;
          e2.classList.add('disintegration-animation');
          this.haTocadoEstrella2 = true;
        }
      }
      if (!this.haTocadoEstrella3) {
        if (this.colisiona(personaje, e3)) {
          console.log('colision');
          this.estrellasrecojidas += 1;
          e3.classList.add('disintegration-animation');
          this.haTocadoEstrella3 = true;
        }
      }
      if (!this.haTocadoEstrella4) {
        if (this.colisiona(personaje, e4)) {
          console.log('colision');
          this.estrellasrecojidas += 1;
          e4.classList.add('disintegration-animation');
          this.haTocadoEstrella4 = true;
        }
      }
    }

  }
  enemys() {
    const enemy1 = document.getElementById('enemy1');
    const enemy2 = document.getElementById('enemy2');
    const enemy3 = document.getElementById('enemy3');
    const enemy4 = document.getElementById('enemy4');
    const personaje = document.querySelector('.pj') as HTMLElement | null;

    if (enemy1 && enemy2 && enemy3 && enemy4) {
      if (this.empezo == true) {
        enemy1.classList.add('enemy1');
        enemy2.classList.add('enemy2');
        enemy3.classList.add('enemy3');
        enemy4.classList.add('enemy4');
        if (personaje && enemy1) {
          if (this.colisiona(personaje, enemy1)) {
            console.log('colision');
            personaje.classList.add('disintegration-animation');
            this.mostrarAlerta = true;
          }
        }
        if (personaje && enemy2) {
          if (this.colisiona(personaje, enemy2)) {
            console.log('colision');
            personaje.classList.add('disintegration-animation');
            this.mostrarAlerta = true;
          }
        }
        if (personaje && enemy3) {
          if (this.colisiona(personaje, enemy3)) {
            console.log('colision');
            personaje.classList.add('disintegration-animation');
            this.mostrarAlerta = true;
          }
        }
        if (personaje && enemy4) {
          if (this.colisiona(personaje, enemy4)) {
            console.log('colision');
            personaje.classList.add('disintegration-animation');
            this.mostrarAlerta = true;
          }
        }

      }
    }


  }
  moverPersonajeIzquierda() {
    const personaje = document.querySelector('.pj') as HTMLElement | null;
    if (personaje) {
      personaje.classList.add('alaizquierda');
      if (this.personajePosX - this.movimientoPixelesx >= 0) {
        this.personajePosX -= this.movimientoPixelesx;
      }
    }


    this.empezo = true;
    this.moverEmpezar = false;
  }
  moverPersonajeAbajo() {

    this.personajePosY += this.movimientoPixelesy;

    this.empezo = true;
    this.moverEmpezar = false;

  }
  moverPersonajeArriba() {
    if (this.personajePosY - this.movimientoPixelesy <= this.maxy) {
      this.personajePosY -= this.movimientoPixelesy;

    }


    this.empezo = true;
    this.moverEmpezar = false;
  }

  movio = false;
  moverPersonajeDerecha() {
    const personaje = document.querySelector('.pj') as HTMLElement | null;
    if (personaje && this.movio == false) {

      personaje.classList.add('aladerecha');
      this.movio = true;

    }

    if (this.personajePosX + this.movimientoPixelesx <= this.maxX) {
      this.personajePosX += this.movimientoPixelesx;

    }

    this.empezo = true;
    this.moverEmpezar = false;


  }





  //Saltar Pj


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





