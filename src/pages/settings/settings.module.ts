import { NgModule } from '@angular/core';
import { SettingsPage } from './settings';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  
  exports: [
    SettingsPage
  ]
})
export class SettingsModule {}
