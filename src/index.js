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

    // Set the max-age header, if not set.
    const headerNameMaxAge = 'max-age';
    const headerValueMaxAge = '3600';
    // const headerValueMaxAge = '86400';

    if (!headers[headerNameMaxAge.toLowerCase()]) {
        headers[headerNameMaxAge.toLowerCase()] = [{
            key: headerNameMaxAge,
            value: headerValueMaxAge,
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

