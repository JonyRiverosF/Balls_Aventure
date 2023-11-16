import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-usocamara',
  templateUrl: './usocamara.page.html',
  styleUrls: ['./usocamara.page.scss'],
})
export class UsocamaraPage implements OnInit {
  juegos: any[] = [];

  constructor(public api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  obtenerListaDeJuegos(): void {
    this.api.getListaDeJuegos().subscribe((data) => {
      this.juegos = data.results;
    });
  }

  verDetalles(slug: string): void {
    this.router.navigate(['/tiempo-carga', slug]);
  }
}