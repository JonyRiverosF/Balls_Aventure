import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NivelMedioPageRoutingModule } from './nivel-medio-routing.module';

import { NivelMedioPage } from './nivel-medio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NivelMedioPageRoutingModule
  ],
  declarations: [NivelMedioPage]
})
export class NivelMedioPageModule {}
