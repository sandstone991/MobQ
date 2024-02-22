import {
    action,
    makeObservable,
    observable,
    reaction,
    onBecomeUnobserved,
    onBecomeObserved,
    computed,
  } from "mobx";
  import {
      DefaultError,
    QueryClient,
    QueryKey,
    QueryObserver,
    QueryObserverOptions,
    QueryObserverResult,
  } from "@tanstack/query-core";
  
  class MobxQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>  {
    private query: _MobxQuery<TQueryFnData, TError, TData, TQueryData, TQueryKey>;
    constructor(queryClient: QueryClient, queryOptions: () => QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>) {
      this.query = new _MobxQuery(queryClient, queryOptions);
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
      return this.query.state || {};
    }
    refetch() {
      this.query.refetch();
    }
    updateOptions(options: () => QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>) {
      this.query.updateOptions(options);
    }
  }
  class _MobxQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>  {
    queryClient: QueryClient;
    _queryOptions: () => QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>;
    qObserver!: QueryObserver<TQueryFnData, TError, TData, TQueryData, TQueryKey>;
    public state!: QueryObserverResult<TData, TError>;
    private dispoables: (() => void)[] = [];
    constructor(queryClient: QueryClient, queryOptions: () => QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>) {
      makeObservable(this, {
        state: observable.ref,
        update: action,
        queryOptions: computed,
        refetch: action,
        _updateOptions: action.bound,
      });
      this.queryClient = queryClient;
      this._queryOptions = queryOptions;
    }
    get queryOptions() {
      return this._queryOptions();
    }
    setupDispoables() {
      this.qObserver = new QueryObserver(this.queryClient, this.queryOptions);
      this.state = this.qObserver.getCurrentResult();
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
    update(state: QueryObserverResult<TData, TError>) {
      this.state = state;
    }
    updateOptions(options: () => QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>) {
      this._queryOptions = options;
    }
  
    _updateOptions() {
      this.qObserver.setOptions(this.queryOptions);
    }
  
    dispose() {
      this.dispoables.forEach((fn) => fn());
    }
  }
  
  export { MobxQuery };
  