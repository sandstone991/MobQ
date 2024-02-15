import {
    action,
    makeObservable,
    observable,
    reaction,
    onBecomeUnobserved,
    onBecomeObserved,
  } from "mobx";
  import {
    QueryClient,
    QueryObserver,
    QueryObserverResult,
    QueryOptions,
  } from "@tanstack/query-core";
  
  class MobxQuery {
    private query: _MobxQuery;
    constructor(...args: ConstructorParameters<typeof QueryObserver>) {
      this.query = new _MobxQuery(...args);
      makeObservable(this, {
        // @ts-expect-error Mobx can see it don't worry
        query: observable.ref,
      });
      onBecomeObserved(this, "query", () => {
        this.query.setupDispoables();
      });
      onBecomeUnobserved(this, "query", () => {
        this.query.dispose();
      });
      this.query;
    }
    get state() {
      return this.query.state;
    }
    refetch() {
      this.query.refetch();
    }
    updateOptions(options: QueryOptions) {
      this.query.updateOptions(options);
    }
  }
  class _MobxQuery {
    queryClient: QueryClient;
    queryOptions: QueryOptions;
    qObserver!: QueryObserver;
    public state!: QueryObserverResult;
    private dispoables: (() => void)[] = [];
    constructor(queryClient: QueryClient, queryOptions: QueryOptions) {
      makeObservable(this, {
        state: observable.ref,
        update: action,
        queryOptions: observable,
        refetch: action,
        _updateOptions: action.bound,
      });
      this.queryClient = queryClient;
      this.queryOptions = queryOptions;
    }
    setupDispoables() {
      this.qObserver = new QueryObserver(this.queryClient, this.queryOptions);
      this.dispoables.push(
        ...[
          this.qObserver.subscribe((e) => {
            this.update(e);
          }),
          reaction(() => this.queryOptions, this._updateOptions),
          () => {
            this.qObserver.destroy();
          },
        ],
      );
    }
    refetch() {
      this.qObserver.refetch();
    }
    update(state: QueryObserverResult) {
      this.state = state;
    }
    updateOptions(options: QueryOptions) {
      this.queryOptions = options;
    }
  
    _updateOptions() {
      this.qObserver.setOptions(this.queryOptions);
    }
  
    dispose() {
      this.dispoables.forEach((fn) => fn());
    }
  }

  export { MobxQuery };
  export default MobxQuery; 