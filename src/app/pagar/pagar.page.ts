import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.page.html',
  styleUrls: ['./pagar.page.scss'],
})
export class PagarPage implements OnInit {
  public data: any = "abc";
  public var: any;
  public saldo: any = {
    Saldo: null
  };
  public mysaldo: any = {
    Saldo: null
  };
  constructor(private afa: AngularFireAuth,private afs: AngularFirestore, private toastCtrl: ToastController, private barcodeScanner: BarcodeScanner, private router: Router) { }

  ngOnInit() {
  }

  navByUrl(){
    this.router.navigateByUrl('/menu-principal')
  }

 async go(){
    
    await this.barcodeScanner.scan().then(barcodeData => {
      this.var = barcodeData.text.split(' ');

      // const newUser = this.afa.auth.currentUser;
      // const snapshoot = await this.afs.collection('Users', ref => ref.where('uid', '==', this.var[1])).get().toPromise();
      // let user2 = snapshoot.docs[0].data();
      // const snapshopt = await this.afs.collection('Users', ref => ref.where('uid', '==', this.var[1])).get().toPromise();
      // let user = snapshopt.docs[0].data();
      // let uid = this.var[1];
      // let valor = parseFloat(this.var[0])
      // let result = valor + user2.Saldo;
      // await this.afs.collection('Users').doc(uid).update(result);



    }).catch(err => { 
        console.log('Error', err);  
    });
    const newUser = this.afa.auth.currentUser;
    const snapshopt = await this.afs.collection('Users', ref => ref.where('uid', '==', newUser.uid)).get().toPromise();
    let user = snapshopt.docs[0].data();
    const snapshoot = await this.afs.collection('Users', ref => ref.where('uid', '==', this.var[1])).get().toPromise();
    let user2 = snapshoot.docs[0].data();
    let uid = this.var[1];
    
    this.saldo.Saldo = parseFloat(this.var[0]) + parseFloat(user2.Saldo);
    this.mysaldo.Saldo = parseFloat(user.Saldo) - parseFloat(this.var[0]);
    await this.afs.collection('Users').doc(this.var[1]).update(this.saldo);
    await this.afs.collection('Users').doc(newUser.uid).update(this.mysaldo);
    this.router.navigateByUrl('/menu-principal')
    this.presentToast('Pago!')
  }


  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  
}
