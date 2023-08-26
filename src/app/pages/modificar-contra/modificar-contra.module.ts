import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarContraPageRoutingModule } from './modificar-contra-routing.module';

import { ModificarContraPage } from './modificar-contra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ModificarContraPageRoutingModule
  ],
  declarations: [ModificarContraPage]
})
export class ModificarContraPageModule {}
