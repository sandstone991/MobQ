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
    QueryClient,
    MutationObserver,
    MutationObserverResult,
    MutationOptions,
  } from "@tanstack/query-core";
  
  class MobxMutation{
    private query: _MobxMutation;
    constructor(...args: ConstructorParameters<typeof _MobxMutation>) {
      this.query = new _MobxMutation(...args);
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
    mutate(...args: Parameters<MutationObserver["mutate"]>) {
      this.query.mutate(...args);
    }
    updateOptions(options: () => MutationOptions) {
      this.query.updateOptions(options);
    }
  }
  class _MobxMutation {
    queryClient: QueryClient;
    _queryOptions: () => MutationOptions;
    mObserver!: MutationObserver;
    public state!: MutationObserverResult;
    private dispoables: (() => void)[] = [];
    constructor(queryClient: QueryClient, queryOptions: () => MutationOptions) {
      makeObservable(this, {
        state: observable.ref,
        update: action,
        mutationOptions: computed,
        mutate: action,
        _updateOptions: action.bound,
      });
      this.queryClient = queryClient;
      this._queryOptions = queryOptions;
    }
    get mutationOptions() {
      return this._queryOptions();
    }
    setupDispoables() {
      this.mObserver = new MutationObserver(this.queryClient, this.mutationOptions);
      this.dispoables.push(
        ...[
          this.mObserver.subscribe((e) => {
            this.update(e);
          }),
          reaction(() => this.mutationOptions, this._updateOptions),
          () => {
            this.mObserver.reset();
            
          },
        ],
      );
    }
    mutate(...args: Parameters<MutationObserver["mutate"]>) {
      this.mObserver.mutate(...args)
    }
    update(state: MutationObserverResult) {
      this.state = state;
    }
    updateOptions(options: () => MutationOptions) {
      this._queryOptions = options;
    }
    _updateOptions() {
      this.mObserver.setOptions(this.mutationOptions);
    }
  
    dispose() {
      this.dispoables.forEach((fn) => fn());
    }
  }
  
  export { MobxMutation };
  