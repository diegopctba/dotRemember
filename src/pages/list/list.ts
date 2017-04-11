import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Notification } from '../../app/components/notification';

@Component({
  selector: 'list-notifications',
  templateUrl: 'list.html'
})
export class ListPage {

  notifications: Array<Notification>;
  arrayNotifs: Array<Notification>;

  constructor(public navCtrl: NavController, private localNotifications: LocalNotifications) {
    this.listNotifications();
  }

  listNotifications() {
    var thereis = this.localNotifications.getAll() != null;
    let array = new Array<Notification>();
    console.log('instanciando nots');
    this.localNotifications.getAll().then(function (resolveNotifs) {
      console.log('promisse sucess ' + resolveNotifs);
      if (resolveNotifs.length > 0) {
        console.log('tem notificacao');
        for (var index = 0; index < resolveNotifs.length; index++) {
          console.log('notificacao '+index);
          var notif = resolveNotifs[index];
          array.push(new Notification(notif.id, notif.text, notif.at));
          console.log('adicionado nots');
        }
        
      }
      //Promise.resolve(nots);
     // nots => this.nots = nots;
      //nots => this.showNotification(nots);
      array => this.arrayNotifs = array;

    }, function (rejectNotifs) {
      console.log('reject ' + rejectNotifs);
    });
    if (this.arrayNotifs != null) {
      this.showNotification();
    }
    console.log('there is notifications? ' + thereis);
  }


 showNotification() {
   console.log('showNotification');
    if (this.arrayNotifs.length > 0) {
      this.notifications = new Array<Notification>();
      for (var index = 0; index < this.arrayNotifs.length; index++) {
        this.notifications.push(this.arrayNotifs[index]);
      }
      console.log('notifications atualizado');
    }
  }
}
