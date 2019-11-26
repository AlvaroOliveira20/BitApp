import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CartaoPage } from './cartao.page';

import { BrMaskerModule } from 'br-mask';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CartaoPage
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
  declarations: [CartaoPage]
})
export class CartaoPageModule {}
