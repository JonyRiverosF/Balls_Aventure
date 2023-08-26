import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlvidasteCPageRoutingModule } from './olvidaste-c-routing.module';

import { OlvidasteCPage } from './olvidaste-c.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    OlvidasteCPageRoutingModule
  ],
  declarations: [OlvidasteCPage]
})
export class OlvidasteCPageModule {}
