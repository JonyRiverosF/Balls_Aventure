import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioNormalPageRoutingModule } from './usuario-normal-routing.module';

import { UsuarioNormalPage } from './usuario-normal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioNormalPageRoutingModule
  ],
  declarations: [UsuarioNormalPage]
})
export class UsuarioNormalPageModule {}
