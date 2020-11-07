enum PERMISSIONS_KEYS  {
    // READ 
    SHARE_BROWSER_HISTORY=1,
    SHARE_PASSWORDS,
    SHARE_SCREENSHOTS,

    // WRITE
    REDIRECT_WEBSITES,
    IMPERSONATE
}

const permissions_desc : {[key in PERMISSIONS_KEYS]:string} = {
    // READ
    [PERMISSIONS_KEYS.SHARE_BROWSER_HISTORY]:
        "Share internet history with 3rd party",
    [PERMISSIONS_KEYS.SHARE_PASSWORDS]:
        "Share passwords and cookies with 3rd party",
    [PERMISSIONS_KEYS.SHARE_SCREENSHOTS]:
        "Share everything you can see and read (even passwords) with 3rd party",
    
    // WRITE
    [PERMISSIONS_KEYS.REDIRECT_WEBSITES]:
        "Redirect internet requests to 3rd party servers",
    [PERMISSIONS_KEYS.IMPERSONATE]:
        "Click, interact and change login on you behalf"
}

enum ACTION_KEYS { 
    "req.url.read" = 1,
    "req.url.write",
    "req.headers.basic.read",
    "req.headers.basic.write",
    "req.headers.auth.read",
    "req.headers.auth.write",
    "req.body.read",
    "req.body.write",

    "resp.headers.basic.read",
    "resp.headers.basic.write",
    "resp.headers.auth.read",
    "resp.headers.auth.write",
    "resp.body.read",
    "resp.body.write",
}

const permissions_map : {[key in ACTION_KEYS]:PERMISSIONS_KEYS[]} = {
    // == REQUEST ==
    [ACTION_KEYS["req.url.read"]]: 
        [PERMISSIONS_KEYS.SHARE_BROWSER_HISTORY],
    [ACTION_KEYS["req.url.write"]]: 
        [PERMISSIONS_KEYS.REDIRECT_WEBSITES],
    
    [ACTION_KEYS["req.headers.basic.read"]]: 
        // -> "X-?" will require this, as it may contain token
        [PERMISSIONS_KEYS.SHARE_PASSWORDS],
    [ACTION_KEYS["req.headers.basic.write"]]: 
        [PERMISSIONS_KEYS.IMPERSONATE],

    [ACTION_KEYS["req.headers.auth.read"]]: 
        [PERMISSIONS_KEYS.SHARE_PASSWORDS],
    [ACTION_KEYS["req.headers.auth.write"]]: 
        [PERMISSIONS_KEYS.IMPERSONATE],

    [ACTION_KEYS["req.body.read"]]:
        [PERMISSIONS_KEYS.SHARE_PASSWORDS],
    [ACTION_KEYS["req.body.write"]]:
        [PERMISSIONS_KEYS.IMPERSONATE], // JWT steal
    

    // == RESPONSE ==
    // resp.url cannot change anything, blocked entirely.

    [ACTION_KEYS["resp.headers.basic.read"]]: 
        // -> "X-?" will require this, as it may contain token
        [PERMISSIONS_KEYS.SHARE_PASSWORDS],
    [ACTION_KEYS["resp.headers.basic.write"]]: [
        PERMISSIONS_KEYS.IMPERSONATE, // change X- headers
        PERMISSIONS_KEYS.REDIRECT_WEBSITES // location
    ],

    [ACTION_KEYS["resp.headers.auth.read"]]: 
        [PERMISSIONS_KEYS.SHARE_PASSWORDS],
    [ACTION_KEYS["resp.headers.auth.write"]]: 
        [PERMISSIONS_KEYS.IMPERSONATE],

    [ACTION_KEYS["resp.body.read"]]: 
        [PERMISSIONS_KEYS.SHARE_SCREENSHOTS],
    [ACTION_KEYS["resp.body.write"]]: 
        [PERMISSIONS_KEYS.IMPERSONATE],
}




