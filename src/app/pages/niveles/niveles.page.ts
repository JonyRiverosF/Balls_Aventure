import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router ,NavigationExtras } from '@angular/router';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.page.html',
  styleUrls: ['./niveles.page.scss'],
})
export class NivelesPage implements OnInit {
  infoUsuario:any;
  correousuario:string ="";
  arreglousuario:any =[{
    idU: 0,
    nombreU: '' ,
    correo:'',
    contrasena:'',
    idPregunta:0,
    respuesta:'',
    descripcion:'',
    foto:''
  }]

  constructor(private router:Router, private activatedRouter:ActivatedRoute, private bd:DbservicioService) {
    this.activatedRouter.queryParams.subscribe(param =>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.infoUsuario = this.router.getCurrentNavigation()?.extras?.state?.["infoUsuario"];
      }
    })
   }

   tutorial(){
    let navigationextra:NavigationExtras={
      state:{
        infoUsuario:this.infoUsuario,
      }
    }
    this.router.navigate(['/tutorial'],navigationextra)
    } 
  
  
  nivel_medio(){
    let navigationextra:NavigationExtras={
      state:{
        infoUsuario:this.infoUsuario,
      }
    }
    this.router.navigate(['/nivel-medio'],navigationextra)
  }
  
  nivel_dificil(){
    this.router.navigate(['/nivel-dificil']);
  }
   

  ngOnInit() {
    this.bd.bdstate().subscribe(res=>{
      if(res){
        this.bd.fetchUsuario().subscribe(datos=>{
          this.arreglousuario=datos;
        })
      }
    })
  }

}
