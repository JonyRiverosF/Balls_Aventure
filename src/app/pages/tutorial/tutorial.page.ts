import { Component, OnInit } from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {
  
  constructor(private router:Router,public alertController :AlertController) { }


  ngOnInit() {
  }
  public alertButtons = [
     
    {header:"¿Volver al lobby?",
      text: 'REANUDAR',
      cssClass: 'alert-button-cancel',
      
    },
    {
      text: 'LOBBY',
      cssClass: 'alert-button-confirm',
      
     
      
    },
    
    
    
  ];

  async mostrarmenu() {
    const alert = await this.alertController.create({
      header: '¿Volver al lobby?',
      buttons: [
        {
          text: 'REANUDAR',
          cssClass: 'reanudar',
        },
        {
          text: 'LOBBY',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.router.navigate(['/lobby']);  
          },
        },
      ],
    });

    await alert.present();
  }

 
}

 
 

