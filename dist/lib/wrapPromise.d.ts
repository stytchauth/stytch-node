declare function wrapPromise(promise: Promise<unknown>, cb?: (err: unknown | null, args?: unknown) => void): Promise<unknown>;
export default wrapPromise;
