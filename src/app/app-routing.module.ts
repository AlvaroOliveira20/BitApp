import { DataGuard } from './guards/data-guard.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BrMaskerModule } from 'br-mask';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [LoginGuard] },
  { path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroPageModule', canActivate: [LoginGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [LoginGuard] },
  { path: 'menu-principal', loadChildren: './menu-principal/menu-principal.module#MenuPrincipalPageModule', canActivate: [AuthGuard, DataGuard] },
  { path: 'termos', loadChildren: './termos/termos.module#TermosPageModule', canActivate: [LoginGuard]},
  { path: 'cartao', loadChildren: './cartao/cartao.module#CartaoPageModule',canActivate: [AuthGuard] },
  { path: 'ajustar-limite', loadChildren: './ajustar-limite/ajustar-limite.module#AjustarLimitePageModule' },
  { path: 'cobrar', loadChildren: './cobrar/cobrar.module#CobrarPageModule' },
  { path: 'transferir', loadChildren: './transferir/transferir.module#TransferirPageModule' },
  { path: 'bloqueio', loadChildren: './bloqueio/bloqueio.module#BloqueioPageModule' },
  { path: 'pagar', loadChildren: './pagar/pagar.module#PagarPageModule' },
  { path: 'convidar', loadChildren: './convidar/convidar.module#ConvidarPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }), BrMaskerModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
