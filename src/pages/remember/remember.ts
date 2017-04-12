import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: "remember-page",
  templateUrl: 'remember.html',
})
export class RememberPage {


  notificationId: number = 8708709870;
  countHr: number = 1;
  countMin: number = 1;
  time: string;
  text: string;
  showCancelButton: boolean = false;
  showRangeMinutes: boolean = true;
  rememberLabel: string;


  constructor(public alertCtrl: AlertController,
      public navCtrl: NavController,
     private localNotifications: LocalNotifications) {
       this.text = window.localStorage.getItem('mensagem');
       this.time = window.localStorage.getItem('tempo');
       this.showRangeMinutes = (window.localStorage.getItem('minutes') == 'minutes');
       this.rememberLabel = this.time;
       if (this.showRangeMinutes) {
         this.countMin = parseInt(this.time);
         this.rememberLabel += ' minuto(s).'
       } else {
         this.countHr = parseInt(this.time);
         this.rememberLabel += ' hora(s).'
       }
       this.evaluateNotification();
  }

    showNotification() {
    //    var timenow = new Date();
 
      let alert = this.alertCtrl.create({
        title: 'Lembrete',
        subTitle: 'Deseja acionar o lembrete?',
        buttons: [{
          text: 'Cancelar',
          role: "cancel",
          handler: () => {
            console.log('remember set has been canceled');
          }
        },{
          text: 'OK',
          role: "destructive",
          handler: () => {
            this.setNotification();
            this.showCancelButton = true;
            console.log('notification has been launch');
          }
        }]
      });
      alert.present();
    


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
      text: this.text,
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
        text: 'Cancelar',
        role: "cancel",
        handler: () => {
          console.log('cancel remember set has been canceled');
        }
      },{
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
      }]
    });
    alert.present();
  }

  private evaluateNotification() {
    //var notif = this.localNotifications.getScheduled(this.notificationId);
    this.showCancelButton = false;//(notif !== null);
  }
}
