import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-admin-skins',
  templateUrl: './admin-skins.page.html',
  styleUrls: ['./admin-skins.page.scss'],
})
export class AdminSkinsPage implements OnInit {

  idLo:number=0;

  listaL:any = [
    {
      idL:0,
      nombreL:"",
      descripcion:"",
      recompensa:"",
    } 
  ];

  constructor(public alertController:AlertController, private bd:DbservicioService) { 
   }
   EliminarLogro(id:number){
    this.idLo=id;
}

public alertButtons = [
  {
    text: 'Cancelar',
    role: 'cancel'
  },
  {
    text: 'Aceptar',
    
    role: 'confirm',
    handler: () => {
      for(let i=0;i<this.listaL.length;i++){
           if(this.idLo == this.listaL[i].idL){
                this.bd.eliminarLogro(this.idLo);
           }
      }
    },
  },
];


  ngOnInit() {
    this.bd.bdstate().subscribe(res=>{
      if(res){
        this.bd.fetchLogro().subscribe(datos=>{
          this.listaL=datos;
        })
      }
    })
  }

  

}
