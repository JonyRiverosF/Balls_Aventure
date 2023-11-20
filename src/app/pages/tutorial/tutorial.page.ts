import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
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

  personajePosX = 0;
  personajePosY = 0;
  intento=false;
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
  cambioRapidez = false;
  menus: boolean = false;
  moverEmpezar: boolean = false;
  nivelcompletado: boolean = false;
  

  tiempo: number = 0;
  intervalId: any = null;
  primerMovimiento = false;

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

  constructor(private toastController: ToastController, private activatedRouter: ActivatedRoute, private router: Router, private bd: DbservicioService, public alertController:AlertController) {

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
      if (this.tiempo == 30) {
        this.bd.verificarExistenciaInter(this.infoUsuario.idU, 2)
          .then(existe => {
            if (!existe) {
              this.bd.insertarInter(this.infoUsuario.idU, 2)  
              this.mostrarToast('logro "Maquina" completado');       
      }}) 
      }
        const enemy1 = document.getElementById('enemy1');
    const enemy2 = document.getElementById('enemy2');
    const enemy3 = document.getElementById('enemy3');
    const enemy4 = document.getElementById('enemy4');
      if(this.tiempo==40){
        this.mostrarToast('velocidad de enemigos aumentada x2'); 
       
    if(enemy1&&enemy2&&enemy3&&enemy4){
      enemy1.classList.remove('enemy1');
    enemy2.classList.remove('enemy2');
    enemy3.classList.remove('enemy3');
    enemy4.classList.remove('enemy4');

    enemy1.classList.add('enemy11');
    enemy2.classList.add('enemy22');
    enemy3.classList.add('enemy33');
    enemy4.classList.add('enemy44');
    }
    

      }
      if(this.tiempo==60){
        this.mostrarToast('velocidad de enemigos aumentada x3'); 
       
    if(enemy1&&enemy2&&enemy3&&enemy4){
      enemy1.classList.remove('enemy1');
    enemy2.classList.remove('enemy2');
    enemy3.classList.remove('enemy3');
    enemy4.classList.remove('enemy4');

    enemy1.classList.add('enemy111');
    enemy2.classList.add('enemy222');
    enemy3.classList.add('enemy333');
    enemy4.classList.add('enemy444');
    }
    

      }


      this.enemys();
      this.estrella();
    }, 100);

  }
  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1000, 
      position: 'top' 
    });
    await toast.present();
  }
  iniciar() {
    this.intervalId = setInterval(() => {
      this.tiempo++;
    }, 1000); // 1000 milisegundos = 1 segundo
  }

  iniciarCronometro() {
    if (!this.primerMovimiento) {
      this.primerMovimiento = true;
      this.iniciar();
    }
  }

  volverAlInicio() {
    // window.location.href = '/lobby';
    let navigationextra: NavigationExtras = {
      state: {
        infoUsuario: this.infoUsuario,
      }
    }
    const e1 = document.getElementById('estrella1');
    const e2 = document.getElementById('estrella2');
    const e3 = document.getElementById('estrella3');
    const e4 = document.getElementById('estrella4');
    const enemy1 = document.getElementById('enemy1');
    const enemy2 = document.getElementById('enemy2');
    const enemy3 = document.getElementById('enemy3');
    const enemy4 = document.getElementById('enemy4');
    const personaje = document.querySelector('.pj') as HTMLElement | null;
    if(e1&&e2&&e3&&e4&&personaje&&enemy1&&enemy2&&enemy3&&enemy4){
    e1.classList.remove('disintegration-animation');
    e2.classList.remove('disintegration-animation');
    e3.classList.remove('disintegration-animation');
    e4.classList.remove('disintegration-animation');
    personaje.classList.remove('disintegration-animation');
    enemy1.classList.remove('enemy1');
    enemy2.classList.remove('enemy2');
    enemy3.classList.remove('enemy3');
    enemy4.classList.remove('enemy4');
    enemy1.classList.remove('enemy11');
    enemy2.classList.remove('enemy22');
    enemy3.classList.remove('enemy33');
    enemy4.classList.remove('enemy44');
    enemy1.classList.remove('enemy111');
    enemy2.classList.remove('enemy222');
    enemy3.classList.remove('enemy333');
    enemy4.classList.remove('enemy444');
  }
    this.router.navigate(['/lobby'], navigationextra)
    this.personajePosX = 0;
    this.personajePosY = 0;
    this.rotationDegrees = 0;
    this.empezo=false;
    //Puerta y estrellas
    this.estrellasrecojidas = 0;
    this.tiempo=0;
    this.moverEmpezar=true;
    this.primerMovimiento=false;
    
    clearInterval(this.intervalId);

    this.haTocadoEstrella1 = false;
    this.haTocadoEstrella2 = false;
    this.haTocadoEstrella3 = false;
    
    this.menus = false;
    this.nivelcompletado = false;
   
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
    const enemy1 = document.getElementById('enemy1');
    const enemy2 = document.getElementById('enemy2');
    const enemy3 = document.getElementById('enemy3');
    const enemy4 = document.getElementById('enemy4');
    if(enemy1&&enemy2&&enemy3&&enemy4){
    enemy1.classList.remove('enemy1');
    enemy2.classList.remove('enemy2');
    enemy3.classList.remove('enemy3');
    enemy4.classList.remove('enemy4');}
    clearInterval(this.intervalId);
  }

  reanudar() {
    this.primerMovimiento=false;
    console.log("Botón reanudar presionado");
    this.menus = false;
    const enemy1 = document.getElementById('enemy1');
    const enemy2 = document.getElementById('enemy2');
    const enemy3 = document.getElementById('enemy3');
    const enemy4 = document.getElementById('enemy4');
    if(enemy1&&enemy2&&enemy3&&enemy4){
    enemy1.classList.add('enemy1');
    enemy2.classList.add('enemy2');
    enemy3.classList.add('enemy3');
    enemy4.classList.add('enemy4');}
  }

  moverempezar() {
    this.moverEmpezar = true;
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
          setTimeout(() => {
            e1.classList.remove('disintegration-animation');
            this.haTocadoEstrella1 = false;
          }, 5000);
          
        }
      }
      if (!this.haTocadoEstrella2) {
        if (this.colisiona(personaje, e2)) {
          console.log('colision');
          this.estrellasrecojidas += 1;
          e2.classList.add('disintegration-animation');
          this.haTocadoEstrella2 = true;
          setTimeout(() => {
            e2.classList.remove('disintegration-animation');
            this.haTocadoEstrella2 = false;
          }, 5000);
          
        }
      }
      if (!this.haTocadoEstrella3) {
        if (this.colisiona(personaje, e3)) {
          console.log('colision');
          this.estrellasrecojidas += 1;
          e3.classList.add('disintegration-animation');
          this.haTocadoEstrella3 = true;
          setTimeout(() => {
            e3.classList.remove('disintegration-animation');
            this.haTocadoEstrella3 = false;
          }, 5000);
          
        }
      }
      if (!this.haTocadoEstrella4) {
        if (this.colisiona(personaje, e4)) {
          console.log('colision');
          this.estrellasrecojidas += 1;
          e4.classList.add('disintegration-animation');
          this.haTocadoEstrella4 = true;
          setTimeout(() => {
            e4.classList.remove('disintegration-animation');
            this.haTocadoEstrella4 = false;
          }, 5000);
          
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
        if (personaje && enemy2) {
          if (this.colisiona(personaje, enemy2)) {
            console.log('colision');
            if(!this.intento){
               this.bd.insertarIntento(this.estrellasrecojidas, this.tiempo, false, 1, this.infoUsuario.idU);
               this.intento=true
            }
           
            this.bd.actualizarMonedasUsuario(this.infoUsuario.idU,this.infoUsuario.monedas+this.estrellasrecojidas+this.tiempo);
            this.bd.verificarExistenciaInter(this.infoUsuario.idU, 1)
            .then(existe => {
              if (!existe) {
                this.bd.insertarInter(this.infoUsuario.idU, 1)
                this.mostrarToast('logro "Novato" completado');
                 
        }})
            personaje.classList.add('disintegration-animation');
            this.mostrarAlerta = true;
            clearInterval(this.intervalId);
          }
        }
        if (personaje && enemy1) {
          if (this.colisiona(personaje, enemy1)) {
            console.log('colision');
            if(!this.intento){
              this.bd.insertarIntento(this.estrellasrecojidas, this.tiempo, false, 1, this.infoUsuario.idU);
              this.intento=true
           }
            this.bd.actualizarMonedasUsuario(this.infoUsuario.idU,this.infoUsuario.monedas+this.estrellasrecojidas+this.tiempo);
            this.bd.verificarExistenciaInter(this.infoUsuario.idU, 1)
            .then(existe => {
              if (!existe) {
                this.bd.insertarInter(this.infoUsuario.idU, 1)
                this.mostrarToast('logro "Novato" completado');
                 
        }})
            personaje.classList.add('disintegration-animation');
            this.mostrarAlerta = true;
            clearInterval(this.intervalId);
          }
        }
        if (personaje && enemy3) {
          if (this.colisiona(personaje, enemy3)) {
            console.log('colision');
            if(!this.intento){
              this.bd.insertarIntento(this.estrellasrecojidas, this.tiempo, false, 1, this.infoUsuario.idU);
              this.intento=true
           }
            this.bd.actualizarMonedasUsuario(this.infoUsuario.idU,this.infoUsuario.monedas+this.estrellasrecojidas+this.tiempo);
            this.bd.verificarExistenciaInter(this.infoUsuario.idU, 1)
            .then(existe => {
              if (!existe) {
                this.bd.insertarInter(this.infoUsuario.idU, 1)
                this.mostrarToast('logro "Novato" completado');
                 
        }})
            personaje.classList.add('disintegration-animation');
            this.mostrarAlerta = true;
            clearInterval(this.intervalId);
          }
        }
        if (personaje && enemy4) {
          if (this.colisiona(personaje, enemy4)) {
            console.log('colision');
            if(!this.intento){
              this.bd.insertarIntento(this.estrellasrecojidas, this.tiempo, false, 1, this.infoUsuario.idU);
              this.intento=true
           }
            this.bd.actualizarMonedasUsuario(this.infoUsuario.idU,this.infoUsuario.monedas+this.estrellasrecojidas+this.tiempo);
            this.bd.verificarExistenciaInter(this.infoUsuario.idU,1)
            .then(existe => {
              if (!existe) {
                this.bd.insertarInter(this.infoUsuario.idU, 1)
                this.mostrarToast('logro "Novato" completado');
                 
        }})
            personaje.classList.add('disintegration-animation');
            this.mostrarAlerta = true;
            clearInterval(this.intervalId);
          }
        }
      }
    }
  }
  presentAlert(arg0: string) {
    throw new Error('Method not implemented.');
  }

  moverPersonajeIzquierda() {
    const personaje = document.querySelector('.pj') as HTMLElement | null;
    if (personaje) {
      personaje.classList.add('alaizquierda');
      if (this.personajePosX - this.movimientoPixelesx >= 0) {
        this.personajePosX -= this.movimientoPixelesx;
        this.iniciarCronometro();
      }
    }
    this.empezo = true;
    this.moverEmpezar = false;
  }

  moverPersonajeAbajo() {
    this.personajePosY += this.movimientoPixelesy;
    this.iniciarCronometro();
    this.empezo = true;
    this.moverEmpezar = false;
    
  }

  moverPersonajeArriba() {
    if (this.personajePosY - this.movimientoPixelesy <= this.maxy) {
      this.personajePosY -= this.movimientoPixelesy;
      this.iniciarCronometro();
    }
    this.empezo = true;
    this.moverEmpezar = false;
  }

  moverPersonajeDerecha() {
    const personaje = document.querySelector('.pj') as HTMLElement | null;
    if (this.personajePosX + this.movimientoPixelesx <= this.maxX) {
      this.personajePosX += this.movimientoPixelesx;
      this.iniciarCronometro();

    }
    this.empezo = true;
    this.moverEmpezar = false;
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
}





