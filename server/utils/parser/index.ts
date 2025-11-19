import { Parser } from './parser.js';
import * as handlers from './handlers.js';
import * as transformers from './transformers.js';

const defaultParser = new Parser();

handlers.addDefaults(defaultParser);

export const addDefaults = handlers.addDefaults;
export const addHandler = (handlerName: string, handler: any, options?: any) =>
  defaultParser.addHandler(handlerName, handler, options);
export const parse = (title: string) => defaultParser.parse(title);
export { Parser };
export const Transformers = transformers;