import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeakComponent } from './components/leak/leak.component';
import { UnsubscribeComponent } from './components/unsubscribe/unsubscribe.component';
import { TakeUntilComponent } from './components/take-until/take-until.component';
import { HomeComponent } from './components/home/home.component';
import { AutoUnsubscribeDemoComponent } from './components/auto-unsubscribe-demo/auto-unsubscribe-demo.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'leak', component: LeakComponent },
  { path: 'unsubscribe', component: UnsubscribeComponent },
  { path: 'take-until', component: TakeUntilComponent },
  { path: 'auto-unsubscribe', component: AutoUnsubscribeDemoComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
