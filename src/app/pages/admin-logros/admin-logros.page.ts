import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-admin-logros',
  templateUrl: './admin-logros.page.html',
  styleUrls: ['./admin-logros.page.scss'],
})
export class AdminLogrosPage implements OnInit {

  formularioLogros:FormGroup;

  arregloLogros:any =[{
    idL: 0,
    nombreL: '',
    descripcion:'',
    recompensa:0 
  }]

  pedirNL="";
  pedirDL="";
  pedirRL!:number;

  constructor(public fb:FormBuilder, public alertController:AlertController,private bd:DbservicioService,private router:Router) {

    this.formularioLogros=this.fb.group({
      'NombreLogro': new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(30)]),
      'Descripcion': new FormControl("",[Validators.required,Validators.minLength(5),Validators.maxLength(150)]),
      'Recompensa': new FormControl("",[Validators.required,Validators.min(1),Validators.max(500)])

    })
   }

  ngOnInit() {
    this.bd.bdstate().subscribe(res=>{
      if(res){
        this.bd.fetchLogro().subscribe(datos=>{
          this.arregloLogros=datos;
        })
      }
    })
  }

  get NombreL(){
    return this.formularioLogros.get('NombreLogro') as FormControl;
   }
  
   get Descp(){
    return this.formularioLogros.get('Descripcion') as FormControl;
   }
  
   get Recompensa(){
    return this.formularioLogros.get('Recompensa') as FormControl;
   }

  AgregarLogro(){
      this.bd.insertarLogro(this.pedirNL, this.pedirDL, this.pedirRL);
      this.bd.presentAlert("Logro Agregado");
      this.router.navigate(['/admin-skins'])
  }

}
