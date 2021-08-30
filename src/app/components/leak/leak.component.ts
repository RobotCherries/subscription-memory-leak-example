import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-leak',
  templateUrl: './leak.component.html',
  styleUrls: ['./leak.component.css']
})
export class LeakComponent implements OnInit, OnDestroy {
  public randomnumber: Array<object> = [];
  public lastexecutedtime = 0;
  public servicecallcount = 0;

  constructor(
    private myservice: DataService,
    private metaservive: MetaService
  ) {}

  ngOnInit() {
    this.metaservive.setmeta({});
    this.myservice.getrandomnumber().subscribe((rand: number) => {
      const lastexecutedtime: number = Date.now();
      this.randomnumber.push({
        randnumber: rand,
        serviceid: this.servicecallcount,
        lastexecutedtime,
        executiongap: lastexecutedtime - this.lastexecutedtime
      });
      this.lastexecutedtime = lastexecutedtime;
      console.log(`[Leak] Received random number ${rand}`);
    });
    this.servicecallcount = this.myservice.getservicecallcount();
  }

  ngOnDestroy() {
    console.log('[Leak] Component destroyed');
  }
}
