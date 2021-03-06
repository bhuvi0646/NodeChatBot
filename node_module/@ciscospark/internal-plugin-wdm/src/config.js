/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

import {inBrowser} from '@ciscospark/common';

export default {
  device: {
    preDiscoveryServices: {
      wdmServiceUrl: process.env.WDM_SERVICE_URL || 'https://wdm-a.wbx2.com/wdm/api/v1',
      hydraServiceUrl: process.env.HYDRA_SERVICE_URL || 'https://api.ciscospark.com/v1'
    },
    defaults: {
      name: process.title || inBrowser && 'browser' || 'javascript',
      deviceType: 'UNKNOWN'
    },
    enableInactivityEnforcement: false,
    /**
     * When true, device registrations will include a ttl value of
     * {@link config.device.ephemeralDeviceTTL} and refresh on an interval of
     * {@link config.device.ephemeralDeviceTTL}/2+60 seconds
     * @type {boolean}
     */
    ephemeral: false,

    /**
     * TTL value to include in device registration if
     * {@link config.device.ephemeral} is true. Measured in seconds.
     * @type {boolean}
     */
    ephemeralDeviceTTL: 30 * 60
  }
};
