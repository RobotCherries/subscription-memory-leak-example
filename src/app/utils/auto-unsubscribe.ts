export function AutoUnsubscribe(target: any, key: string) {
  if (!target._subscriptions) {
    target._subscriptions = [];
    const ngOnDestroy = target.constructor.prototype.ngOnDestroy;

    target.ngOnDestroy = function() {
      if (typeof ngOnDestroy === 'function') {
        ngOnDestroy.call(this);
      }

      target._subscriptions.forEach(sub => sub.unsubscribe());
      target._subscriptions = [];
    };
  }

  Object.defineProperty(target, key, {
    set: value => {
      target._subscriptions.push(value);
    }
  });
}
