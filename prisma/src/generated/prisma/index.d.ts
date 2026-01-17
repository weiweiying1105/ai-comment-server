
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model GoodComment
 * 
 */
export type GoodComment = $Result.DefaultSelection<Prisma.$GoodCommentPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs>;

  /**
   * `prisma.goodComment`: Exposes CRUD operations for the **GoodComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GoodComments
    * const goodComments = await prisma.goodComment.findMany()
    * ```
    */
  get goodComment(): Prisma.GoodCommentDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Category: 'Category',
    GoodComment: 'GoodComment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "category" | "goodComment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      GoodComment: {
        payload: Prisma.$GoodCommentPayload<ExtArgs>
        fields: Prisma.GoodCommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GoodCommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodCommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GoodCommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodCommentPayload>
          }
          findFirst: {
            args: Prisma.GoodCommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodCommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GoodCommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodCommentPayload>
          }
          findMany: {
            args: Prisma.GoodCommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodCommentPayload>[]
          }
          create: {
            args: Prisma.GoodCommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodCommentPayload>
          }
          createMany: {
            args: Prisma.GoodCommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GoodCommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodCommentPayload>[]
          }
          delete: {
            args: Prisma.GoodCommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodCommentPayload>
          }
          update: {
            args: Prisma.GoodCommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodCommentPayload>
          }
          deleteMany: {
            args: Prisma.GoodCommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GoodCommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GoodCommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodCommentPayload>
          }
          aggregate: {
            args: Prisma.GoodCommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGoodComment>
          }
          groupBy: {
            args: Prisma.GoodCommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<GoodCommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.GoodCommentCountArgs<ExtArgs>
            result: $Utils.Optional<GoodCommentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    comments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | UserCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoodCommentWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    comments: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | CategoryCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoodCommentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    gender: number | null
  }

  export type UserSumAggregateOutputType = {
    gender: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    openId: string | null
    unionId: string | null
    nickName: string | null
    avatarUrl: string | null
    gender: number | null
    city: string | null
    province: string | null
    country: string | null
    language: string | null
    currency: string | null
    timezone: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLoginAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    openId: string | null
    unionId: string | null
    nickName: string | null
    avatarUrl: string | null
    gender: number | null
    city: string | null
    province: string | null
    country: string | null
    language: string | null
    currency: string | null
    timezone: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLoginAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    openId: number
    unionId: number
    nickName: number
    avatarUrl: number
    gender: number
    city: number
    province: number
    country: number
    language: number
    currency: number
    timezone: number
    createdAt: number
    updatedAt: number
    lastLoginAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    gender?: true
  }

  export type UserSumAggregateInputType = {
    gender?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    openId?: true
    unionId?: true
    nickName?: true
    avatarUrl?: true
    gender?: true
    city?: true
    province?: true
    country?: true
    language?: true
    currency?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
    lastLoginAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    openId?: true
    unionId?: true
    nickName?: true
    avatarUrl?: true
    gender?: true
    city?: true
    province?: true
    country?: true
    language?: true
    currency?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
    lastLoginAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    openId?: true
    unionId?: true
    nickName?: true
    avatarUrl?: true
    gender?: true
    city?: true
    province?: true
    country?: true
    language?: true
    currency?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
    lastLoginAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    openId: string
    unionId: string | null
    nickName: string | null
    avatarUrl: string | null
    gender: number | null
    city: string | null
    province: string | null
    country: string | null
    language: string | null
    currency: string
    timezone: string
    createdAt: Date
    updatedAt: Date
    lastLoginAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    openId?: boolean
    unionId?: boolean
    nickName?: boolean
    avatarUrl?: boolean
    gender?: boolean
    city?: boolean
    province?: boolean
    country?: boolean
    language?: boolean
    currency?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLoginAt?: boolean
    comments?: boolean | User$commentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    openId?: boolean
    unionId?: boolean
    nickName?: boolean
    avatarUrl?: boolean
    gender?: boolean
    city?: boolean
    province?: boolean
    country?: boolean
    language?: boolean
    currency?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLoginAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    openId?: boolean
    unionId?: boolean
    nickName?: boolean
    avatarUrl?: boolean
    gender?: boolean
    city?: boolean
    province?: boolean
    country?: boolean
    language?: boolean
    currency?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLoginAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | User$commentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      comments: Prisma.$GoodCommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      openId: string
      unionId: string | null
      nickName: string | null
      avatarUrl: string | null
      gender: number | null
      city: string | null
      province: string | null
      country: string | null
      language: string | null
      currency: string
      timezone: string
      createdAt: Date
      updatedAt: Date
      lastLoginAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comments<T extends User$commentsArgs<ExtArgs> = {}>(args?: Subset<T, User$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodCommentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly openId: FieldRef<"User", 'String'>
    readonly unionId: FieldRef<"User", 'String'>
    readonly nickName: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly gender: FieldRef<"User", 'Int'>
    readonly city: FieldRef<"User", 'String'>
    readonly province: FieldRef<"User", 'String'>
    readonly country: FieldRef<"User", 'String'>
    readonly language: FieldRef<"User", 'String'>
    readonly currency: FieldRef<"User", 'String'>
    readonly timezone: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.comments
   */
  export type User$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodComment
     */
    select?: GoodCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodCommentInclude<ExtArgs> | null
    where?: GoodCommentWhereInput
    orderBy?: GoodCommentOrderByWithRelationInput | GoodCommentOrderByWithRelationInput[]
    cursor?: GoodCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GoodCommentScalarFieldEnum | GoodCommentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number | null
    parentId: number | null
    use_count: number | null
  }

  export type CategorySumAggregateOutputType = {
    id: number | null
    parentId: number | null
    use_count: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
    parentId: number | null
    keyword: string | null
    icon: string | null
    active_icon: string | null
    createdAt: Date | null
    updatedAt: Date | null
    use_count: number | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
    parentId: number | null
    keyword: string | null
    icon: string | null
    active_icon: string | null
    createdAt: Date | null
    updatedAt: Date | null
    use_count: number | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    parentId: number
    keyword: number
    icon: number
    active_icon: number
    createdAt: number
    updatedAt: number
    use_count: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
    parentId?: true
    use_count?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
    parentId?: true
    use_count?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    parentId?: true
    keyword?: true
    icon?: true
    active_icon?: true
    createdAt?: true
    updatedAt?: true
    use_count?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    parentId?: true
    keyword?: true
    icon?: true
    active_icon?: true
    createdAt?: true
    updatedAt?: true
    use_count?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    parentId?: true
    keyword?: true
    icon?: true
    active_icon?: true
    createdAt?: true
    updatedAt?: true
    use_count?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: number
    name: string
    parentId: number | null
    keyword: string | null
    icon: string | null
    active_icon: string | null
    createdAt: Date
    updatedAt: Date
    use_count: number
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    parentId?: boolean
    keyword?: boolean
    icon?: boolean
    active_icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    use_count?: boolean
    comments?: boolean | Category$commentsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    parentId?: boolean
    keyword?: boolean
    icon?: boolean
    active_icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    use_count?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    parentId?: boolean
    keyword?: boolean
    icon?: boolean
    active_icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    use_count?: boolean
  }

  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | Category$commentsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      comments: Prisma.$GoodCommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      parentId: number | null
      keyword: string | null
      icon: string | null
      active_icon: string | null
      createdAt: Date
      updatedAt: Date
      use_count: number
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comments<T extends Category$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Category$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodCommentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */ 
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'Int'>
    readonly name: FieldRef<"Category", 'String'>
    readonly parentId: FieldRef<"Category", 'Int'>
    readonly keyword: FieldRef<"Category", 'String'>
    readonly icon: FieldRef<"Category", 'String'>
    readonly active_icon: FieldRef<"Category", 'String'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
    readonly use_count: FieldRef<"Category", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
  }

  /**
   * Category.comments
   */
  export type Category$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodComment
     */
    select?: GoodCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodCommentInclude<ExtArgs> | null
    where?: GoodCommentWhereInput
    orderBy?: GoodCommentOrderByWithRelationInput | GoodCommentOrderByWithRelationInput[]
    cursor?: GoodCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GoodCommentScalarFieldEnum | GoodCommentScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model GoodComment
   */

  export type AggregateGoodComment = {
    _count: GoodCommentCountAggregateOutputType | null
    _avg: GoodCommentAvgAggregateOutputType | null
    _sum: GoodCommentSumAggregateOutputType | null
    _min: GoodCommentMinAggregateOutputType | null
    _max: GoodCommentMaxAggregateOutputType | null
  }

  export type GoodCommentAvgAggregateOutputType = {
    id: number | null
    commentId: number | null
    category: number | null
    limit: number | null
  }

  export type GoodCommentSumAggregateOutputType = {
    id: number | null
    commentId: number | null
    category: number | null
    limit: number | null
  }

  export type GoodCommentMinAggregateOutputType = {
    id: number | null
    commentId: number | null
    category: number | null
    categoryName: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    limit: number | null
    isTemplate: boolean | null
  }

  export type GoodCommentMaxAggregateOutputType = {
    id: number | null
    commentId: number | null
    category: number | null
    categoryName: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    limit: number | null
    isTemplate: boolean | null
  }

  export type GoodCommentCountAggregateOutputType = {
    id: number
    commentId: number
    category: number
    categoryName: number
    content: number
    createdAt: number
    updatedAt: number
    userId: number
    limit: number
    isTemplate: number
    _all: number
  }


  export type GoodCommentAvgAggregateInputType = {
    id?: true
    commentId?: true
    category?: true
    limit?: true
  }

  export type GoodCommentSumAggregateInputType = {
    id?: true
    commentId?: true
    category?: true
    limit?: true
  }

  export type GoodCommentMinAggregateInputType = {
    id?: true
    commentId?: true
    category?: true
    categoryName?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    limit?: true
    isTemplate?: true
  }

  export type GoodCommentMaxAggregateInputType = {
    id?: true
    commentId?: true
    category?: true
    categoryName?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    limit?: true
    isTemplate?: true
  }

  export type GoodCommentCountAggregateInputType = {
    id?: true
    commentId?: true
    category?: true
    categoryName?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    limit?: true
    isTemplate?: true
    _all?: true
  }

  export type GoodCommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GoodComment to aggregate.
     */
    where?: GoodCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodComments to fetch.
     */
    orderBy?: GoodCommentOrderByWithRelationInput | GoodCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GoodCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GoodComments
    **/
    _count?: true | GoodCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GoodCommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GoodCommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GoodCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GoodCommentMaxAggregateInputType
  }

  export type GetGoodCommentAggregateType<T extends GoodCommentAggregateArgs> = {
        [P in keyof T & keyof AggregateGoodComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGoodComment[P]>
      : GetScalarType<T[P], AggregateGoodComment[P]>
  }




  export type GoodCommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoodCommentWhereInput
    orderBy?: GoodCommentOrderByWithAggregationInput | GoodCommentOrderByWithAggregationInput[]
    by: GoodCommentScalarFieldEnum[] | GoodCommentScalarFieldEnum
    having?: GoodCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GoodCommentCountAggregateInputType | true
    _avg?: GoodCommentAvgAggregateInputType
    _sum?: GoodCommentSumAggregateInputType
    _min?: GoodCommentMinAggregateInputType
    _max?: GoodCommentMaxAggregateInputType
  }

  export type GoodCommentGroupByOutputType = {
    id: number
    commentId: number
    category: number
    categoryName: string
    content: string
    createdAt: Date
    updatedAt: Date
    userId: string
    limit: number
    isTemplate: boolean
    _count: GoodCommentCountAggregateOutputType | null
    _avg: GoodCommentAvgAggregateOutputType | null
    _sum: GoodCommentSumAggregateOutputType | null
    _min: GoodCommentMinAggregateOutputType | null
    _max: GoodCommentMaxAggregateOutputType | null
  }

  type GetGoodCommentGroupByPayload<T extends GoodCommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GoodCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GoodCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GoodCommentGroupByOutputType[P]>
            : GetScalarType<T[P], GoodCommentGroupByOutputType[P]>
        }
      >
    >


  export type GoodCommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commentId?: boolean
    category?: boolean
    categoryName?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    limit?: boolean
    isTemplate?: boolean
    categoryCategory?: boolean | CategoryDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goodComment"]>

  export type GoodCommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commentId?: boolean
    category?: boolean
    categoryName?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    limit?: boolean
    isTemplate?: boolean
    categoryCategory?: boolean | CategoryDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goodComment"]>

  export type GoodCommentSelectScalar = {
    id?: boolean
    commentId?: boolean
    category?: boolean
    categoryName?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    limit?: boolean
    isTemplate?: boolean
  }

  export type GoodCommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoryCategory?: boolean | CategoryDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GoodCommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoryCategory?: boolean | CategoryDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GoodCommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GoodComment"
    objects: {
      categoryCategory: Prisma.$CategoryPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      commentId: number
      category: number
      categoryName: string
      content: string
      createdAt: Date
      updatedAt: Date
      userId: string
      limit: number
      isTemplate: boolean
    }, ExtArgs["result"]["goodComment"]>
    composites: {}
  }

  type GoodCommentGetPayload<S extends boolean | null | undefined | GoodCommentDefaultArgs> = $Result.GetResult<Prisma.$GoodCommentPayload, S>

  type GoodCommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GoodCommentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GoodCommentCountAggregateInputType | true
    }

  export interface GoodCommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GoodComment'], meta: { name: 'GoodComment' } }
    /**
     * Find zero or one GoodComment that matches the filter.
     * @param {GoodCommentFindUniqueArgs} args - Arguments to find a GoodComment
     * @example
     * // Get one GoodComment
     * const goodComment = await prisma.goodComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GoodCommentFindUniqueArgs>(args: SelectSubset<T, GoodCommentFindUniqueArgs<ExtArgs>>): Prisma__GoodCommentClient<$Result.GetResult<Prisma.$GoodCommentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GoodComment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GoodCommentFindUniqueOrThrowArgs} args - Arguments to find a GoodComment
     * @example
     * // Get one GoodComment
     * const goodComment = await prisma.goodComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GoodCommentFindUniqueOrThrowArgs>(args: SelectSubset<T, GoodCommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GoodCommentClient<$Result.GetResult<Prisma.$GoodCommentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GoodComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodCommentFindFirstArgs} args - Arguments to find a GoodComment
     * @example
     * // Get one GoodComment
     * const goodComment = await prisma.goodComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GoodCommentFindFirstArgs>(args?: SelectSubset<T, GoodCommentFindFirstArgs<ExtArgs>>): Prisma__GoodCommentClient<$Result.GetResult<Prisma.$GoodCommentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GoodComment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodCommentFindFirstOrThrowArgs} args - Arguments to find a GoodComment
     * @example
     * // Get one GoodComment
     * const goodComment = await prisma.goodComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GoodCommentFindFirstOrThrowArgs>(args?: SelectSubset<T, GoodCommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__GoodCommentClient<$Result.GetResult<Prisma.$GoodCommentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GoodComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodCommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GoodComments
     * const goodComments = await prisma.goodComment.findMany()
     * 
     * // Get first 10 GoodComments
     * const goodComments = await prisma.goodComment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const goodCommentWithIdOnly = await prisma.goodComment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GoodCommentFindManyArgs>(args?: SelectSubset<T, GoodCommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodCommentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GoodComment.
     * @param {GoodCommentCreateArgs} args - Arguments to create a GoodComment.
     * @example
     * // Create one GoodComment
     * const GoodComment = await prisma.goodComment.create({
     *   data: {
     *     // ... data to create a GoodComment
     *   }
     * })
     * 
     */
    create<T extends GoodCommentCreateArgs>(args: SelectSubset<T, GoodCommentCreateArgs<ExtArgs>>): Prisma__GoodCommentClient<$Result.GetResult<Prisma.$GoodCommentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GoodComments.
     * @param {GoodCommentCreateManyArgs} args - Arguments to create many GoodComments.
     * @example
     * // Create many GoodComments
     * const goodComment = await prisma.goodComment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GoodCommentCreateManyArgs>(args?: SelectSubset<T, GoodCommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GoodComments and returns the data saved in the database.
     * @param {GoodCommentCreateManyAndReturnArgs} args - Arguments to create many GoodComments.
     * @example
     * // Create many GoodComments
     * const goodComment = await prisma.goodComment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GoodComments and only return the `id`
     * const goodCommentWithIdOnly = await prisma.goodComment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GoodCommentCreateManyAndReturnArgs>(args?: SelectSubset<T, GoodCommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodCommentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GoodComment.
     * @param {GoodCommentDeleteArgs} args - Arguments to delete one GoodComment.
     * @example
     * // Delete one GoodComment
     * const GoodComment = await prisma.goodComment.delete({
     *   where: {
     *     // ... filter to delete one GoodComment
     *   }
     * })
     * 
     */
    delete<T extends GoodCommentDeleteArgs>(args: SelectSubset<T, GoodCommentDeleteArgs<ExtArgs>>): Prisma__GoodCommentClient<$Result.GetResult<Prisma.$GoodCommentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GoodComment.
     * @param {GoodCommentUpdateArgs} args - Arguments to update one GoodComment.
     * @example
     * // Update one GoodComment
     * const goodComment = await prisma.goodComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GoodCommentUpdateArgs>(args: SelectSubset<T, GoodCommentUpdateArgs<ExtArgs>>): Prisma__GoodCommentClient<$Result.GetResult<Prisma.$GoodCommentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GoodComments.
     * @param {GoodCommentDeleteManyArgs} args - Arguments to filter GoodComments to delete.
     * @example
     * // Delete a few GoodComments
     * const { count } = await prisma.goodComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GoodCommentDeleteManyArgs>(args?: SelectSubset<T, GoodCommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GoodComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GoodComments
     * const goodComment = await prisma.goodComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GoodCommentUpdateManyArgs>(args: SelectSubset<T, GoodCommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GoodComment.
     * @param {GoodCommentUpsertArgs} args - Arguments to update or create a GoodComment.
     * @example
     * // Update or create a GoodComment
     * const goodComment = await prisma.goodComment.upsert({
     *   create: {
     *     // ... data to create a GoodComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GoodComment we want to update
     *   }
     * })
     */
    upsert<T extends GoodCommentUpsertArgs>(args: SelectSubset<T, GoodCommentUpsertArgs<ExtArgs>>): Prisma__GoodCommentClient<$Result.GetResult<Prisma.$GoodCommentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GoodComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodCommentCountArgs} args - Arguments to filter GoodComments to count.
     * @example
     * // Count the number of GoodComments
     * const count = await prisma.goodComment.count({
     *   where: {
     *     // ... the filter for the GoodComments we want to count
     *   }
     * })
    **/
    count<T extends GoodCommentCountArgs>(
      args?: Subset<T, GoodCommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GoodCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GoodComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GoodCommentAggregateArgs>(args: Subset<T, GoodCommentAggregateArgs>): Prisma.PrismaPromise<GetGoodCommentAggregateType<T>>

    /**
     * Group by GoodComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodCommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GoodCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GoodCommentGroupByArgs['orderBy'] }
        : { orderBy?: GoodCommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GoodCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGoodCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GoodComment model
   */
  readonly fields: GoodCommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GoodComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GoodCommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    categoryCategory<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GoodComment model
   */ 
  interface GoodCommentFieldRefs {
    readonly id: FieldRef<"GoodComment", 'Int'>
    readonly commentId: FieldRef<"GoodComment", 'Int'>
    readonly category: FieldRef<"GoodComment", 'Int'>
    readonly categoryName: FieldRef<"GoodComment", 'String'>
    readonly content: FieldRef<"GoodComment", 'String'>
    readonly createdAt: FieldRef<"GoodComment", 'DateTime'>
    readonly updatedAt: FieldRef<"GoodComment", 'DateTime'>
    readonly userId: FieldRef<"GoodComment", 'String'>
    readonly limit: FieldRef<"GoodComment", 'Int'>
    readonly isTemplate: FieldRef<"GoodComment", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * GoodComment findUnique
   */
  export type GoodCommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodComment
     */
    select?: GoodCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodCommentInclude<ExtArgs> | null
    /**
     * Filter, which GoodComment to fetch.
     */
    where: GoodCommentWhereUniqueInput
  }

  /**
   * GoodComment findUniqueOrThrow
   */
  export type GoodCommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodComment
     */
    select?: GoodCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodCommentInclude<ExtArgs> | null
    /**
     * Filter, which GoodComment to fetch.
     */
    where: GoodCommentWhereUniqueInput
  }

  /**
   * GoodComment findFirst
   */
  export type GoodCommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodComment
     */
    select?: GoodCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodCommentInclude<ExtArgs> | null
    /**
     * Filter, which GoodComment to fetch.
     */
    where?: GoodCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodComments to fetch.
     */
    orderBy?: GoodCommentOrderByWithRelationInput | GoodCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GoodComments.
     */
    cursor?: GoodCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GoodComments.
     */
    distinct?: GoodCommentScalarFieldEnum | GoodCommentScalarFieldEnum[]
  }

  /**
   * GoodComment findFirstOrThrow
   */
  export type GoodCommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodComment
     */
    select?: GoodCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodCommentInclude<ExtArgs> | null
    /**
     * Filter, which GoodComment to fetch.
     */
    where?: GoodCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodComments to fetch.
     */
    orderBy?: GoodCommentOrderByWithRelationInput | GoodCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GoodComments.
     */
    cursor?: GoodCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GoodComments.
     */
    distinct?: GoodCommentScalarFieldEnum | GoodCommentScalarFieldEnum[]
  }

  /**
   * GoodComment findMany
   */
  export type GoodCommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodComment
     */
    select?: GoodCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodCommentInclude<ExtArgs> | null
    /**
     * Filter, which GoodComments to fetch.
     */
    where?: GoodCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodComments to fetch.
     */
    orderBy?: GoodCommentOrderByWithRelationInput | GoodCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GoodComments.
     */
    cursor?: GoodCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodComments.
     */
    skip?: number
    distinct?: GoodCommentScalarFieldEnum | GoodCommentScalarFieldEnum[]
  }

  /**
   * GoodComment create
   */
  export type GoodCommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodComment
     */
    select?: GoodCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodCommentInclude<ExtArgs> | null
    /**
     * The data needed to create a GoodComment.
     */
    data: XOR<GoodCommentCreateInput, GoodCommentUncheckedCreateInput>
  }

  /**
   * GoodComment createMany
   */
  export type GoodCommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GoodComments.
     */
    data: GoodCommentCreateManyInput | GoodCommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GoodComment createManyAndReturn
   */
  export type GoodCommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodComment
     */
    select?: GoodCommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GoodComments.
     */
    data: GoodCommentCreateManyInput | GoodCommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodCommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GoodComment update
   */
  export type GoodCommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodComment
     */
    select?: GoodCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodCommentInclude<ExtArgs> | null
    /**
     * The data needed to update a GoodComment.
     */
    data: XOR<GoodCommentUpdateInput, GoodCommentUncheckedUpdateInput>
    /**
     * Choose, which GoodComment to update.
     */
    where: GoodCommentWhereUniqueInput
  }

  /**
   * GoodComment updateMany
   */
  export type GoodCommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GoodComments.
     */
    data: XOR<GoodCommentUpdateManyMutationInput, GoodCommentUncheckedUpdateManyInput>
    /**
     * Filter which GoodComments to update
     */
    where?: GoodCommentWhereInput
  }

  /**
   * GoodComment upsert
   */
  export type GoodCommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodComment
     */
    select?: GoodCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodCommentInclude<ExtArgs> | null
    /**
     * The filter to search for the GoodComment to update in case it exists.
     */
    where: GoodCommentWhereUniqueInput
    /**
     * In case the GoodComment found by the `where` argument doesn't exist, create a new GoodComment with this data.
     */
    create: XOR<GoodCommentCreateInput, GoodCommentUncheckedCreateInput>
    /**
     * In case the GoodComment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GoodCommentUpdateInput, GoodCommentUncheckedUpdateInput>
  }

  /**
   * GoodComment delete
   */
  export type GoodCommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodComment
     */
    select?: GoodCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodCommentInclude<ExtArgs> | null
    /**
     * Filter which GoodComment to delete.
     */
    where: GoodCommentWhereUniqueInput
  }

  /**
   * GoodComment deleteMany
   */
  export type GoodCommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GoodComments to delete
     */
    where?: GoodCommentWhereInput
  }

  /**
   * GoodComment without action
   */
  export type GoodCommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodComment
     */
    select?: GoodCommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodCommentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    openId: 'openId',
    unionId: 'unionId',
    nickName: 'nickName',
    avatarUrl: 'avatarUrl',
    gender: 'gender',
    city: 'city',
    province: 'province',
    country: 'country',
    language: 'language',
    currency: 'currency',
    timezone: 'timezone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastLoginAt: 'lastLoginAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    parentId: 'parentId',
    keyword: 'keyword',
    icon: 'icon',
    active_icon: 'active_icon',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    use_count: 'use_count'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const GoodCommentScalarFieldEnum: {
    id: 'id',
    commentId: 'commentId',
    category: 'category',
    categoryName: 'categoryName',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    limit: 'limit',
    isTemplate: 'isTemplate'
  };

  export type GoodCommentScalarFieldEnum = (typeof GoodCommentScalarFieldEnum)[keyof typeof GoodCommentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    openId?: StringFilter<"User"> | string
    unionId?: StringNullableFilter<"User"> | string | null
    nickName?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    gender?: IntNullableFilter<"User"> | number | null
    city?: StringNullableFilter<"User"> | string | null
    province?: StringNullableFilter<"User"> | string | null
    country?: StringNullableFilter<"User"> | string | null
    language?: StringNullableFilter<"User"> | string | null
    currency?: StringFilter<"User"> | string
    timezone?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLoginAt?: DateTimeFilter<"User"> | Date | string
    comments?: GoodCommentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    openId?: SortOrder
    unionId?: SortOrderInput | SortOrder
    nickName?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    province?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    currency?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrder
    comments?: GoodCommentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    openId?: string
    unionId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    nickName?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    gender?: IntNullableFilter<"User"> | number | null
    city?: StringNullableFilter<"User"> | string | null
    province?: StringNullableFilter<"User"> | string | null
    country?: StringNullableFilter<"User"> | string | null
    language?: StringNullableFilter<"User"> | string | null
    currency?: StringFilter<"User"> | string
    timezone?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLoginAt?: DateTimeFilter<"User"> | Date | string
    comments?: GoodCommentListRelationFilter
  }, "id" | "openId" | "unionId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    openId?: SortOrder
    unionId?: SortOrderInput | SortOrder
    nickName?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    province?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    currency?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    openId?: StringWithAggregatesFilter<"User"> | string
    unionId?: StringNullableWithAggregatesFilter<"User"> | string | null
    nickName?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    gender?: IntNullableWithAggregatesFilter<"User"> | number | null
    city?: StringNullableWithAggregatesFilter<"User"> | string | null
    province?: StringNullableWithAggregatesFilter<"User"> | string | null
    country?: StringNullableWithAggregatesFilter<"User"> | string | null
    language?: StringNullableWithAggregatesFilter<"User"> | string | null
    currency?: StringWithAggregatesFilter<"User"> | string
    timezone?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    lastLoginAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: IntFilter<"Category"> | number
    name?: StringFilter<"Category"> | string
    parentId?: IntNullableFilter<"Category"> | number | null
    keyword?: StringNullableFilter<"Category"> | string | null
    icon?: StringNullableFilter<"Category"> | string | null
    active_icon?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    use_count?: IntFilter<"Category"> | number
    comments?: GoodCommentListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrderInput | SortOrder
    keyword?: SortOrderInput | SortOrder
    icon?: SortOrderInput | SortOrder
    active_icon?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    use_count?: SortOrder
    comments?: GoodCommentOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    parentId?: IntNullableFilter<"Category"> | number | null
    keyword?: StringNullableFilter<"Category"> | string | null
    icon?: StringNullableFilter<"Category"> | string | null
    active_icon?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    use_count?: IntFilter<"Category"> | number
    comments?: GoodCommentListRelationFilter
  }, "id" | "name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrderInput | SortOrder
    keyword?: SortOrderInput | SortOrder
    icon?: SortOrderInput | SortOrder
    active_icon?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    use_count?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Category"> | number
    name?: StringWithAggregatesFilter<"Category"> | string
    parentId?: IntNullableWithAggregatesFilter<"Category"> | number | null
    keyword?: StringNullableWithAggregatesFilter<"Category"> | string | null
    icon?: StringNullableWithAggregatesFilter<"Category"> | string | null
    active_icon?: StringNullableWithAggregatesFilter<"Category"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    use_count?: IntWithAggregatesFilter<"Category"> | number
  }

  export type GoodCommentWhereInput = {
    AND?: GoodCommentWhereInput | GoodCommentWhereInput[]
    OR?: GoodCommentWhereInput[]
    NOT?: GoodCommentWhereInput | GoodCommentWhereInput[]
    id?: IntFilter<"GoodComment"> | number
    commentId?: IntFilter<"GoodComment"> | number
    category?: IntFilter<"GoodComment"> | number
    categoryName?: StringFilter<"GoodComment"> | string
    content?: StringFilter<"GoodComment"> | string
    createdAt?: DateTimeFilter<"GoodComment"> | Date | string
    updatedAt?: DateTimeFilter<"GoodComment"> | Date | string
    userId?: StringFilter<"GoodComment"> | string
    limit?: IntFilter<"GoodComment"> | number
    isTemplate?: BoolFilter<"GoodComment"> | boolean
    categoryCategory?: XOR<CategoryRelationFilter, CategoryWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type GoodCommentOrderByWithRelationInput = {
    id?: SortOrder
    commentId?: SortOrder
    category?: SortOrder
    categoryName?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    limit?: SortOrder
    isTemplate?: SortOrder
    categoryCategory?: CategoryOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type GoodCommentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GoodCommentWhereInput | GoodCommentWhereInput[]
    OR?: GoodCommentWhereInput[]
    NOT?: GoodCommentWhereInput | GoodCommentWhereInput[]
    commentId?: IntFilter<"GoodComment"> | number
    category?: IntFilter<"GoodComment"> | number
    categoryName?: StringFilter<"GoodComment"> | string
    content?: StringFilter<"GoodComment"> | string
    createdAt?: DateTimeFilter<"GoodComment"> | Date | string
    updatedAt?: DateTimeFilter<"GoodComment"> | Date | string
    userId?: StringFilter<"GoodComment"> | string
    limit?: IntFilter<"GoodComment"> | number
    isTemplate?: BoolFilter<"GoodComment"> | boolean
    categoryCategory?: XOR<CategoryRelationFilter, CategoryWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type GoodCommentOrderByWithAggregationInput = {
    id?: SortOrder
    commentId?: SortOrder
    category?: SortOrder
    categoryName?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    limit?: SortOrder
    isTemplate?: SortOrder
    _count?: GoodCommentCountOrderByAggregateInput
    _avg?: GoodCommentAvgOrderByAggregateInput
    _max?: GoodCommentMaxOrderByAggregateInput
    _min?: GoodCommentMinOrderByAggregateInput
    _sum?: GoodCommentSumOrderByAggregateInput
  }

  export type GoodCommentScalarWhereWithAggregatesInput = {
    AND?: GoodCommentScalarWhereWithAggregatesInput | GoodCommentScalarWhereWithAggregatesInput[]
    OR?: GoodCommentScalarWhereWithAggregatesInput[]
    NOT?: GoodCommentScalarWhereWithAggregatesInput | GoodCommentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GoodComment"> | number
    commentId?: IntWithAggregatesFilter<"GoodComment"> | number
    category?: IntWithAggregatesFilter<"GoodComment"> | number
    categoryName?: StringWithAggregatesFilter<"GoodComment"> | string
    content?: StringWithAggregatesFilter<"GoodComment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"GoodComment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GoodComment"> | Date | string
    userId?: StringWithAggregatesFilter<"GoodComment"> | string
    limit?: IntWithAggregatesFilter<"GoodComment"> | number
    isTemplate?: BoolWithAggregatesFilter<"GoodComment"> | boolean
  }

  export type UserCreateInput = {
    id?: string
    openId: string
    unionId?: string | null
    nickName?: string | null
    avatarUrl?: string | null
    gender?: number | null
    city?: string | null
    province?: string | null
    country?: string | null
    language?: string | null
    currency?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string
    comments?: GoodCommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    openId: string
    unionId?: string | null
    nickName?: string | null
    avatarUrl?: string | null
    gender?: number | null
    city?: string | null
    province?: string | null
    country?: string | null
    language?: string | null
    currency?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string
    comments?: GoodCommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    openId?: StringFieldUpdateOperationsInput | string
    unionId?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableIntFieldUpdateOperationsInput | number | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: GoodCommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    openId?: StringFieldUpdateOperationsInput | string
    unionId?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableIntFieldUpdateOperationsInput | number | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: GoodCommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    openId: string
    unionId?: string | null
    nickName?: string | null
    avatarUrl?: string | null
    gender?: number | null
    city?: string | null
    province?: string | null
    country?: string | null
    language?: string | null
    currency?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    openId?: StringFieldUpdateOperationsInput | string
    unionId?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableIntFieldUpdateOperationsInput | number | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    openId?: StringFieldUpdateOperationsInput | string
    unionId?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableIntFieldUpdateOperationsInput | number | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    name: string
    parentId?: number | null
    keyword?: string | null
    icon?: string | null
    active_icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    use_count?: number
    comments?: GoodCommentCreateNestedManyWithoutCategoryCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: number
    name: string
    parentId?: number | null
    keyword?: string | null
    icon?: string | null
    active_icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    use_count?: number
    comments?: GoodCommentUncheckedCreateNestedManyWithoutCategoryCategoryInput
  }

  export type CategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    keyword?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    active_icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    use_count?: IntFieldUpdateOperationsInput | number
    comments?: GoodCommentUpdateManyWithoutCategoryCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    keyword?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    active_icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    use_count?: IntFieldUpdateOperationsInput | number
    comments?: GoodCommentUncheckedUpdateManyWithoutCategoryCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: number
    name: string
    parentId?: number | null
    keyword?: string | null
    icon?: string | null
    active_icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    use_count?: number
  }

  export type CategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    keyword?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    active_icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    use_count?: IntFieldUpdateOperationsInput | number
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    keyword?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    active_icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    use_count?: IntFieldUpdateOperationsInput | number
  }

  export type GoodCommentCreateInput = {
    commentId?: number
    categoryName: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    limit: number
    isTemplate?: boolean
    categoryCategory: CategoryCreateNestedOneWithoutCommentsInput
    user: UserCreateNestedOneWithoutCommentsInput
  }

  export type GoodCommentUncheckedCreateInput = {
    id?: number
    commentId?: number
    category: number
    categoryName: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    limit: number
    isTemplate?: boolean
  }

  export type GoodCommentUpdateInput = {
    commentId?: IntFieldUpdateOperationsInput | number
    categoryName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limit?: IntFieldUpdateOperationsInput | number
    isTemplate?: BoolFieldUpdateOperationsInput | boolean
    categoryCategory?: CategoryUpdateOneRequiredWithoutCommentsNestedInput
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type GoodCommentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    commentId?: IntFieldUpdateOperationsInput | number
    category?: IntFieldUpdateOperationsInput | number
    categoryName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    limit?: IntFieldUpdateOperationsInput | number
    isTemplate?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GoodCommentCreateManyInput = {
    id?: number
    commentId?: number
    category: number
    categoryName: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    limit: number
    isTemplate?: boolean
  }

  export type GoodCommentUpdateManyMutationInput = {
    commentId?: IntFieldUpdateOperationsInput | number
    categoryName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limit?: IntFieldUpdateOperationsInput | number
    isTemplate?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GoodCommentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    commentId?: IntFieldUpdateOperationsInput | number
    category?: IntFieldUpdateOperationsInput | number
    categoryName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    limit?: IntFieldUpdateOperationsInput | number
    isTemplate?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type GoodCommentListRelationFilter = {
    every?: GoodCommentWhereInput
    some?: GoodCommentWhereInput
    none?: GoodCommentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GoodCommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    openId?: SortOrder
    unionId?: SortOrder
    nickName?: SortOrder
    avatarUrl?: SortOrder
    gender?: SortOrder
    city?: SortOrder
    province?: SortOrder
    country?: SortOrder
    language?: SortOrder
    currency?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    gender?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    openId?: SortOrder
    unionId?: SortOrder
    nickName?: SortOrder
    avatarUrl?: SortOrder
    gender?: SortOrder
    city?: SortOrder
    province?: SortOrder
    country?: SortOrder
    language?: SortOrder
    currency?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    openId?: SortOrder
    unionId?: SortOrder
    nickName?: SortOrder
    avatarUrl?: SortOrder
    gender?: SortOrder
    city?: SortOrder
    province?: SortOrder
    country?: SortOrder
    language?: SortOrder
    currency?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    gender?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    keyword?: SortOrder
    icon?: SortOrder
    active_icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    use_count?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
    use_count?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    keyword?: SortOrder
    icon?: SortOrder
    active_icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    use_count?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    keyword?: SortOrder
    icon?: SortOrder
    active_icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    use_count?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
    use_count?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CategoryRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type GoodCommentCountOrderByAggregateInput = {
    id?: SortOrder
    commentId?: SortOrder
    category?: SortOrder
    categoryName?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    limit?: SortOrder
    isTemplate?: SortOrder
  }

  export type GoodCommentAvgOrderByAggregateInput = {
    id?: SortOrder
    commentId?: SortOrder
    category?: SortOrder
    limit?: SortOrder
  }

  export type GoodCommentMaxOrderByAggregateInput = {
    id?: SortOrder
    commentId?: SortOrder
    category?: SortOrder
    categoryName?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    limit?: SortOrder
    isTemplate?: SortOrder
  }

  export type GoodCommentMinOrderByAggregateInput = {
    id?: SortOrder
    commentId?: SortOrder
    category?: SortOrder
    categoryName?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    limit?: SortOrder
    isTemplate?: SortOrder
  }

  export type GoodCommentSumOrderByAggregateInput = {
    id?: SortOrder
    commentId?: SortOrder
    category?: SortOrder
    limit?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type GoodCommentCreateNestedManyWithoutUserInput = {
    create?: XOR<GoodCommentCreateWithoutUserInput, GoodCommentUncheckedCreateWithoutUserInput> | GoodCommentCreateWithoutUserInput[] | GoodCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GoodCommentCreateOrConnectWithoutUserInput | GoodCommentCreateOrConnectWithoutUserInput[]
    createMany?: GoodCommentCreateManyUserInputEnvelope
    connect?: GoodCommentWhereUniqueInput | GoodCommentWhereUniqueInput[]
  }

  export type GoodCommentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GoodCommentCreateWithoutUserInput, GoodCommentUncheckedCreateWithoutUserInput> | GoodCommentCreateWithoutUserInput[] | GoodCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GoodCommentCreateOrConnectWithoutUserInput | GoodCommentCreateOrConnectWithoutUserInput[]
    createMany?: GoodCommentCreateManyUserInputEnvelope
    connect?: GoodCommentWhereUniqueInput | GoodCommentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GoodCommentUpdateManyWithoutUserNestedInput = {
    create?: XOR<GoodCommentCreateWithoutUserInput, GoodCommentUncheckedCreateWithoutUserInput> | GoodCommentCreateWithoutUserInput[] | GoodCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GoodCommentCreateOrConnectWithoutUserInput | GoodCommentCreateOrConnectWithoutUserInput[]
    upsert?: GoodCommentUpsertWithWhereUniqueWithoutUserInput | GoodCommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GoodCommentCreateManyUserInputEnvelope
    set?: GoodCommentWhereUniqueInput | GoodCommentWhereUniqueInput[]
    disconnect?: GoodCommentWhereUniqueInput | GoodCommentWhereUniqueInput[]
    delete?: GoodCommentWhereUniqueInput | GoodCommentWhereUniqueInput[]
    connect?: GoodCommentWhereUniqueInput | GoodCommentWhereUniqueInput[]
    update?: GoodCommentUpdateWithWhereUniqueWithoutUserInput | GoodCommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GoodCommentUpdateManyWithWhereWithoutUserInput | GoodCommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GoodCommentScalarWhereInput | GoodCommentScalarWhereInput[]
  }

  export type GoodCommentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GoodCommentCreateWithoutUserInput, GoodCommentUncheckedCreateWithoutUserInput> | GoodCommentCreateWithoutUserInput[] | GoodCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GoodCommentCreateOrConnectWithoutUserInput | GoodCommentCreateOrConnectWithoutUserInput[]
    upsert?: GoodCommentUpsertWithWhereUniqueWithoutUserInput | GoodCommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GoodCommentCreateManyUserInputEnvelope
    set?: GoodCommentWhereUniqueInput | GoodCommentWhereUniqueInput[]
    disconnect?: GoodCommentWhereUniqueInput | GoodCommentWhereUniqueInput[]
    delete?: GoodCommentWhereUniqueInput | GoodCommentWhereUniqueInput[]
    connect?: GoodCommentWhereUniqueInput | GoodCommentWhereUniqueInput[]
    update?: GoodCommentUpdateWithWhereUniqueWithoutUserInput | GoodCommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GoodCommentUpdateManyWithWhereWithoutUserInput | GoodCommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GoodCommentScalarWhereInput | GoodCommentScalarWhereInput[]
  }

  export type GoodCommentCreateNestedManyWithoutCategoryCategoryInput = {
    create?: XOR<GoodCommentCreateWithoutCategoryCategoryInput, GoodCommentUncheckedCreateWithoutCategoryCategoryInput> | GoodCommentCreateWithoutCategoryCategoryInput[] | GoodCommentUncheckedCreateWithoutCategoryCategoryInput[]
    connectOrCreate?: GoodCommentCreateOrConnectWithoutCategoryCategoryInput | GoodCommentCreateOrConnectWithoutCategoryCategoryInput[]
    createMany?: GoodCommentCreateManyCategoryCategoryInputEnvelope
    connect?: GoodCommentWhereUniqueInput | GoodCommentWhereUniqueInput[]
  }

  export type GoodCommentUncheckedCreateNestedManyWithoutCategoryCategoryInput = {
    create?: XOR<GoodCommentCreateWithoutCategoryCategoryInput, GoodCommentUncheckedCreateWithoutCategoryCategoryInput> | GoodCommentCreateWithoutCategoryCategoryInput[] | GoodCommentUncheckedCreateWithoutCategoryCategoryInput[]
    connectOrCreate?: GoodCommentCreateOrConnectWithoutCategoryCategoryInput | GoodCommentCreateOrConnectWithoutCategoryCategoryInput[]
    createMany?: GoodCommentCreateManyCategoryCategoryInputEnvelope
    connect?: GoodCommentWhereUniqueInput | GoodCommentWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GoodCommentUpdateManyWithoutCategoryCategoryNestedInput = {
    create?: XOR<GoodCommentCreateWithoutCategoryCategoryInput, GoodCommentUncheckedCreateWithoutCategoryCategoryInput> | GoodCommentCreateWithoutCategoryCategoryInput[] | GoodCommentUncheckedCreateWithoutCategoryCategoryInput[]
    connectOrCreate?: GoodCommentCreateOrConnectWithoutCategoryCategoryInput | GoodCommentCreateOrConnectWithoutCategoryCategoryInput[]
    upsert?: GoodCommentUpsertWithWhereUniqueWithoutCategoryCategoryInput | GoodCommentUpsertWithWhereUniqueWithoutCategoryCategoryInput[]
    createMany?: GoodCommentCreateManyCategoryCategoryInputEnvelope
    set?: GoodCommentWhereUniqueInput | GoodCommentWhereUniqueInput[]
    disconnect?: GoodCommentWhereUniqueInput | GoodCommentWhereUniqueInput[]
    delete?: GoodCommentWhereUniqueInput | GoodCommentWhereUniqueInput[]
    connect?: GoodCommentWhereUniqueInput | GoodCommentWhereUniqueInput[]
    update?: GoodCommentUpdateWithWhereUniqueWithoutCategoryCategoryInput | GoodCommentUpdateWithWhereUniqueWithoutCategoryCategoryInput[]
    updateMany?: GoodCommentUpdateManyWithWhereWithoutCategoryCategoryInput | GoodCommentUpdateManyWithWhereWithoutCategoryCategoryInput[]
    deleteMany?: GoodCommentScalarWhereInput | GoodCommentScalarWhereInput[]
  }

  export type GoodCommentUncheckedUpdateManyWithoutCategoryCategoryNestedInput = {
    create?: XOR<GoodCommentCreateWithoutCategoryCategoryInput, GoodCommentUncheckedCreateWithoutCategoryCategoryInput> | GoodCommentCreateWithoutCategoryCategoryInput[] | GoodCommentUncheckedCreateWithoutCategoryCategoryInput[]
    connectOrCreate?: GoodCommentCreateOrConnectWithoutCategoryCategoryInput | GoodCommentCreateOrConnectWithoutCategoryCategoryInput[]
    upsert?: GoodCommentUpsertWithWhereUniqueWithoutCategoryCategoryInput | GoodCommentUpsertWithWhereUniqueWithoutCategoryCategoryInput[]
    createMany?: GoodCommentCreateManyCategoryCategoryInputEnvelope
    set?: GoodCommentWhereUniqueInput | GoodCommentWhereUniqueInput[]
    disconnect?: GoodCommentWhereUniqueInput | GoodCommentWhereUniqueInput[]
    delete?: GoodCommentWhereUniqueInput | GoodCommentWhereUniqueInput[]
    connect?: GoodCommentWhereUniqueInput | GoodCommentWhereUniqueInput[]
    update?: GoodCommentUpdateWithWhereUniqueWithoutCategoryCategoryInput | GoodCommentUpdateWithWhereUniqueWithoutCategoryCategoryInput[]
    updateMany?: GoodCommentUpdateManyWithWhereWithoutCategoryCategoryInput | GoodCommentUpdateManyWithWhereWithoutCategoryCategoryInput[]
    deleteMany?: GoodCommentScalarWhereInput | GoodCommentScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutCommentsInput = {
    create?: XOR<CategoryCreateWithoutCommentsInput, CategoryUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutCommentsInput
    connect?: CategoryWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CategoryUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<CategoryCreateWithoutCommentsInput, CategoryUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutCommentsInput
    upsert?: CategoryUpsertWithoutCommentsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutCommentsInput, CategoryUpdateWithoutCommentsInput>, CategoryUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    upsert?: UserUpsertWithoutCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommentsInput, UserUpdateWithoutCommentsInput>, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type GoodCommentCreateWithoutUserInput = {
    commentId?: number
    categoryName: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    limit: number
    isTemplate?: boolean
    categoryCategory: CategoryCreateNestedOneWithoutCommentsInput
  }

  export type GoodCommentUncheckedCreateWithoutUserInput = {
    id?: number
    commentId?: number
    category: number
    categoryName: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    limit: number
    isTemplate?: boolean
  }

  export type GoodCommentCreateOrConnectWithoutUserInput = {
    where: GoodCommentWhereUniqueInput
    create: XOR<GoodCommentCreateWithoutUserInput, GoodCommentUncheckedCreateWithoutUserInput>
  }

  export type GoodCommentCreateManyUserInputEnvelope = {
    data: GoodCommentCreateManyUserInput | GoodCommentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GoodCommentUpsertWithWhereUniqueWithoutUserInput = {
    where: GoodCommentWhereUniqueInput
    update: XOR<GoodCommentUpdateWithoutUserInput, GoodCommentUncheckedUpdateWithoutUserInput>
    create: XOR<GoodCommentCreateWithoutUserInput, GoodCommentUncheckedCreateWithoutUserInput>
  }

  export type GoodCommentUpdateWithWhereUniqueWithoutUserInput = {
    where: GoodCommentWhereUniqueInput
    data: XOR<GoodCommentUpdateWithoutUserInput, GoodCommentUncheckedUpdateWithoutUserInput>
  }

  export type GoodCommentUpdateManyWithWhereWithoutUserInput = {
    where: GoodCommentScalarWhereInput
    data: XOR<GoodCommentUpdateManyMutationInput, GoodCommentUncheckedUpdateManyWithoutUserInput>
  }

  export type GoodCommentScalarWhereInput = {
    AND?: GoodCommentScalarWhereInput | GoodCommentScalarWhereInput[]
    OR?: GoodCommentScalarWhereInput[]
    NOT?: GoodCommentScalarWhereInput | GoodCommentScalarWhereInput[]
    id?: IntFilter<"GoodComment"> | number
    commentId?: IntFilter<"GoodComment"> | number
    category?: IntFilter<"GoodComment"> | number
    categoryName?: StringFilter<"GoodComment"> | string
    content?: StringFilter<"GoodComment"> | string
    createdAt?: DateTimeFilter<"GoodComment"> | Date | string
    updatedAt?: DateTimeFilter<"GoodComment"> | Date | string
    userId?: StringFilter<"GoodComment"> | string
    limit?: IntFilter<"GoodComment"> | number
    isTemplate?: BoolFilter<"GoodComment"> | boolean
  }

  export type GoodCommentCreateWithoutCategoryCategoryInput = {
    commentId?: number
    categoryName: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    limit: number
    isTemplate?: boolean
    user: UserCreateNestedOneWithoutCommentsInput
  }

  export type GoodCommentUncheckedCreateWithoutCategoryCategoryInput = {
    id?: number
    commentId?: number
    categoryName: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    limit: number
    isTemplate?: boolean
  }

  export type GoodCommentCreateOrConnectWithoutCategoryCategoryInput = {
    where: GoodCommentWhereUniqueInput
    create: XOR<GoodCommentCreateWithoutCategoryCategoryInput, GoodCommentUncheckedCreateWithoutCategoryCategoryInput>
  }

  export type GoodCommentCreateManyCategoryCategoryInputEnvelope = {
    data: GoodCommentCreateManyCategoryCategoryInput | GoodCommentCreateManyCategoryCategoryInput[]
    skipDuplicates?: boolean
  }

  export type GoodCommentUpsertWithWhereUniqueWithoutCategoryCategoryInput = {
    where: GoodCommentWhereUniqueInput
    update: XOR<GoodCommentUpdateWithoutCategoryCategoryInput, GoodCommentUncheckedUpdateWithoutCategoryCategoryInput>
    create: XOR<GoodCommentCreateWithoutCategoryCategoryInput, GoodCommentUncheckedCreateWithoutCategoryCategoryInput>
  }

  export type GoodCommentUpdateWithWhereUniqueWithoutCategoryCategoryInput = {
    where: GoodCommentWhereUniqueInput
    data: XOR<GoodCommentUpdateWithoutCategoryCategoryInput, GoodCommentUncheckedUpdateWithoutCategoryCategoryInput>
  }

  export type GoodCommentUpdateManyWithWhereWithoutCategoryCategoryInput = {
    where: GoodCommentScalarWhereInput
    data: XOR<GoodCommentUpdateManyMutationInput, GoodCommentUncheckedUpdateManyWithoutCategoryCategoryInput>
  }

  export type CategoryCreateWithoutCommentsInput = {
    name: string
    parentId?: number | null
    keyword?: string | null
    icon?: string | null
    active_icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    use_count?: number
  }

  export type CategoryUncheckedCreateWithoutCommentsInput = {
    id?: number
    name: string
    parentId?: number | null
    keyword?: string | null
    icon?: string | null
    active_icon?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    use_count?: number
  }

  export type CategoryCreateOrConnectWithoutCommentsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutCommentsInput, CategoryUncheckedCreateWithoutCommentsInput>
  }

  export type UserCreateWithoutCommentsInput = {
    id?: string
    openId: string
    unionId?: string | null
    nickName?: string | null
    avatarUrl?: string | null
    gender?: number | null
    city?: string | null
    province?: string | null
    country?: string | null
    language?: string | null
    currency?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string
  }

  export type UserUncheckedCreateWithoutCommentsInput = {
    id?: string
    openId: string
    unionId?: string | null
    nickName?: string | null
    avatarUrl?: string | null
    gender?: number | null
    city?: string | null
    province?: string | null
    country?: string | null
    language?: string | null
    currency?: string
    timezone?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string
  }

  export type UserCreateOrConnectWithoutCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
  }

  export type CategoryUpsertWithoutCommentsInput = {
    update: XOR<CategoryUpdateWithoutCommentsInput, CategoryUncheckedUpdateWithoutCommentsInput>
    create: XOR<CategoryCreateWithoutCommentsInput, CategoryUncheckedCreateWithoutCommentsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutCommentsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutCommentsInput, CategoryUncheckedUpdateWithoutCommentsInput>
  }

  export type CategoryUpdateWithoutCommentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    keyword?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    active_icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    use_count?: IntFieldUpdateOperationsInput | number
  }

  export type CategoryUncheckedUpdateWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    keyword?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    active_icon?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    use_count?: IntFieldUpdateOperationsInput | number
  }

  export type UserUpsertWithoutCommentsInput = {
    update: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    openId?: StringFieldUpdateOperationsInput | string
    unionId?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableIntFieldUpdateOperationsInput | number | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    openId?: StringFieldUpdateOperationsInput | string
    unionId?: NullableStringFieldUpdateOperationsInput | string | null
    nickName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableIntFieldUpdateOperationsInput | number | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    timezone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoodCommentCreateManyUserInput = {
    id?: number
    commentId?: number
    category: number
    categoryName: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    limit: number
    isTemplate?: boolean
  }

  export type GoodCommentUpdateWithoutUserInput = {
    commentId?: IntFieldUpdateOperationsInput | number
    categoryName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limit?: IntFieldUpdateOperationsInput | number
    isTemplate?: BoolFieldUpdateOperationsInput | boolean
    categoryCategory?: CategoryUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type GoodCommentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    commentId?: IntFieldUpdateOperationsInput | number
    category?: IntFieldUpdateOperationsInput | number
    categoryName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limit?: IntFieldUpdateOperationsInput | number
    isTemplate?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GoodCommentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    commentId?: IntFieldUpdateOperationsInput | number
    category?: IntFieldUpdateOperationsInput | number
    categoryName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limit?: IntFieldUpdateOperationsInput | number
    isTemplate?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GoodCommentCreateManyCategoryCategoryInput = {
    id?: number
    commentId?: number
    categoryName: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    limit: number
    isTemplate?: boolean
  }

  export type GoodCommentUpdateWithoutCategoryCategoryInput = {
    commentId?: IntFieldUpdateOperationsInput | number
    categoryName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    limit?: IntFieldUpdateOperationsInput | number
    isTemplate?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type GoodCommentUncheckedUpdateWithoutCategoryCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    commentId?: IntFieldUpdateOperationsInput | number
    categoryName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    limit?: IntFieldUpdateOperationsInput | number
    isTemplate?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GoodCommentUncheckedUpdateManyWithoutCategoryCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    commentId?: IntFieldUpdateOperationsInput | number
    categoryName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    limit?: IntFieldUpdateOperationsInput | number
    isTemplate?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryCountOutputTypeDefaultArgs instead
     */
    export type CategoryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryDefaultArgs instead
     */
    export type CategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GoodCommentDefaultArgs instead
     */
    export type GoodCommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GoodCommentDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}