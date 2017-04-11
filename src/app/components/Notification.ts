import { Component } from '@angular/core';
@Component({
  selector: 'my-notif',
  template: `
    <td>{{id}}</td>
    <td>{{string}}</td>
    <td>{{date}}</td>
    `
})
export class Notification {

  constructor(public id: number, public text: string, public date: string) {

  }
}