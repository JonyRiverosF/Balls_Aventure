import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-normal',
  templateUrl: './usuario-normal.page.html',
  styleUrls: ['./usuario-normal.page.scss'],
})


export class UsuarioNormalPage implements OnInit {
  usuario: any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Obtén los parámetros de la URL que contienen los datos del usuario
    this.activatedRoute.paramMap.subscribe((params) => {
      const datosUsuario = params.get('datosUsuario');
      if (datosUsuario) {
        // Parsea los datos del usuario desde la cadena JSON
        this.usuario = JSON.parse(datosUsuario);
      }
    });
  }
  


}
