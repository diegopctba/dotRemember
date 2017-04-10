import { Component } from '@angular/core';

//import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
//import { HomePage } from '../home/home';
import { RememberPage } from '../remember/remember';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = RememberPage;

  //tab1Root = HomePage;
 // tab2Root = AboutPage;
  //tab2Root = RememberPage;

  constructor() {

  }
}
