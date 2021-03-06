/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

import Socket from './socket-base';
import WS from 'ws';

Socket.getWebSocketConstructor = function getWebSocketConstructor() {
  return WS;
};

export default Socket;
