'use strict';

exports.handler = (event, context, callback) => {
    // only media starts with /media, all other are /static



    // Get contents of request + response
    const request = event.Records[0].cf.request;
    const response = event.Records[0].cf.response;
    const headers = response.headers;

    let cacheControleDirective;
    let headerValueMaxAge;

    // Set new security headers
    headers['strict-transport-security'] = [{ key: 'Strict-Transport-Security', value: 'max-age= 63072000; includeSubdomains; preload' }];
    headers['x-content-type-options'] = [{ key: 'X-Content-Type-Options', value: 'nosniff' }];
    headers['x-frame-options'] = [{ key: 'X-Frame-Options', value: 'DENY' }];
    headers['x-xss-protection'] = [{ key: 'X-XSS-Protection', value: '1; mode=block' }];

    // Cache-Control directives
    const cacheControleDirectiveNoCache = 'no-cache';
    const cacheControleDirectiveNoStore = 'no-store';
    const cacheControleDirectivePublic = 'public';
    const cacheControleDirectivePrivate = 'private';

    // MaxAge default times
    const headerNameMaxAge = 'max-age';
    const headerValueMaxAgeZero = '0';
    const headerValueMaxAgeHour = '3600';
    const headerValueMaxAgeDay = '86400';
    const headerValueMaxAgeMonth = '2592000';
    const headerValueMaxAgeYear = '31536000';

    if (typeof request === 'undefined') {
        cacheControleDirective = cacheControleDirectiveNoStore;
        headerValueMaxAge = headerValueMaxAgeZero;
        // "no-store, max-age=0"
    } else if (request.uri.startsWith('/media/mgs/css')) {
        cacheControleDirective = cacheControleDirectiveNoCache;
        headerValueMaxAge = headerValueMaxAgeHour;
        // "no-cache, max-age=3600"
    } else if (request.uri.startsWith('/media')) {
        cacheControleDirective = cacheControleDirectivePublic;
        headerValueMaxAge = headerValueMaxAgeMonth;
        // "public, max-age=2592000"
    }  else if (request.uri.startsWith('/_cache/merged')) {
        cacheControleDirective = cacheControleDirectivePublic;
        headerValueMaxAge = headerValueMaxAgeYear;
        // "public, max-age=31536000"
    } else if (request.uri.startsWith('/frontend/Mgs/ninth/nl_NL/fonts')) {
        cacheControleDirective = cacheControleDirectivePublic;
        headerValueMaxAge = headerValueMaxAgeYear;
        // "public, max-age=31536000"
    } else if (request.uri.startsWith('/frontend')) {
        cacheControleDirective = cacheControleDirectivePublic;
        headerValueMaxAge = headerValueMaxAgeDay;
        // "public, max-age=86400"
    } else {
        cacheControleDirective = cacheControleDirectiveNoCache;
        headerValueMaxAge = headerValueMaxAgeDay;
        // "no-cache, max-age=86400"
    }

    // Set the Cache-Control header, if not set.
    const headerNameCacheControl = 'Cache-Control';
    const headerValueCacheControl = cacheControleDirective + ', '
        + 'max-age=' + headerValueMaxAge;

    // console.log('headerValueCacheControl', headerValueCacheControl);
    headers[headerNameCacheControl.toLowerCase()] = [{
        key: headerNameCacheControl,
        value: headerValueCacheControl,
    }];

    // if (!headers[headerNameCacheControl.toLowerCase()]) {
    //     headers[headerNameCacheControl.toLowerCase()] = [{
    //         key: headerNameCacheControl,
    //         value: headerValueCacheControl,
    //     }];
    // }

    const headerNameAccessControlAllowOrigin = 'Access-Control-Allow-Origin';
    const headerValueAccessControlAllowOrigin = '*';
    if (!headers[headerNameAccessControlAllowOrigin.toLowerCase()]) {
        headers[headerNameAccessControlAllowOrigin.toLowerCase()] = [{
            key: headerNameAccessControlAllowOrigin,
            value: headerValueAccessControlAllowOrigin,
        }];
    }

    // const headerNameAccessControlAllowHeaders = 'Access-Control-Allow-Headers';
    // const headerValueAccessControlAllowHeaders = '*';
    // if (!headers[headerNameAccessControlAllowHeaders.toLowerCase()]) {
    //     headers[headerNameAccessControlAllowHeaders.toLowerCase()] = [{
    //         key: headerNameAccessControlAllowHeaders,
    //         value: headerValueAccessControlAllowHeaders,
    //     }];
    // }

    // const headerNameAccessControlAllowMethods = 'Access-Control-Allow-Methods';
    // const headerValueAccessControlAllowMethods = 'POST, GET, OPTIONS';
    // if (!headers[headerNameAccessControlAllowMethods.toLowerCase()]) {
    //     headers[headerNameAccessControlAllowMethods.toLowerCase()] = [{
    //         key: headerNameAccessControlAllowMethods,
    //         value: headerValueAccessControlAllowMethods,
    //     }];
    // }

    // Return modified response
    callback(null, response);
};
