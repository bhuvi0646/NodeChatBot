import { LodashMethodDecorator, ResolvableFunction } from './factory';
import { MemoizeConfig } from './shared';
declare const decorator: (...args: any[]) => MethodDecorator & PropertyDecorator;
/**
 * Creates a function that memoizes the result of func. If resolver is provided,
 * it determines the cache key for storing the result based on the arguments provided to the memoized function.
 * By default, the first argument provided to the memoized function is used as the map cache key.
 * The func is invoked with the this binding of the memoized function.
 *
 * You can use a Function or a string that references a method on the class as the resolver.
 * You can also use a configuration object that lets provide a prexisting cache or specify
 * the map type to use.
 *
 * @example
 *
 * class MyClass {
 *   @Memoize({ type: WeakMap })
 *   getName(item) {
 *     return item.name;
 *   }
 *
 *   @Memoize('getName')
 *   getLastName(item) {
 *     return item.lastName;
 *   }
 * }
 */
export declare function Memoize(resolver?: ResolvableFunction | MemoizeConfig<any, any>): LodashMethodDecorator;
export { Memoize as memoize };
export default decorator;
