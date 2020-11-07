type PluginNativeValue = string  | boolean | string[];
type PluginConfigItem = {"desc": string, "val": PluginNativeValue}

type PluginSetting = PluginConfigItem 
    |  {"title": string, "nodes": Array<PluginConfigItem> }
export type PluginConfigFile = {[key:string]:PluginSetting}

export const SampleConfig: PluginConfigFile = {
    "_url" : {desc: "PleaseEnter URL", val: "dsadas"},
    "_domains": {"title": "The domains",nodes: [
        {desc: "Allow it?", val: false},
        {desc: "Enter text", val: ""},
        {desc: "Domains", val: ["aaa","dsadas"]},
    ]}
}

