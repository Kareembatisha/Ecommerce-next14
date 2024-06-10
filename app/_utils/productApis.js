const axiosClient = require("./axiosClient").default; // Use the configured axios client

const getLatestProducts = () => axiosClient.get("/products?populate=*"); // علشان اجيب كل المنتجات
const getProductById = (id) => axiosClient.get(`/products/${id}?populate=*`); // عشان اجيب منتج واحد بس
const getProductByCategory = (category) =>
  axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`);

export default {
  getLatestProducts,
  getProductById,
  getProductByCategory,
};
