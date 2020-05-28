/* eslint-disable no-whitespace-before-property */

import * as devConsts       from './consts.dev';
import * as prodConsts      from './consts.prod';

export const consts = process.env.NODE_ENV === 'production' ? prodConsts : devConsts;
