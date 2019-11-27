import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {
  public nome: any;
  public limite: any;
  constructor(private afs: AngularFirestore, private afa: AngularFireAuth, public router: Router, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private authService: AuthService) { }

  async ngOnInit() {
    const newUser = this.afa.auth.currentUser;
    const snapshopt = await this.afs.collection('Users', ref => ref.where('uid', '==', newUser.uid)).get().toPromise();
    let user = snapshopt.docs[0].data();
    console.log(user)
    this.nome = user.name;
    this.limite = user.Limite;
  }

  logout(){
    this.authService.logout();
    this.presentToast('Deslogado')
  
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }
  

}
