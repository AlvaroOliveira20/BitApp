import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';

import { CadastroPage } from './cadastro.page';

import { BrMaskerModule } from 'br-mask';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: CadastroPage
  }
];

@NgModule({
  imports: [
    BrMaskerModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule

  ],
  declarations: [CadastroPage]
})
export class CadastroPageModule {}
