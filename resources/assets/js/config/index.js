const DEV = false

const webUrl = 'https://samarnmitr-preorder.localhost/'
const apiUrl = webUrl + 'api/'
const baseUrl = ''

function url(p) {
    return apiUrl + p
}

function route(p) {
    return baseUrl + p
}

function web(p) {
    return webUrl + p
}

export default {
    title: process.env.MIX_APP_NAME,
    dev: DEV,
    appBaseUrl: baseUrl,
    webUrl: webUrl,
    apiUrl: apiUrl,
    auth: {
        client_id: 2,
        client_secret: 'So0jA7FNsiuCuAdZXmhMkue8ri6fBo8jPMpavsZq',
        grant_type: 'password'
    },
    route: route
}
