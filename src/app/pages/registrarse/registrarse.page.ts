import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { NavigationExtras,Router } from '@angular/router';
import { ModificarContraPage } from '../modificar-contra/modificar-contra.page';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  arregloPreguntas:any =[{
    idP: '',
    nombreP: '' 
  }]

  contra1:string="";
  contra2:string="";
  mensaje:string="Las contraseñas no coinciden";
  formularioRegistro:FormGroup;
  

  constructor(public fb:FormBuilder,public alertController:AlertController,private router:Router, private bd:DbservicioService) {

    
   
    
    this.formularioRegistro=this.fb.group({
      'nombre': new FormControl("",[Validators.required,Validators.minLength(3)]),
      'contraseña': new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(15),Validators.pattern(new RegExp("(?=.*[0-9])")),Validators.pattern(new RegExp("(?=.*[A-Z])")),Validators.pattern(new RegExp("(?=.*[a-z])")),Validators.pattern(new RegExp("(?=.*[$@^!%*?&])"))]),
      'Confirmar_contraseña': new FormControl("",[Validators.required]),
      'Correo': new FormControl("",[Validators.required,Validators.minLength(5),Validators.email]),
      'Respuesta': new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(30)])
    })
   }
  
   eliminar(x:any){
    this
   }



   registrar(){
    if (this.contra1==this.contra2){
      this.router.navigate(['/lobby'],)

    }else{
      let navigationextra:NavigationExtras={
        state:{
          mensaje:this.mensaje
        }
      }
    }
    

   }

   
   


   get nombreU(){
    return this.formularioRegistro.get('nombre') as FormControl;
   }

   get contra(){
    return this.formularioRegistro.get('contraseña') as FormControl;
   }

   get confirmar_contra(){
    return this.formularioRegistro.get('Confirmar_contraseña') as FormControl;
   }

   get correo(){
    return this.formularioRegistro.get('Correo') as FormControl;
   }

   get respuesta(){
    return this.formularioRegistro.get('Respuesta') as FormControl;
   }

  ngOnInit() {
    this.bd.bdstate().subscribe(res=>{
      if(res){
        this.bd.fetchPregunta().subscribe(datos=>{
          this.arregloPreguntas=datos;
        })
      }
    })
  }


 
}

