/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

import {registerPlugin} from '@ciscospark/spark-core';

import Rooms from './rooms';

registerPlugin('rooms', Rooms);

export default Rooms;
