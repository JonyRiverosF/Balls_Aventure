import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router ,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
})
export class LobbyPage implements OnInit {
  usuarioiniciado:number=0;
  nombre_en_lobby:any;
  edad:number=20;
  nombreusuario:string ="TigerShadoWX8";
  descripcionusuario:string ="juego mucho valo jiji";

  constructor(private router:Router, private activatedRouter:ActivatedRoute) {
    this.activatedRouter.queryParams.subscribe(param =>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.nombre_en_lobby = this.router.getCurrentNavigation()?.extras?.state?.["infoUsuario"];
        
       
      }
    })

   }

  ngOnInit() {
  }
  irperfil(){
    let navigationextra:NavigationExtras={
      state:{
        correoenviado:this.nombre_en_lobby,
        edadenviado:this.edad,
        nombreenviado:this.nombreusuario,
        descripcion:this.descripcionusuario
       
      }
      
    }
    this.router.navigate(['/perfil-usuario'],navigationextra)
  }

}
