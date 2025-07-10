const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "ARmaFfbs7dozBAVeYo99Q7BwXBNKUuwwMUc4-aS4-3AX6z53Qv0HjjlpsRJN8pljxxG2E0l58uYTjImI",
  client_secret: "ECA8WfOAgUXgwS18gQvPjQROFfgToBRH-2dS8t_y0A0Et4mxTz4yL4Wrekvi2loQFNoxRmN-K9kSKubk",
});

module.exports = paypal;
