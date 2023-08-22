import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreadoresJuegoPageRoutingModule } from './creadores-juego-routing.module';

import { CreadoresJuegoPage } from './creadores-juego.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreadoresJuegoPageRoutingModule
  ],
  declarations: [CreadoresJuegoPage]
})
export class CreadoresJuegoPageModule {}
