import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the Settings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  showRangeMinutes: boolean = true;
  showCancelButton: boolean = false;
  countHr: number = 1;
  countMin: number = 1;
  count: number;
  time: string;
  text: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, ) {
    this.time = this.getValue('tempo');
    this.text = this.getValue('mensagem');
    var type = this.getValue('minutes');
    if (type !== null && type !== 'null') {
      if (type === 'minutes') {
        this.countMin = parseInt(this.time);
        //this.showRangeMinutes = true;
        this.minutesSelected();
      } else {
        this.countHr = parseInt(this.time);
        //this.showRangeMinutes = false;
        this.hoursSelected();
      }
    }
    if (this.text === null || this.text === 'null') {
      this.text = 'Hey! Não esqueça do seu compromisso...';
    }
  }

  updateValue() {
    this.setValue('mensagem', this.text);
    var typemin;
    if (this.showRangeMinutes) {
      typemin = 'minutes';
      this.setValue('tempo', this.countMin);
    } else {
      typemin = 'hours';
      this.setValue('tempo', this.countHr);
    }
    this.setValue('minutes', typemin);
    console.log('settings updated');
    console.log('tempo = ' + this.time);
    console.log('mensagem = ' + this.text);
  }

  private setValue(field, value) {
    window.localStorage.setItem(field, value);
  }

  private getValue(field) {
    return window.localStorage.getItem(field);
  }



  minutesSelected() {
    this.showRangeMinutes = true;
  };

  hoursSelected() {
    this.showRangeMinutes = false;
  };

  validate() {
    if ((this.countMin < 1 && this.countHr < 1) || (this.time !== 'mins' && this.time !== 'hrs')) {
      let alert = this.alertCtrl.create({
        title: 'Lembrete',
        subTitle: 'Preencha um valor válido',
        buttons: ['OK']
      });
      alert.present();

    }
  }

}
