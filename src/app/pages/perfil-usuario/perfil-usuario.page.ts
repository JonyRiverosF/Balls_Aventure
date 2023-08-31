import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  nombreRecibido:string = "";
  edadRecibida:number = 0;
  correorecibido:string="";
  descripcion:string ="";

  constructor(private router:Router, private activatedRouter:ActivatedRoute) {
    this.activatedRouter.queryParams.subscribe(param =>{
      if (this.router.getCurrentNavigation()?.extras.state){
        
        this.correorecibido = this.router.getCurrentNavigation()?.extras?.state?.["correoenviado"];
        this.edadRecibida = this.router.getCurrentNavigation()?.extras?.state?.["edadenviado"];
        this.nombreRecibido = this.router.getCurrentNavigation()?.extras?.state?.["nombreenviado"];
        this.descripcion = this.router.getCurrentNavigation()?.extras?.state?.["descripcion"];
        
      }
    })
   }

  ngOnInit() {
  }

}
