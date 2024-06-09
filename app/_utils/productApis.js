const axiosClient = require("./axiosClient").default; // Use the configured axios client

const getLatestProducts = () => axiosClient.get("/products?populate=*");

export default {
  getLatestProducts,
};
