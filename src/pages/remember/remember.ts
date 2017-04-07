import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: "remember-page",
  templateUrl: 'remember.html',
})
export class RememberPage {

  showRangeMinutes: boolean = true;
  showCancelButton: boolean = false;
  notificationId: number = 8708709870;
  countHr: number = 1;
  countMin: number = 1;
  time: string;

  constructor(public alertCtrl: AlertController, private localNotifications: LocalNotifications) {
  }

  showNotification() {
    //    var timenow = new Date();
    if ((this.countMin < 1 && this.countHr < 1)|| (this.time !== 'mins' && this.time !== 'hrs')) {
      let alert  = this.alertCtrl.create({
          title:'Lembrete',
          subTitle:'Preencha um valor válido',
          buttons: ['OK']
      });
     alert.present();

    } else {
      let alert = this.alertCtrl.create({
        title: 'Lembrete',
        subTitle: 'Deseja acionar o lembrete?',
        buttons: [{
          text: 'OK',
          role: "destructive",
          handler: () => {
            this.setNotification();
            this.showCancelButton = true;
            console.log('notification has been launch');
          }
        }, {
          text: 'Cancelar',
          role: "cancel",
          handler: () => {
            console.log('remember set has been canceled');
          }
        }]
      });
      alert.present();
    }


  }

  private setNotification() {
    var count;
    if (this.showRangeMinutes) {
      count = this.countMin*60;
    } else {
      count = this.countHr*3600;
    }
    var dateAt = new Date(new Date().getTime() + (count * 1000));
    this.localNotifications.schedule({
      id: this.notificationId,
      text: 'Hey! Não esqueça do seu compromisso!!!',
      //3600000 is one hour
      led: '00ff00',
      at: dateAt,
      ongoing: false,
      icon: 'assets/icon/favicon.ico',
      data: { showCancelButton: false }
    });
    console.log("Lembrete agendado às "+dateAt.getHours() + ":" + dateAt.getMinutes());

  }

  cancelNotification() {
    let alert = this.alertCtrl.create({
      title: 'Lembrete',
      subTitle: 'Deseja cancelar o lembrete?',
      buttons: [{
        text: 'OK',
        role: "destructive",
        handler: () => {
          if (this.localNotifications.getScheduled(this.notificationId) != null) {
            this.localNotifications.cancel(this.notificationId);
            this.showCancelButton = false;
            console.log('cancel notification has been launch');
          } else {
            console.log('there is no notification to be canceled');
          }
        }
      }, {
        text: 'Cancelar',
        role: "cancel",
        handler: () => {
          console.log('cancel remember set has been canceled');
        }
      }]
    });
    alert.present();
  }

    minutesSelected() {
      this.showRangeMinutes = true;
    };

    hoursSelected() {
      this.showRangeMinutes = false;
    };
}
