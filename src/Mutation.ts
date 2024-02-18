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
    DefaultError,
    MutationObserverOptions,
    MutateOptions,
  } from "@tanstack/query-core";
  class MobxMutation<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> {
    private mutation: _MobxMutation<TData, TError, TVariables, TContext>;
    constructor(queryClient: QueryClient, mutationOptions: () => MutationObserverOptions<TData, TError, TVariables, TContext>) {
      this.mutation = new _MobxMutation(queryClient, mutationOptions);
      makeObservable(this, {
        // @ts-expect-error Mobx can see it don't worry
        mutation: observable.ref,
      });
      onBecomeObserved(this, "query", () => {
        this.mutation.setupDispoables();
      });
      onBecomeUnobserved(this, "query", () => {
        this.mutation.dispose();
      });
      this.mutation;
    }
    get state() {
      return this.mutation.state;
    }
    mutate(variables: TVariables, options?: MutateOptions<TData, TError, TVariables, TContext> | undefined ) {
        this.mutation.mutate(variables, options);
        }
    updateOptions(options: () => MutationObserverOptions<TData, TError, TVariables, TContext>) {
        this.mutation.updateOptions(options);
        }
  }
  class _MobxMutation<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> {
    queryClient: QueryClient;
    _queryOptions: () => MutationObserverOptions<TData, TError, TVariables, TContext>;
    mObserver!: MutationObserver<TData, TError, TVariables, TContext>;
    public state!:MutationObserverResult<TData, TError, TVariables, TContext>;
    private dispoables: (() => void)[] = [];
    constructor(queryClient: QueryClient, mutationOptions: () =>  MutationObserverOptions<TData, TError, TVariables, TContext>) {
      makeObservable(this, {
        state: observable.ref,
        update: action,
        mutationOptions: computed,
        mutate: action,
        _updateOptions: action.bound,
      });
      this.queryClient = queryClient;
      this._queryOptions = mutationOptions;
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
    mutate(variables: TVariables, options?: MutateOptions<TData, TError, TVariables, TContext> | undefined ) {
      this.mObserver.mutate(variables, options)
    }
    update(state: MutationObserverResult<TData, TError, TVariables, TContext>) {
      this.state = state;
    }
    updateOptions(options: () => MutationObserverOptions<TData, TError, TVariables, TContext>) {
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
  