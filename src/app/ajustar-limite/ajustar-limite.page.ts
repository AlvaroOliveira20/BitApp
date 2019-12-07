import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajustar-limite',
  templateUrl: './ajustar-limite.page.html',
  styleUrls: ['./ajustar-limite.page.scss'],
})
export class AjustarLimitePage implements OnInit {
  msg = "";
  formulario4: FormGroup;
  public loading: any;

  constructor(private loadingCtrl: LoadingController, private formBuilder: FormBuilder,private afa: AngularFireAuth, private router: Router, private afs: AngularFirestore, private toastCtrl: ToastController, private authService: AuthService) { }

  ngOnInit() {
    this.formulario4 = this.formBuilder.group({
        Limite: ['', [Validators.required, Validators.maxLength(15)]],
     });
  }

 

  async go(){
    await this.presentLoading();
    if (this.formulario4.valid){
      let dados = this.formulario4.value;
      const newUser = this.afa.auth.currentUser;
      await this.afs.collection('Users').doc(newUser.uid).update(dados);
      this.presentToast('Limite atualizado!')
      this.router.navigateByUrl('/menu-principal')
      this.loading.dismiss();
    }else{
      this.loading.dismiss();
      this.presentToast('Ocorreu um erro!')
    }
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

}
