# mobbing-query

A very tiny wrapper adapter for @tanstack/query to work seamlessly in MobX

# Getting started
## Installtion
First install the library
```bash
npm install mobbing-query

```
## Try it on codesandbox

You can find a very basic example [here](https://codesandbox.io/p/devbox/mobbing-query-basic-example-dpt69w?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clsusgizs0007356kmfjewo8y%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clsusgizs0002356kzac16jcf%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clsusgizs0004356kpogh34jo%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clsusgizs0006356kyiu2qsc9%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B48.46713470951903%252C51.53286529048097%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clsusgizs0002356kzac16jcf%2522%253A%257B%2522id%2522%253A%2522clsusgizs0002356kzac16jcf%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clsusiebp0002356k3260wxgf%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522initialSelections%2522%253A%255B%257B%2522startLineNumber%2522%253A84%252C%2522startColumn%2522%253A13%252C%2522endLineNumber%2522%253A84%252C%2522endColumn%2522%253A13%257D%255D%252C%2522filepath%2522%253A%2522%252Fsrc%252FApp.tsx%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clsusiebp0002356k3260wxgf%2522%257D%252C%2522clsusgizs0006356kyiu2qsc9%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clsusgizs0005356kdrwcgui1%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_PORT%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A5173%252C%2522path%2522%253A%2522%252F%2522%257D%255D%252C%2522id%2522%253A%2522clsusgizs0006356kyiu2qsc9%2522%252C%2522activeTabId%2522%253A%2522clsusgizs0005356kdrwcgui1%2522%257D%252C%2522clsusgizs0004356kpogh34jo%2522%253A%257B%2522id%2522%253A%2522clsusgizs0004356kpogh34jo%2522%252C%2522activeTabId%2522%253A%2522clsushng9008h356kn8wo7q6e%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clsusgizs0003356kukpop9i2%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%257D%252C%257B%2522id%2522%253A%2522clsushng9008h356kn8wo7q6e%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TERMINAL%2522%252C%2522shellId%2522%253A%2522clsushna000kudjip64i1762j%2522%257D%255D%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)


## Example Usage


```ts
import { MobxQuery } from "mobbing-query";

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

Mobbing-query is a very tiny, it just exposes `MobxQuery` and `MobxMutation`. `MobxQuery` is a tiny wrapper around @tanstack/query-core's  [`queryObserver`](https://tanstack.com/query/v5/docs/reference/QueryObserver) that notifies a mobx observable whenever a change happen.
The only difference you have to take note of when using `MobxQuery` is that the options must be a callback, so that it can be be treated as a [`computed`](https://mobx.js.org/computeds.html).
