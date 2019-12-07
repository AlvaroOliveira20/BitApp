import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {
  public nome: any;
  public limite: any;
  public saldo: any;
  constructor(public alertController: AlertController, private navCtrl: NavController, private afs: AngularFirestore, private afa: AngularFireAuth, public router: Router, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private authService: AuthService) { 
  }

  async ionViewWillEnter(){
    const newUser = this.afa.auth.currentUser;
    const snapshopt = await this.afs.collection('Users', ref => ref.where('uid', '==', newUser.uid)).get().toPromise();
    let user = snapshopt.docs[0].data();
    this.nome = user.name.split(' ');
    this.nome = this.nome[0];
    this.limite = user.Limite;
    this.saldo = user.Saldo;
    this.saldo = this.saldo.toFixed(2); 
  }

  
  async ngOnInit() {
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Tem certeza que deseja voltar para a tela de login?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: cancelado');
          }
        }, {
          text: 'Sair',
          handler: () => {
            this.authService.logout();
            this.presentToast('Deslogado')
          }
        }
      ]
    });

    await alert.present();
  }

  logout(){
    //this.authService.logout();
    //this.presentToast('Deslogado')
    this.presentAlertConfirm();
  
  }
  navToAjust(){
    this.router.navigateByUrl("/ajustar-limite")
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }
  

}
