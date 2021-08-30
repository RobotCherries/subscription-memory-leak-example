import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private randomnumber: Observable<number>;
  public rval: Observable<number>;
  public rval1: Observable<number>;
  private servicecallcount = 0;

  constructor() {}
  getrandomnumber() {
    this.servicecallcount++;
    if (!this.randomnumber) {
      this.randomnumber = new Observable((subject: Observer<number>) => {
        setInterval(() => {
          const randnumber =
            (Math.floor(Math.random() * 10) - 1) *
            (Math.floor(Math.random() * 30) + 1);
          subject.next(randnumber);
        }, 1000);
      });
    }
    return this.randomnumber;
  }
  getrval() {
    if (!this.randomnumber) {
      this.rval = new Observable((subject: Observer<number>) => {
        setInterval(() => {
          const randnumber =
            (Math.floor(Math.random() * 10) - 1) *
            (Math.floor(Math.random() * 30) + 1);
          const randnumber2 =
            (Math.floor(Math.random() * 10) - 1) *
            (Math.floor(Math.random() * 30) + 1);
          subject.next(randnumber2);
        }, 1000);
      });
    }
    return this.rval;
  }

  getrval1() {
    if (!this.randomnumber) {
      this.rval1 = new Observable((subject: Observer<any>) => {
        setInterval(() => {
          const randnumber = { r1: this.getrand(), r2: this.getrand() };
          const randnumber2 = { r1: this.getrand(), r2: this.getrand() };
          const randnumber3 = { r1: this.getrand(), r2: this.getrand() };
          const randnumber4 = { r1: this.getrand(), r2: this.getrand() };
          subject.next([randnumber3, randnumber4, randnumber, randnumber2]);
        }, 1000);
      });
    }
    return this.rval1;
  }
  getrand() {
    return (
      (Math.floor(Math.random() * 10) - 1) *
      (Math.floor(Math.random() * 30) + 1)
    );
  }

  getrandomnumberpromise() {
    let cn = 0;
    cn =
      (Math.floor(Math.random() * 10) - 1) *
      (Math.floor(Math.random() * 30) + 1);
    // console.log(cn, 'cn');
    return cn;
  }
  getservicecallcount() {
    return this.servicecallcount;
  }

  // getsquarevalue(val: number) {
  //   return (val * val);
  // }
  getsquarevalue(val: number): Observable<number> {
    const squarenumber = new Observable((subject: Observer<number>) => {
      setTimeout(() => {
        const sqn = val * val;
        subject.next(sqn);
      }, 500);
    });
    return squarenumber;
  }
}
