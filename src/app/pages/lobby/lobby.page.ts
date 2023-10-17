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
  arregloIntentos:any =[{
    idI: 0,
    estrellas: 0 ,
    tiempo:0,
    completado:false,
    idNiveles:0,
    idUsuario:0

  }]

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
    this.bd.bdstate().subscribe(res=>{
      if(res){
        this.bd.fetchIntento().subscribe(datos=>{
          this.arregloIntentos=datos.filter(item=> item.idUsuario == this.infoUsuario.idU);
        })
      }
    })
  }
     
  
  irperfil(){
    let navigationextra:NavigationExtras={
      state:{
        infoUsuario:this.infoUsuario
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
    
   for(var i = 0; i<this.arregloIntentos.length; i++){
      if(this.arregloIntentos[i].idNiveles==1){
        if(this.arregloIntentos[i].completado==true){
          this.bd.insertarInter(this.infoUsuario.idU, 1);
          this.bd.presentAlert('inter tutorial agregado');
        }
      }
    }
    this.router.navigate(['/historial'],navigationextra)
    
  }

  

}
