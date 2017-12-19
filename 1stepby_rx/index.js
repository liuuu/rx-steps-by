import { Observable } from 'rxjs/Rx';
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const time = document.getElementById('time');
const resetButton = document.getElementById('reset');

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

// each time a new interval is pushed, got a new tick
// startWith will set the initial value of scan
let data = {
  counter: 0,
};
const inc = acc => ({
  counter: acc.counter + 1,
});

const reset = acc => {
  return data;
};

// clicks$
//   .switchMapTo(intervalUtilStop$)
//   .startWith(data)
//   .scan(reset)
//   .subscribe(x => {
//     console.log(x);
//   });

// clicks$
//   .switchMapTo(intervalUtilStop$)
//   .startWith(data)
//   .scan(inc)
//   .subscribe(x => {
//     console.log(x);
// });

/**
 *  if we just return the acc from the scan function
 * console.log(stratWith(data)) for the first
 * then each return curr will be the value push from interval tick
 
clicks$
  .switchMapTo(intervalUtilStop$)
  .mapTo(inc)
  .startWith(data)
  .scan((acc, curr) => {
    return curr;
  })
  .subscribe(x => {
    console.log(x);
  });
  */
// clicks$
//   .switchMapTo(intervalUtilStop$)
//   .mapTo(inc)
//   .startWith(data)
//   .scan((acc, curr) => {
//     return curr(acc);
//   })
//   .subscribe(x => {
//     console.log(x);
//   });

const reset$ = Observable.fromEvent(resetButton, 'click');
clicks$
  .switchMapTo(
    Observable.merge(intervalUtilStop$.mapTo(inc), reset$.mapTo(reset))
  )
  .startWith(data)
  .scan((acc, curr) => {
    return curr(acc);
  })
  .subscribe(x => {
    console.log(x);
  });
