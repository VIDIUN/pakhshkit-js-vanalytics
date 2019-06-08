// @flow
import {registerPlugin} from 'pakhshkit-js';
import VAnalytics from './vanalytics';

declare var __VERSION__: string;
declare var __NAME__: string;

export default VAnalytics;
export {__VERSION__ as VERSION, __NAME__ as NAME};

const pluginName = 'vanalytics';
/**
 * Register the plugin in the pakhshkit-js plugin framework.
 */
registerPlugin(pluginName, VAnalytics);
