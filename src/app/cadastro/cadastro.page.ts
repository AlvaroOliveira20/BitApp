import { Data } from './../interfaces/data';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgModule } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from './../interfaces/user';
import { AuthService } from './../services/auth.service';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  public userRegister: Data = {};
  public loading: any;
  public user: any = {};
  public var: any = {};

  constructor(private afs: AngularFirestore,
    private afa: AngularFireAuth,
    public router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService) {  }

  ngOnInit() {
  }
  navByUrl(){
    this.router.navigateByUrl('/home');
  }

  async register() {
    await this.presentLoading();
    try{
      if (this.user.name == null){
        this.presentToast('Erro, Campo "Nome completo" não pode ser nulo!')
        this.user.cpf = null;
        this.user.name = null;

      }else if (this.user.cpf == null){
        this.presentToast('Erro, Campo "CPF" não pode ser nulo!')
        this.user.cpf = null;
        this.user.name = null;
        
      }else if (this.user.name != null && this.user.cpf != null){
        const newUser = await this.afa.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
      
        await this.afs.collection('Users').doc(newUser.user.uid).set(this.user);

        this.presentToast('Cadastrado com sucesso!')
      }
      
    } catch(error) {
      console.error(error);
      if (error.message == 'createUserWithEmailAndPassword failed: First argument "email" must be a valid string.') {
        error.message = 'Erro, email não digitado!';
      } else if (error.message == 'createUserWithEmailAndPassword failed: Second argument "password" must be a valid string.') {
        error.message = 'Erro, senha não digitada!';
      } else if (error.message == 'There is no user record corresponding to this identifier. The user may have been deleted.') {
        error.message = 'Erro, cadastro não encontrado!';
      } else if (error.message == 'The email address is badly formatted.') {
        error.message = 'Erro, email não foi digitado corretamente, verifique e tente novamente!';
      } else if (error.message == 'The password is invalid or the user does not have a password.') {
        error.message = 'CPF ou senha incorretos!';
      } else if (error.message == 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.') {
        error.message = 'Erro, não foi estabelecer uma conexão com a rede, verifique sua conexão e tente novamente!';
      }if (error.message != 'createUserWithEmailAndPassword failed: First argument "email" must be a valid string.' && error.message != 'createUserWithEmailAndPassword failed: Second argument "password" must be a valid string.' && error.message != 'There is no user record corresponding to this identifier. The user may have been deleted.' && error.message != 'The email address is badly formatted.' && error.message != 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.') {
        error.message = 'Erro desconhecido, consulte o log de erros!';
      }
      this.presentToast(error.message);
    }finally{
      this.loading.dismiss();
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

  navToTermos(){
    this.router.navigateByUrl("/termos")
  }
  
}
 