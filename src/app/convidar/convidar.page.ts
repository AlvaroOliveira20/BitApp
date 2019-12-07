import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ToastController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-convidar',
  templateUrl: './convidar.page.html',
  styleUrls: ['./convidar.page.scss'],
})
export class ConvidarPage implements OnInit {
  msg = "";
  formulario8: FormGroup;
  public loading: any;


  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController, private formBuilder: FormBuilder, private router: Router, private afa: AngularFireAuth, private afs: AngularFirestore) { }

  ngOnInit() {
    this.formulario8 = this.formBuilder.group({
      email: [null, [Validators.required]]
     });
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      spinner: null,
      message: '<ion-img src="/assets/CesmacLoad.gif"></ion-img>',
      cssClass: 'CustomLoad',
    });

    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  navByUrl(){
    this.router.navigateByUrl('/menu-principal')
  }
  async go(){
    await this.presentLoading();
    if(this.formulario8.valid){
      this.presentToast('Convidado!')
      this.router.navigateByUrl('/menu-principal')
      this.loading.dismiss();
    }else{
      this.loading.dismiss();
      this.presentToast('Erro, digite um e-mail!')
    }
  }


}
