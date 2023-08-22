import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiempoCargaPageRoutingModule } from './tiempo-carga-routing.module';

import { TiempoCargaPage } from './tiempo-carga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiempoCargaPageRoutingModule
  ],
  declarations: [TiempoCargaPage]
})
export class TiempoCargaPageModule {}
