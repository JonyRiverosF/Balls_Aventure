import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkinsPageRoutingModule } from './skins-routing.module';
import {MatButtonModule} from '@angular/material/button';

import { SkinsPage } from './skins.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatButtonModule,
    SkinsPageRoutingModule
  ],
  declarations: [SkinsPage]
})
export class SkinsPageModule {}
