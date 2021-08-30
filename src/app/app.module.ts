import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LeakComponent } from './components/leak/leak.component';
import { AppRoutingModule } from './app-routing.module';
import { UnsubscribeComponent } from './components/unsubscribe/unsubscribe.component';
import { TakeUntilComponent } from './components/take-until/take-until.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  declarations: [
    AppComponent,

    NavbarComponent,

    HomeComponent,
    LeakComponent,
    UnsubscribeComponent,
    TakeUntilComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
