import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {
  constructor(public router: Router, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private authService: AuthService) { }

  ngOnInit() {
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
