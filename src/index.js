'use strict';

exports.handler = (event, context, callback) => {

    // Get contents of response
    const response = event.Records[0].cf.response;
    const headers = response.headers;

    // Set new security headers
    headers['strict-transport-security'] = [{ key: 'Strict-Transport-Security', value: 'max-age= 63072000; includeSubdomains; preload' }];
    headers['x-content-type-options'] = [{ key: 'X-Content-Type-Options', value: 'nosniff' }];
    headers['x-frame-options'] = [{ key: 'X-Frame-Options', value: 'DENY' }];
    headers['x-xss-protection'] = [{ key: 'X-XSS-Protection', value: '1; mode=block' }];

    // headers['content-security-policy'] = [{ key: 'Content-Security-Policy', value: "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'" }];
    // headers['referrer-policy'] = [{ key: 'Referrer-Policy', value: 'same-origin' }];

    // Cache-Control directives
    const cacheControleDirectiveNoCache = 'no-cache';
    const cacheControleDirectiveNoStore = 'no-store';
    const cacheControleDirectivePublic = 'public';
    const cacheControleDirectivePrivate = 'private';

    // MaxAge default times
    const headerNameMaxAge = 'max-age';
    const headerValueMaxAgeHour = '3600';
    const headerValueMaxAgeDay = '86400';
    const headerValueMaxAgeMonth = '2592000';
    const headerValueMaxAgeYear = '31536000';

    // Set the max-age header, if not set.
    const headerValueMaxAge = headerValueMaxAgeDay;

    // if (!headers[headerNameMaxAge.toLowerCase()]) {
    //     headers[headerNameMaxAge.toLowerCase()] = [{
    //         key: headerNameMaxAge,
    //         value: headerValueMaxAge,
    //     }];
    // }

  // Set the Cache-Control header, if not set.
  // "max-age=86400, public"
  const headerNameCacheControl = 'Cache-Control';
  const headerValueCacheControl = cacheControleDirectivePublic + ', '
      + 'max-age=' + headerValueMaxAge;

  if (!headers[headerNameCacheControl.toLowerCase()]) {
        headers[headerNameCacheControl.toLowerCase()] = [{
            key: headerNameCacheControl,
            value: headerValueCacheControl,
        }];
    }

    const headerNameAccessControlAllowHeaders = 'Access-Control-Allow-Headers';
    const headerValueAccessControlAllowHeaders = '*';

    if (!headers[headerNameAccessControlAllowHeaders.toLowerCase()]) {
        headers[headerNameAccessControlAllowHeaders.toLowerCase()] = [{
            key: headerNameAccessControlAllowHeaders,
            value: headerValueAccessControlAllowHeaders,
        }];
    }

    const headerNameAccessControlAllowMethods = 'Access-Control-Allow-Methods';
    const headerValueAccessControlAllowMethods = 'POST, GET, OPTIONS';
    if (!headers[headerNameAccessControlAllowMethods.toLowerCase()]) {
        headers[headerNameAccessControlAllowMethods.toLowerCase()] = [{
            key: headerNameAccessControlAllowMethods,
            value: headerValueAccessControlAllowMethods,
        }];
    }

    const headerNameAccessControlAllowOrigin = 'Access-Control-Allow-Origin';
    const headerValueAccessControlAllowOrigin = '*';

    if (!headers[headerNameAccessControlAllowOrigin.toLowerCase()]) {
        headers[headerNameAccessControlAllowOrigin.toLowerCase()] = [{
            key: headerNameAccessControlAllowOrigin,
            value: headerValueAccessControlAllowOrigin,
        }];
    }

    // Return modified response
    callback(null, response);
};
