import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-cartao',
  templateUrl: './cartao.page.html',
  styleUrls: ['./cartao.page.scss'],
})
export class CartaoPage implements OnInit {
  msg = "";
  formulario3: FormGroup;

  public loading: any;
  

  constructor(private loadingCtrl: LoadingController, private formBuilder: FormBuilder,private afa: AngularFireAuth, private router: Router, private afs: AngularFirestore, private toastCtrl: ToastController, private authService: AuthService) { }

  ngOnInit() {
    this.formulario3 = this.formBuilder.group({
      Data_Vencimento: ['', [Validators.required, , Validators.maxLength(2)]],
      Senha_Cartao: ['', [Validators.required, Validators.maxLength(4)]],
      Cep: ['', [Validators.required, Validators.maxLength(9)]],
      Rua: ['', [Validators.required, Validators.maxLength(15)]],
      Complemento: ['', [Validators.required, Validators.maxLength(30)]],
      Numero: ['', [Validators.required, Validators.maxLength(15)]],
      Bairro: ['', [Validators.required, Validators.maxLength(20)]],
      Cidade: ['', [Validators.required, Validators.maxLength(15)]],
      Estado: ['', [Validators.required, Validators.maxLength(2)]],
      Nacionalidade: ['', [Validators.required, Validators.maxLength(20)]],
      Data_Nascimento: ['', [Validators.required, Validators.maxLength(11)]],
      Estado_Civil: ['', [Validators.required, Validators.maxLength(10)]],
      Telefone: ['', [Validators.required, Validators.maxLength(14)]],
      Registro_Geral: ['', [Validators.required, Validators.maxLength(15)]],
      Orgao_Expedidor: ['', [Validators.required, Validators.maxLength(10)]],
      Estado_De_Emissao: ['', [Validators.required, Validators.maxLength(2)]],
      Rendimento_Mensal: ['', [Validators.required, Validators.maxLength(15)]],
      Limite: ['', [Validators.required, Validators.maxLength(15)]],
     });
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl("/login");
    this.presentToast('Deslogado')
  
  }

  async go(){
    await this.presentLoading();
    if (this.formulario3.valid){
      let dados = this.formulario3.value;
      const newUser = this.afa.auth.currentUser;
      await this.afs.collection('Users').doc(newUser.uid).update(dados);
      this.presentToast('Cadastro completo!')
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
