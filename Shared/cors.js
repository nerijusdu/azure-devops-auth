module.exports = {
  prepareResponse(context) {
    context.res = {
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'OPTIONS,POST',
        'access-control-allow-headers': 'content-type'
      }
    };
  }
};
