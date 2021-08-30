import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit, OnDestroy {
  public randomnumber: Array<object> = [];
  public lastexecutedtime = 0;
  public servicecallcount = 0;
  public allSubscriptions: Subscription[] = [];

  constructor(
    private myservice: DataService,
    private metaservive: MetaService
  ) {}

  ngOnInit() {
    this.metaservive.setmeta({});
    const sub = this.myservice.getrandomnumber().subscribe((rand: number) => {
      const lastexecutedtime: number = Date.now();
      this.randomnumber.push({
        randnumber: rand,
        serviceid: this.servicecallcount,
        lastexecutedtime,
        executiongap: lastexecutedtime - this.lastexecutedtime
      });
      this.lastexecutedtime = lastexecutedtime;
      console.log(`[Unsubscribe] Received random number ${rand}`);
    });
    this.servicecallcount = this.myservice.getservicecallcount();

    this.allSubscriptions.push(sub);
  }

  ngOnDestroy() {
    this.allSubscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    console.log('[Unsubscribe] Component destroyed');
  }
}
