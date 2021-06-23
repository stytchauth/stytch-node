declare const wrapPromise: <T, U>(promise: Promise<T>, cb: (err: U | null, args: T | undefined) => void) => Promise<void | T>;
