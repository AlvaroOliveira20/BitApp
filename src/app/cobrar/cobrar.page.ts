import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-cobrar',
  templateUrl: './cobrar.page.html',
  styleUrls: ['./cobrar.page.scss'],
})
export class CobrarPage implements OnInit {
  msg = "";
  formulario5: FormGroup;

  constructor(private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private formBuilder: FormBuilder, private router: Router, private afa: AngularFireAuth, private afs: AngularFirestore) { }
  public loading: any;
  public aux: any={
    var2: 10
  };
  public value: any = {
    valor: ''
  }
  async ionViewWillEnter(){
    this.formulario5.controls['Valor'].setValue(null);

  }

  ngOnInit() {
    this.formulario5 = this.formBuilder.group({
      Valor: ['', [Validators.required, , Validators.maxLength(10)]]
     });
  }
  
  async go(){
    const newUser = this.afa.auth.currentUser;
    const snapshopt = await this.afs.collection('Users', ref => ref.where('uid', '==', newUser.uid)).get().toPromise();
    let user = snapshopt.docs[0].data();
    await this.presentLoading();
    if (this.formulario5.valid){
      let dados = this.formulario5.value;
      console.log(user.Saldo)
      dados.Valor = Number(dados.Valor) + Number(user.Saldo)
      dados.Valor - dados.Valor.toFixed(2); 
      await this.afs.collection('Users').doc(newUser.uid).update(dados);
      this.presentToast('Recebido!')
      this.router.navigateByUrl('/menu-principal')
      this.loading.dismiss();
    }else{
      this.loading.dismiss();
      this.presentToast('Ocorreu um erro!')
    }
  }

  
  encodedText() {
    let dados = this.formulario5.value;
    const newUser = this.afa.auth.currentUser;
    let val = dados.Valor.toString();
    let uid = newUser.uid.toString();
    let result = val + ' ' + uid;
    console.log(result);
    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, result)
      .then(
        encodedData => {
          console.log(encodedData);
          dados.valor = encodedData;
        },
        err => {
          console.log("Error occured : " + err);
        }
      );
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
