import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.page.html',
  styleUrls: ['./transferir.page.scss'],
})
export class TransferirPage implements OnInit {
  msg = "";
  formulario6: FormGroup;
  msg2 = "";
  formulario7: FormGroup;
  public loading: any;

  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController, private formBuilder: FormBuilder, private router: Router, private afa: AngularFireAuth, private afs: AngularFirestore) { }

  ngOnInit() {
    this.formulario6 = this.formBuilder.group({
      Valor: [null, [Validators.required]],
     });
     this.formulario7 = this.formBuilder.group({
      Conta: [null, [Validators.required]],
     });
  }

  async go(){
    const newUser = this.afa.auth.currentUser;
    const snapshopt = await this.afs.collection('Users', ref => ref.where('uid', '==', newUser.uid)).get().toPromise();
    let user = snapshopt.docs[0].data();
    await this.presentLoading();
    let aux = this.formulario6.get('Valor').value
    if(aux == 0){
      this.loading.dismiss();
      this.presentToast('Erro, não é possivel transferir R$0!')
    }
    if (this.formulario6.valid && this.formulario7.valid && aux != 0){
      let dados = this.formulario6.value;
      console.log(user.Saldo);
      if(user.Saldo - dados.Valor >= 0){
        dados.Saldo = Number(user.Saldo) - Number(dados.Valor);
        await this.afs.collection('Users').doc(newUser.uid).update(dados);
        this.presentToast('Transferido!');
        this.router.navigateByUrl('/menu-principal');
        this.loading.dismiss();
      }else{
        this.presentToast('Saldo insuficiente!')
        this.loading.dismiss();
      }
    }
    if(this.formulario6.invalid){
      this.loading.dismiss();
      this.presentToast('Erro, valor não pode ser nulo!')
    }
    if(this.formulario7.invalid){
      this.loading.dismiss();
      this.presentToast('Erro, conta não pode ser nulo!')
    }
    
  }

  navByUrl(){
    this.router.navigateByUrl('/menu-principal')
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
