enum EXTRA_PERMISSIONS_KEYS {
    LOCK_PC=1,
    CLOSE_PROGRAMS,
    SHUTDOWN,
    SHARE_LOCATION,
}

const ext_permissions_desc : {[key in EXTRA_PERMISSIONS_KEYS]:string} = {
    [EXTRA_PERMISSIONS_KEYS.LOCK_PC]:
        "Lock non-admin users out of the PC",
    [EXTRA_PERMISSIONS_KEYS.CLOSE_PROGRAMS]:
        "Close non-admin programs forcefully",
    [EXTRA_PERMISSIONS_KEYS.SHUTDOWN]:
        "Force the computer to shutdown",
    [EXTRA_PERMISSIONS_KEYS.SHARE_LOCATION]:
        "Share location with 3rd party",
}

enum EXTRA_ACTION_KEYS { 
    "extra.lock"=1,
    "extra.kill",
    "extra.shutdown",
    "extra.wifi.read",
}

const extra_permissions_map : 
    {[key in EXTRA_ACTION_KEYS]:EXTRA_PERMISSIONS_KEYS[]} = 
{
    [EXTRA_ACTION_KEYS["extra.lock"]] : 
        [EXTRA_PERMISSIONS_KEYS.LOCK_PC],

    [EXTRA_ACTION_KEYS["extra.kill"]] : 
        [EXTRA_PERMISSIONS_KEYS.CLOSE_PROGRAMS],

    [EXTRA_ACTION_KEYS["extra.shutdown"]]: 
        [EXTRA_PERMISSIONS_KEYS.SHUTDOWN],

    [EXTRA_ACTION_KEYS["extra.wifi.read"]]: 
        [EXTRA_PERMISSIONS_KEYS.SHARE_LOCATION]
}


