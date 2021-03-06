const qs = require('querystring');
const api = require('../Shared/api');
const cors = require('../Shared/cors');

module.exports = async (context, req) => {
    context.log(`Request to GetAccessToken ${req.method}`);

    cors.prepareResponse(context);
    if (req.method.toLowerCase() === 'options') {
      return;
    }

    if (!req.body || !req.body.code || !req.body.callbackUrl) {
      context.res.body = {
        success: false,
        message: 'Please provide refresh token and callback url'
      };
      return;
    }

    const result = await api({
      method: 'POST',
      url: 'https://app.vssps.visualstudio.com/oauth2/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: qs.stringify({
        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        client_assertion: process.env["AzureAppSecret"],
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: req.body.code,
        redirect_uri: req.body.callbackUrl
      })
    });

    context.res.body = result;
};