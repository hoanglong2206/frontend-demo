// ─────────────────────────────────────────────────────────────────────────────
// Scalars
// ─────────────────────────────────────────────────────────────────────────────

/** Branded string for entity IDs — prevents passing arbitrary strings where an ID is expected. */
export type ID = string & { readonly __brand: "ID" };

/** ISO 8601 date-time string. */
export type ISODateString = string & { readonly __brand: "ISODateString" };

/** Unix timestamp in milliseconds. */
export type UnixMs = number & { readonly __brand: "UnixMs" };

/** A URL string (validated at runtime by the infrastructure layer). */
export type URLString = string & { readonly __brand: "URLString" };

/** Base64-encoded string. */
export type Base64 = string & { readonly __brand: "Base64" };

/** Semantic version string e.g. "1.2.3" */
export type SemVer = string & { readonly __brand: "SemVer" };

// ─────────────────────────────────────────────────────────────────────────────
// Utility Types
// ─────────────────────────────────────────────────────────────────────────────

/** T or null */
export type Nullable<T> = T | null;

/** T or undefined */
export type Maybe<T> = T | undefined;

/** T or null or undefined */
export type Optional<T> = T | null | undefined;

/** Makes selected keys required */
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Makes selected keys optional */
export type PartialKeys<T, K extends keyof T> = Omit<T, K> &
	Partial<Pick<T, K>>;

/** Deep partial — all nested properties become optional */
export type DeepPartial<T> = T extends object
	? { [P in keyof T]?: DeepPartial<T[P]> }
	: T;

/** Deep readonly */
export type DeepReadonly<T> = T extends (infer R)[]
	? ReadonlyArray<DeepReadonly<R>>
	: T extends object
		? { readonly [P in keyof T]: DeepReadonly<T[P]> }
		: T;

/** Extract keys whose value extends a given type */
export type KeysOfType<T, V> = {
	[K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

/** Strict Omit that errors if key doesn't exist */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>;

/** Merge two types, with B overriding A */
export type Merge<A, B> = Omit<A, keyof B> & B;

/** Non-empty array */
export type NonEmptyArray<T> = [T, ...T[]];

/** Record with at least one key */
export type NonEmptyRecord<K extends string, V> = Record<K, V> & {
	[key: string]: V;
};

/** Awaited return type of an async function */
export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

/** Entries of an object as a tuple array */
export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];

// ─────────────────────────────────────────────────────────────────────────────
// State Machines
// ─────────────────────────────────────────────────────────────────────────────

export type AsyncState<T, E = Error> =
	| { status: "idle" }
	| { status: "loading" }
	| { status: "success"; data: T }
	| { status: "error"; error: E };

export type LoadingState = "idle" | "loading" | "success" | "error";

// ─────────────────────────────────────────────────────────────────────────────
// Branded ID Helpers
// ─────────────────────────────────────────────────────────────────────────────

export const asID = (raw: string): ID => raw as ID;
export const asISODate = (raw: string): ISODateString => raw as ISODateString;
export const asUnixMs = (raw: number): UnixMs => raw as UnixMs;
