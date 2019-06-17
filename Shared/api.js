const fetch = require("node-fetch");

module.exports = async (config) => {
  const response = {
    success: true,
    data: null
  };

  try {
    const result = await fetch(config.url, config);
    response.data = await result.json();
    if (!result.ok || result.status !== 200) {
      throw new Error(`Failed request with status ${result.status}`);
    }
  } catch (e) {
    response.success = false;
    response.error = e.message;
  }

  return response;
};
