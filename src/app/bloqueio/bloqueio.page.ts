import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bloqueio',
  templateUrl: './bloqueio.page.html',
  styleUrls: ['./bloqueio.page.scss'],
})
export class BloqueioPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navByUrl(){
    this.router.navigateByUrl('/menu-principal')
  }
}
