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
  { path: 'menu-principal', loadChildren: './menu-principal/menu-principal.module#MenuPrincipalPageModule', canActivate: [AuthGuard] },
  { path: 'termos', loadChildren: './termos/termos.module#TermosPageModule', canActivate: [LoginGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }), BrMaskerModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
