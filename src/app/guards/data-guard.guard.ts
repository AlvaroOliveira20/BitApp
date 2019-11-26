import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { promise } from 'protractor';
import { AuthService } from './../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})

export class DataGuard implements CanActivate {
  constructor (private afs: AngularFirestore,
    private afa: AngularFireAuth,private router: Router, ){}
  
    async canActivate(): Promise<boolean> {
        const user = this.afa.auth.currentUser;
        
        if (user == null) {
            this.router.navigateByUrl('/login')
            return false;
        }
    
        const usuario = (await this.afs.firestore.collection('Users').doc(user.uid).get()).data();
        if (usuario.Telefone != null){
          return true;
        }

        this.router.navigateByUrl('/cartao')
        return false;
    
    // return new Promise(resolve => {
    
  }
  
}