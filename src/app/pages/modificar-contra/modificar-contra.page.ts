import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController,  } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras,Router } from '@angular/router';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-modificar-contra',
  templateUrl: './modificar-contra.page.html',
  styleUrls: ['./modificar-contra.page.scss'],
})
export class ModificarContraPage implements OnInit {
  formularioModiContra:FormGroup;

  arreglousuario:any =[{
    idU: 0,
    nombreU: '' ,
    correo:'',
    contrasena:'',
    idPregunta:0,
    respuesta:''
  }]

  contra1:string="";
  contra2:string="";
  mensaje:string="Las contraseñas no coinciden";
  idUsuario:number=0;
  RespuestaG:any;
  
  constructor(public fb:FormBuilder, public alertController:AlertController,private router:Router,private bd:DbservicioService,private activatedRouter:ActivatedRoute) {

    this.activatedRouter.queryParams.subscribe(param =>{
      if (this.router.getCurrentNavigation()?.extras.state){
        this.RespuestaG = this.router.getCurrentNavigation()?.extras?.state?.["RespuestaG"];
        this.idUsuario=this.RespuestaG.idUsuario;
      }
    })
    this.formularioModiContra=this.fb.group({
      'Contraseña': new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(15),Validators.pattern(new RegExp("(?=.*[0-9])")),Validators.pattern(new RegExp("(?=.*[A-Z])")),Validators.pattern(new RegExp("(?=.*[a-z])")),Validators.pattern(new RegExp("(?=.*[$@^!%*?&])"))]),
      'ContraseñaConfirm': new FormControl("",[Validators.required])
    })
   }

   registrar(){
    if (this.contra1==this.contra2){
      this.bd.actualizarclaveUsuario(this.idUsuario,this.contra1);
      this.presentAlert("Usuario Modificado");
      this.router.navigate(['/iniciar-sesion'])
    }else{
      this.presentAlert("No hay coincidencias en las claves");
    }
   }

   get contra(){
    return this.formularioModiContra.get('Contraseña') as FormControl;
   }
   get confirmar_contra(){
    return this.formularioModiContra.get('ContraseñaConfirm') as FormControl;
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
