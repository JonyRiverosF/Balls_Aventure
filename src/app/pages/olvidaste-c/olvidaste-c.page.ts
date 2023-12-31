import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-olvidaste-c',
  templateUrl: './olvidaste-c.page.html',
  styleUrls: ['./olvidaste-c.page.scss'],
})
export class OlvidasteCPage implements OnInit {

  arregloPreguntas:any =[{
    idP: 0,
    nombreP: '' 
  }]

  arreglousuario:any =[{
    idU: 0,
    nombreU: '' ,
    correo:'',
    contrasena:'',
    foto:'',
    idPregunta:0,
    idRol:0,
    monedas:0,
    descripcion:'',
    respuesta:''
  }]

  x:string="false";
  idUsuario:number=0;
  RespuestaG:any=[]
  pedirCorreo="";
  pedirPregunta:any={idP:0};
  respuesta:string="";

  constructor(public alertController:AlertController,private bd:DbservicioService,private router:Router) {
   }


  ngOnInit() {
    this.bd.bdstate().subscribe(res=>{
      if(res){
        this.bd.fetchPregunta().subscribe(datos=>{
          this.arregloPreguntas=datos;
        })
      }
    })
    this.bd.bdstate().subscribe(res=>{
      if(res){
        this.bd.fetchUsuario().subscribe(datos=>{
          this.arreglousuario=datos;
        })
      }
    })
  }

  correoU(){
    for(var i=0;i<this.arreglousuario.length;i++){
      //this.presentAlert("respuesta del usuario: "+String(this.pedirCorreo));
      //this.presentAlert("respuesta del usuario: "+String(this.arreglousuario[i].correo));
      if(this.pedirCorreo.toLowerCase() == this.arreglousuario[i].correo){
        //this.presentAlert("respuesta del usuario: "+String(this.arreglousuario[i].respuesta));
        this.RespuestaG.push({
          idPregunta:this.arreglousuario[i].idPregunta,
          respuesta:this.arreglousuario[i].respuesta,
          idUsuario:this.arreglousuario[i].idU
        })
      }
  }
  if(this.RespuestaG.length == 0){
    this.presentAlert("Usuario no registrado");
  }
}

  CambiarContra(){
    var x = true;
    if(x){
      this.correoU();
      //this.presentAlert("respuesta del usuario: "+String(this.respuesta));
      //this.presentAlert("respuesta del usuario: "+String(this.RespuestaG[0].idUsuario));
      //this.presentAlert("respuesta del push: "+String(this.RespuestaG[0].respuesta))
      if (this.pedirPregunta.idP == this.RespuestaG[0].idPregunta){
        if(this.respuesta.toLocaleLowerCase() == this.RespuestaG[0].respuesta.toLocaleLowerCase()){
          this.idUsuario = this.RespuestaG[0].idUsuario;
          this.x = 'true';
          let navigationextra:NavigationExtras={
            state:{
              RespuestaG:this.RespuestaG[0]
            }
          }
          this.presentAlert("Usuario Correcto");
          this.router.navigate(['/modificar-contra'],navigationextra)
          
        }else{
          this.presentAlert("Respuesta incorrecta");
        }
      }else{
        this.presentAlert("Pregunta incorrecta");
      }
    }
    this.RespuestaG = [];
  }
  
  async presentAlert( msj:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
