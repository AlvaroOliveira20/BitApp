import { Data } from './../interfaces/data';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgModule } from '@angular/core';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { User } from './../interfaces/user';
import { AuthService } from './../services/auth.service';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  msg = "";
  formulario: FormGroup;
  msg2 = "";
  formulario2: FormGroup;

  public loading: any;
  public check: any = {
    box: null
  };


  constructor(private afs: AngularFirestore,
    private afa: AngularFireAuth,
    public router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController) { }
    

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      cpf: ['', [Validators.required, , Validators.maxLength(14)]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.maxLength(15)]],
     });
     this.formulario2 = this.formBuilder.group({
      checkbox: [false, Validators.requiredTrue],
      checkbox2: [false, Validators.requiredTrue]
     });

  }
  navByUrl() {
    this.router.navigateByUrl('/home');
  }
async teste(){
  this.formulario.get('cpf').valid ? console.log("cpf ok") : this.presentToast('CPF não digitado!')
  this.formulario.get('name').valid ? console.log("name ok") : this.presentToast('Nome não digitado!')
  this.formulario.get('password').valid ? console.log("password ok") : this.presentToast('Senha não digitada!')
  this.formulario.get('email').valid ? console.log("email ok") : this.presentToast('E-mail não digitado!')
  

  


  if (this.formulario.valid) {
    
    let email = this.formulario.get('email').value;
    let password = this.formulario.get('password').value;
    let dados = this.formulario.value;

    console.log("ok")
    await this.presentLoading();
      try {
        const newUser = await this.afa.auth.createUserWithEmailAndPassword(email, password)

        await this.afs.collection('Users').doc(newUser.user.uid).set(dados);

        
        this.router.navigateByUrl("/menu-principal");

        this.presentToast('Cadastrado com sucesso!')

      } catch (error) {
        console.error(error);
        this.presentToast(error.message);
      } finally {
        this.loading.dismiss();
      }
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

  navToTermos() {
    this.router.navigateByUrl("/termos")
  }

}
