import axios from 'axios';
class Observable {
  constructor(fn) {
    this._fn = fn;
  }
  static create(fn) {
    return new Observable(fn);
  }

  static of(...value) {
    return new Observable(observer => {
      value.forEach(v => {
        observer.next(v);
        //observer(v) ->
      });
      observer.complete();
    });
  }

  map(fn) {
    var _this = this;
    return new Observable(observer => {
      _this._fn(observer.next(fn(v)));
    });
  }

  static fromArray(array) {
    return new Observable(observer => {
      array.forEach(v => {
        observer.next(v);
      });
      observer.complete();
    });
  }

  static fromPromise(promise) {
    return new Observable(observer => {
      promise
        .then(v => {
          observer.next(v);
          observer.complete();
        })
        .catch(err => observer.error(err));
    });
  }

  static interval(space) {
    return new Observable(function(observer) {
      let i = 0;
      setInterval(() => {
        observer.next(i);
        i++;
      }, space);
    });
  }

  subscribe(...observer) {
    this._fn({
      next: observer[0],
      error: observer[1],
      complete: observer[2],
    });
  }
}

// var bar = new Observable(function(observer) {
//   console.log('hello');
//   try {
//     observer.next(42);
//     observer.next(42);
//     observer.next(42);
//     observer.complete();
//   } catch (err) {
//     observer.error(err);
//   }
// });

// var bar = Observable.of(1, 2, 3);
var bar = Observable.fromArray([1, 2, 3]);

bar.subscribe(
  x => console.log('next', x),
  err => console.log(err),
  () => console.log('complete')
);
// console.log(bar);

// function* baz() {
//   console.log('Hello');
//   yield 42;
//   yield 100;
//   yield 200;
// }

// var iterator = baz();
// console.log(iterator.next().value);
// console.log(iterator.next().value);
// console.log(iterator.next().value);

/**
 * Observable 
 * the producer determines when the values are sent
 * 
 * Generator
 * the consumer determines when the values are sent
 */

var promise = axios
  .get('http://api.icndb.com/jokes/random')
  .then(res => res.data.value.joke);

var obs = Observable.fromPromise(promise);

obs.subscribe(
  x => console.log(x),
  err => console.log('meet some err', err),
  () => console.log('done')
);

console.log('nihao');

// var foo = Rx.Observable.interval(1000);
// var foo1 = Rx.Observable.timer(3000, 1000); // waiting for 3s then do 1s interval

var obs1 = Observable.interval(1000);
// console.log(obs1);
obs1.subscribe(x => console.log(x));
