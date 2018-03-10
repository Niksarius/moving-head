import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MovingHeadComponent } from './moving-head/moving-head.component';


@NgModule({
  declarations: [
    MovingHeadComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [MovingHeadComponent]
})
export class AppModule { }
