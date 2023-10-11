import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router ,NavigationExtras } from '@angular/router';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
})
export class LobbyPage implements OnInit {
  
  infoUsuario:any;
  edad:number=20;
  nombreusuario:string ="TigerShadoWX8";
  descripcionusuario:string ="juego mucho valo jiji";
  arregloInter: any[] = [{
    idUsuario: 0,
    idLogro: 0
  }];

  constructor(private router:Router, private activatedRouter:ActivatedRoute, private bd:DbservicioService) {
    this.activatedRouter.queryParams.subscribe(param =>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.infoUsuario = this.router.getCurrentNavigation()?.extras?.state?.["infoUsuario"];
        
       
      }
    })

   }

  ngOnInit() {
    if (this.infoUsuario) {
      this.bd.bdstate().subscribe(res => {
        if (res) {
          this.bd.fetchinter().subscribe(datos => {
            this.arregloInter = datos.filter(item => item.idUsuario == this.infoUsuario.idU); // Utiliza el ID dinámico del usuario
          });
        }
      });
    }
  }
     
  
  irperfil(){
    let navigationextra:NavigationExtras={
      state:{
        infoUsuario:this.infoUsuario,
        edadenviado:this.edad,
        nombreenviado:this.nombreusuario,
        descripcion:this.descripcionusuario
       
      }
      
    }
    this.router.navigate(['/perfil-usuario'],navigationextra)
  }
  Logros(){
    let navigationextra:NavigationExtras={
      state:{
        infoUsuario:this.infoUsuario,
        
       
      }
      
    }
    this.router.navigate(['/logros'],navigationextra)
  }
  jugar(){
    let navigationextra:NavigationExtras={
      state:{
        infoUsuario:this.infoUsuario,
        
       
      }
      
    }
    this.router.navigate(['/niveles'],navigationextra)
  }
  historial(){
    let navigationextra:NavigationExtras={
      state:{
        infoUsuario:this.infoUsuario,
        
       
      }
      
    }
    //this.bd.insertarIntento(2,50, false,3, this.infoUsuario.idU);
    //this.bd.presentAlert('insertar intento prueba');
    this.router.navigate(['/historial'],navigationextra)

  }

}
