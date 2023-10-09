import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-logros',
  templateUrl: './logros.page.html',
  styleUrls: ['./logros.page.scss'],
})
export class LogrosPage implements OnInit {
  arregloLogros: any[] = [{
    idL: 0,
    nombreL: '',
    descripcion: '',
    recompensa: 0
  }];
  arregloInter: any[] = [{
    idUsuario: 0,
    idLogro: 0
  }];
  infoUsuario: any;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    private bd: DbservicioService
  ) {
    this.activatedRouter.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.infoUsuario = this.router.getCurrentNavigation()?.extras?.state?.["infoUsuario"];
      }
    });
  }

  ngOnInit() {
    this.loadLogros();
    this.loadInteracciones();
  }

  private loadLogros() {
    this.bd.bdstate().subscribe(res => {
      if (res) {
        this.bd.fetchLogro().subscribe(datos => {
          this.arregloLogros = datos;
        });
      }
    });
  }

  private loadInteracciones() {
    if (this.infoUsuario) {
      this.bd.bdstate().subscribe(res => {
        if (res) {
          this.bd.fetchinter().subscribe(datos => {
            this.arregloInter = datos.filter(item => item.idUsuario == this.infoUsuario.idU); 
          });
        }
      });
    }
  }
 
}