import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tiempo-carga',
  templateUrl: './tiempo-carga.page.html',
  styleUrls: ['./tiempo-carga.page.scss'],
})
export class TiempoCargaPage implements OnInit {

  juego: any;

  constructor(public api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.getRawgData(slug);
    });
  }

  getRawgData(slug: string): void {
    this.api.getGameDetails(slug)
      .subscribe(data => {
        this.juego = data;
      });
  }

  verDetalles(slug: string): void {
    this.router.navigate(['/tiempo-carga', slug]);
  }

  obtenerGeneros(genres: any[]): string {
    return genres.map(genre => genre.name).join(', ');
  }

  obtenerPlataformas(platforms: any[]): string {
    return platforms.map(platform => platform.platform.name).join(', ');
  }
}