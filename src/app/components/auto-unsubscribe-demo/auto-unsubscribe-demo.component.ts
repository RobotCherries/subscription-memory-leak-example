import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { MetaService } from '../../services/meta.service';
import { AutoUnsubscribe } from '../../utils/auto-unsubscribe';

@Component({
  selector: 'app-auto-unsubscribe-demo',
  templateUrl: './auto-unsubscribe-demo.component.html',
  styleUrls: ['./auto-unsubscribe-demo.component.css']
})
export class AutoUnsubscribeDemoComponent implements OnInit, OnDestroy {
  public randomnumber: Array<object> = [];
  public lastexecutedtime = 0;
  public servicecallcount = 0;

  @AutoUnsubscribe
  public allSubscriptions: Subscription;

  constructor(
    private myservice: DataService,
    private metaservive: MetaService
  ) {}

  ngOnInit() {
    this.metaservive.setmeta({});
    this.allSubscriptions = this.myservice
      .getrandomnumber()
      .subscribe((rand: number) => {
        const lastexecutedtime: number = Date.now();
        this.randomnumber.push({
          randnumber: rand,
          serviceid: this.servicecallcount,
          lastexecutedtime,
          executiongap: lastexecutedtime - this.lastexecutedtime
        });
        this.lastexecutedtime = lastexecutedtime;
        console.log(`[Auto Unsubscribe] Received random number ${rand}`);
      });
    this.servicecallcount = this.myservice.getservicecallcount();
  }

  ngOnDestroy() {
    console.log('[Auto Unsubscribe] Component destroyed');
  }
}
