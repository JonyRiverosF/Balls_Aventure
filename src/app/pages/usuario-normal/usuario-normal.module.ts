import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioNormalPageRoutingModule } from './usuario-normal-routing.module';

import { UsuarioNormalPage } from './usuario-normal.page';
import { Componente1Component } from 'src/app/components/componente1/componente1.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioNormalPageRoutingModule
  ],
  declarations: [UsuarioNormalPage,Componente1Component]
})
export class UsuarioNormalPageModule {}
