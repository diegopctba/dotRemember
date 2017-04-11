import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Notification } from '../../app/components/notification';

@Component({
  selector: 'list-home',
  templateUrl: 'list.html'
})
export class ListPage {

  notifications: Notification[];

  constructor(public navCtrl: NavController, private localNotifications: LocalNotifications) {
    this.listNotifications();
  }

  listNotifications() {
    //this.notifications = this.localNotifications.getAll();
    var thereis = this.localNotifications.getAll() != null;
    this.localNotifications.getAll().then(function (notification){
      console.log('sucess '+notification);
      if (notification.length > 0) {
        this.notifications = [];
        for (var index = 0; index < notification.length; index++) {
          var notif = notification[index];
          this.notifications[index] = new Notification(notif.id, notif.text, notif.at.toString());
        }
      }
      //this.notifications = notification;
    }, function (notificacao) {
      console.log('reject '+notificacao);
    });

    console.log('there is notifications? '+ thereis );
  }
}
