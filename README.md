# mobbing-query

A very tiny wrapper adapter for @tanstack/query to work seamlessly in MobX

# Getting started
## Installtion
First install the library
```bash
npm install mobbing-query
```
## Example Usage

```ts
class Store {
  counter = 0;
  query: MobxQuery;
  constructor() {
    makeObservable(this, {
      counter: observable,
      increment: action,
      decrement: action,
      userId: computed,
      isLoading: computed,
    });
    this.query = new MobxQuery(queryClient, () => ({
      queryKey: ["todos", this.counter],
      queryFn: async () => {
        return fetch(
          `https://jsonplaceholder.typicode.com/todos/${this.counter}`,
        ).then((res) => {
          // slow network call
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(res.json());
            }, 1000);
          });
        });
      },
    }));
  }
  increment() {
    this.counter++;
  }
  decrement() {
    this.counter--;
  }
  refetch() {
    this.query.refetch();
  }
  get userId() {
    return JSON.stringify(this.query.state.data);
  }
  get isLoading() {
    return this.query.state.isLoading || this.query.state.isFetching;
  }
}
```
and use your mobx models like you normally would.

## Api

Mobbing-query is a very tiny just exposes `MobxQuery`. `MobxQuery` is a tiny wrapper around @tanstack/query-core's  [`queryObserver`](https://tanstack.com/query/v5/docs/reference/QueryObserver) that notifies a mobx observable whenever a change happen.
The only difference you have to take note of when using `MobxQuery` is that the options must be a callback, so that it can be be treated as a [`computed`](https://mobx.js.org/computeds.html).

