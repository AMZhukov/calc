import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    testEnvironment: 'jsdom',
    "moduleNameMapper": {
        "\\.(css|less|scss)$": "identity-obj-proxy"
    }
};
module.exports = config;
