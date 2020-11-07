import { PluginConfigFile } from "../config/plugin.config";

interface PluginExpose {
    onLoad : () => void,
    onConfigChange: (p:PluginConfigFile) => boolean;

    beforeRequest: () => void,
    beforeResponseBody: () => void,
    afterResponse: () => void,

    onHTTP: () => void,

    // Timers and Extra events
    onMessage: (msgcode:string, info: any) => void,
}

export default PluginExpose;