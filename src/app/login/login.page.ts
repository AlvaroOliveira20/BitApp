import { AuthService } from './../services/auth.service';
import { User } from './../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userLogin: User = {};
  public userRegister: User = {};
  public loading: any;
  public user: any = {cpf: '', password: ''};

  
  constructor(private afs: AngularFirestore,
    private afa: AngularFireAuth,public router: Router, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private authService: AuthService) { }

  ngOnInit() {
  }
navByUrl(){
  this.router.navigateByUrl("/home")
}


async login() {
  await this.presentLoading();
  try{
    
    
    const snapshopt = await this.afs.collection('Users', ref => ref.where('cpf', '==', this.user.cpf)).get().toPromise();
    
    let usuario = (snapshopt.empty ? null : snapshopt.docs[0].data());
    console.log(usuario);
    console.log(this.user);
    if (usuario != null) {
      const usuarioLogado = await this.afa.auth.signInWithEmailAndPassword(usuario.email, this.user.password)
      if (usuarioLogado != null) {
        this.presentToast('logado com sucesso!')
      }
    }else{
      this.presentToast('CPF ou senha incorretos!')
    }
  } catch(error) {
    console.error(error);
    if (error.message == 'signInWithEmailAndPassword failed: First argument "email" must be a valid string.') {
      error.message = 'Erro, email não digitado!';
    } else if (error.message == 'signInWithEmailAndPassword failed: Second argument "password" must be a valid string.') {
      error.message = 'Erro, senha não digitada!';
    } else if (error.message == 'There is no user record corresponding to this identifier. The user may have been deleted.') {
      error.message = 'Erro, cadastro não encontrado!';
    } else if (error.message == 'The email address is badly formatted.') {
      error.message = 'Erro, email não foi digitado corretamente, verifique e tente novamente!';
    } else if (error.message == 'The password is invalid or the user does not have a password.') {
      error.message = 'CPF ou senha incorretos!';
    } else if (error.message == 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.') {
      error.message = 'Erro, não foi estabelecer uma conexão com a rede, verifique sua conexão e tente novamente!';
    }
    this.presentToast(error.message);
  }finally{
    this.loading.dismiss();
  }
}
async register() {
  await this.presentLoading();
  try{
    await this.authService.register(this.userRegister);
  } catch(error) {
    

  }finally{
    
    this.loading.dismiss();
  }
}

logout(){
  this.authService.logout();
  this.presentToast('NULL')

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
