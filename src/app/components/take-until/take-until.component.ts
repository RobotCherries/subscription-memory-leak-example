import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-take-until',
  templateUrl: './take-until.component.html',
  styleUrls: ['./take-until.component.css']
})
export class TakeUntilComponent implements OnInit {
  public randomnumber: Array<object> = [];
  public lastexecutedtime = 0;
  public servicecallcount = 0;
  public destroy$: Subject<boolean> = new Subject();

  constructor(
    private myservice: DataService,
    private metaservive: MetaService
  ) {}

  ngOnInit() {
    this.metaservive.setmeta({});
    this.myservice
      .getrandomnumber()
      .pipe(takeUntil(this.destroy$))
      .subscribe((rand: number) => {
        const lastexecutedtime: number = Date.now();
        this.randomnumber.push({
          randnumber: rand,
          serviceid: this.servicecallcount,
          lastexecutedtime,
          executiongap: lastexecutedtime - this.lastexecutedtime
        });
        this.lastexecutedtime = lastexecutedtime;
        console.log(`[Take Until] Received random number ${rand}`);
      });
    this.servicecallcount = this.myservice.getservicecallcount();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
    console.log('[Take Until] Component destroyed');
  }
}
