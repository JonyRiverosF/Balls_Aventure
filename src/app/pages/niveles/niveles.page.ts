import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router ,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.page.html',
  styleUrls: ['./niveles.page.scss'],
})
export class NivelesPage implements OnInit {
  infoUsuario:any;

  constructor(private router:Router, private activatedRouter:ActivatedRoute) {
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
    let navigationextra:NavigationExtras={
      state:{
        infoUsuario:this.infoUsuario,
        
       
      }
      
    }
    this.router.navigate(['/nivel-dificil'],navigationextra)
  }
   

  ngOnInit() {
  }

}
