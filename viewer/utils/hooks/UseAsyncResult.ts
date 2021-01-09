export type UseAsyncResult<Res> = Loading<Res> | Loaded<Res> | Failed<Res>;

interface UseAsyncResultI<Res> {
  status: "loading" | "loaded" | "failed";
  response?: Res;
  error: unknown;

  map<T>(mapper: (response: Res) => T): UseAsyncResult<T>;
}

export class Loading<Res> implements UseAsyncResultI<Res> {
  readonly status = "loading";
  readonly response = undefined;
  readonly error = undefined;

  map<T>(_mapper: (response: Res) => T): UseAsyncResult<T> {
    return new Loading();
  }
}

export class Loaded<Res> implements UseAsyncResultI<Res> {
  readonly status = "loaded";
  readonly response: Res;
  readonly error = undefined;

  constructor(response: Res) {
    this.response = response;
  }

  map<T>(mapper: (response: Res) => T): UseAsyncResult<T> {
    return new Loaded(mapper(this.response));
  }
}

export class Failed<Res> implements UseAsyncResultI<Res> {
  readonly status = "failed";
  readonly response = undefined;
  readonly error: unknown;

  constructor(error: unknown) {
    this.error = error;
  }

  map<T>(_mapper: (response: Res) => T): UseAsyncResult<T> {
    return new Failed(this.error);
  }
}
