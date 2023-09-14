import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NivelDificilPageRoutingModule } from './nivel-dificil-routing.module';

import { NivelDificilPage } from './nivel-dificil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NivelDificilPageRoutingModule
  ],
  declarations: [NivelDificilPage]
})
export class NivelDificilPageModule {}
