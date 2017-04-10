import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'list-home',
  templateUrl: 'list.html'
})
export class ListPage {

  notifications: string[];

  constructor(public navCtrl: NavController, private localNotifications: LocalNotifications) {
    this.listNotifications();
  }

  listNotifications() {
    //this.notifications = this.localNotifications.getAll();
    var thereis = this.notifications != null;
    this.localNotifications.getAll().then(function (notification){
      console.log('sucess '+notification);
      if (notification.length > 0) {
        //this.notifications = new String[notification.length];
        for (var index = 0; index < notification.length; index++) {
          var data = new Date(notification[index].at);
          var str  = '#'+notification[index].id;
          str += ' '+data.toString();
          this.notifications[index] = str;
        }
        var dat = new Date(notification[0].at);
        console.log(dat.getHours()+":"+dat.getMinutes());
      }
      //this.notifications = notification;
    }, function (notificacao) {
      console.log('reject '+notificacao);
    });

    console.log('there is notifications? '+ thereis );
  }
}
