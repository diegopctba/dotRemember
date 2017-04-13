import { Component } from '@angular/core';
import { NavController,AlertController, App } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SettingsPage } from '../settings/settings';

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
              //public viewCtrl: ViewController,
              public navCtrl: NavController,
              private localNotifications: LocalNotifications,
              public appCtrl: App) {
                //this.main();
  }
  
   ionViewWillEnter() {
     //Runs when the page is about to enter and become the active page.
     this.main();
   }

    private main() {
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
      icon: 'file://assets/icon/reminder48.png',
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
    if (this.time === null || this.time === 'null') {
      let alert = this.alertCtrl.create({
        title: 'Configuração',
        subTitle: 'Antes de ativar, você pode confirmar ou alterar os detalhes de notificação em "Menu" > "Configuração"',
        buttons: [{
          text: 'OK',
          role: 'destructive',
          handler: () => {
            this.appCtrl.getActiveNav().canGoBack();
            this.appCtrl.getRootNav().push(SettingsPage);
          }
        }]

      });
    alert.present();
    }
  }

}
