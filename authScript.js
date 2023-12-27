
function getCodeFromUrl(url) {
    if (url.indexOf('?') !== -1) {
        const queryString = url.split('?')[1];
        const queryParams = queryString.split('&');
        for (let i = 0; i < queryParams.length; i++) {
            const param = queryParams[i].split('=');
            if (param[0] === 'code') {
                return param[1];
            }
        }
    }
    return null;
    }

    var redirect_uri = 'chrome-extension://ikjipnaemppnjilpbjjoeppflicchhld/newertab.html';
    const CLIID = "6122852fc6204d96aa75183f89110d90";

    function login() {
    var scope = 'user-read-private user-read-currently-playing';
    var authUrl = 'https://accounts.spotify.com/authorize?' +
        'response_type=code' +
        '&client_id=' + encodeURIComponent(CLIID) +
        '&scope=' + encodeURIComponent(scope) +
        '&redirect_uri=' + (redirect_uri);

    window.location.href = authUrl;
    }
    login();

    
