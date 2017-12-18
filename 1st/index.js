import { Observable } from 'rxjs/Rx';
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const time = document.getElementById('time');

const clicks$ = Observable.fromEvent(start, 'click');
const stops$ = Observable.fromEvent(stop, 'click');

// const subscription = clicks$
//   .switchMap(() => Observable.interval(1000))
//   .subscribe(x => {
//     console.log(x);
//     time.innerHTML = x;
//   });

const interval$ = Observable.interval(1000);
const intervalUtilStop$ = interval$.takeUntil(stops$);

clicks$.switchMapTo(intervalUtilStop$).subscribe(x => {
  console.log(x);
  time.innerHTML = x;
});
