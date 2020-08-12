import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {WinWheelLibraryModule} from '@shubhrank/win-wheel-library';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, WinWheelLibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
