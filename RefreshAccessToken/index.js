const qs = require('querystring');
const api = require('../Shared/api');

module.exports = async (context, req) => {
    context.log('Request to RefreshAccessToken');

    if (!req.body || !req.body.refreshToken || !req.body.callbackUrl) {
      context.res = {
        body: {
          success: false,
          message: 'Please provide refresh token and callback url'
        }
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
        grant_type: 'refresh_token',
        assertion: req.body.refreshToken,
        redirect_uri: req.body.callbackUrl
      })
    });

    context.res = {
      body: result
    }
};