import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-tiempo-carga',
  templateUrl: './tiempo-carga.page.html',
  styleUrls: ['./tiempo-carga.page.scss'],
})

export class TiempoCargaPage implements OnInit {

  dias :any;

  constructor(public api:ApiService) { }

  obtenerInfo() {
    this.api.getUsers().subscribe((data) => {
      //console.log(data);
      console.log(this.dias);
      this.dias = data;
    });
  }
 
  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.obtenerInfo();
  }

  mostrarDatos() {
    this.obtenerInfo();
  }

}
