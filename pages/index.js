const axios = require("axios");

const API_KEY = "YOUR_API_KEY";
const SEARCH_QUERY = "iphone12";
const AMAZON_ASSOCIATE_TAG = "best2best07";

axios.get(`https://shoppingapis.googleapis.com/shopping/search/v1/public/products?key=${API_KEY}&country=US&q=${SEARCH_QUERY}`)
  .then(response => {
    let products = response.data.products;

    products.sort((a, b) => a.price - b.price);

    products.forEach(product => {
      const sellerName = product.seller.name;
      const price = product.price;
      const imageURL = product.imageLink;
      let productURL = product.link;

      if (sellerName === "Amazon") {
        productURL = `https://www.amazon.com/dp/${product.productId}/?tag=${AMAZON_ASSOCIATE_TAG}`;
      }

      console.log(`
        <div>
          <img src="${imageURL}" alt="${product.title}" />
          <p>Seller: ${sellerName} | Price: ${price}</p>
          <a href="${productURL}" target="_blank">Buy now</a>
        </div>
      `);
    });
  })
  .catch(error => {
    console.error(error);
  });


  