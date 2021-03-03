const fetch = require("node-fetch");

const nodeFetch = async (url, options) => {
  try {
    const response = await fetch(url, options);

    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
  }
};

export default nodeFetch;
