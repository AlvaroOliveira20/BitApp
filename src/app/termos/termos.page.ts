import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-termos',
  templateUrl: './termos.page.html',
  styleUrls: ['./termos.page.scss'],
})
export class TermosPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  navByUrl(){
    this.router.navigateByUrl("/cadastro")
  }
}
