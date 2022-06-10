# sample-gift-store
A simple application that shows how to integrate Paystack into your VueJS app.

You can try out the <a href="https://doc-gift-store.netlify.app/" target="_blank">live demo</a> of the app.


## Project setup
- Clone the repo
- Open code in your IDE
- Install dependencies
```
npm install
```


## Code Structure

- api:
  This contains the backend server for the gift store. It's a standard express server with 4 routes
  1. **Create Order** - This endpoint accept order details and the unique transaction reference. The endpoint first verifies the transaction, then if it is successful, it creates an order and marks it as `paid`. If it is not, the order is set to `abandoned`
  2. **List Order** - This endpoint returns all the orders that we’ve saved to the DB, it can be used by an admin interface for viewing orders.
  3. **Create Refund** - This endpoint for the admin dashboard to call Paystack APIs to initiate a refund.
  4. **Webhook** - Lastly, there's the webhook route, the webhook route. This is the URL you set on our Paystack dashboard to receive events and notifications. When the URL receives a request, it first checks the signature header to confirm if the requests are coming from Paystack by validating the hash.
      If this is successful, then it picks the transaction reference and checks if an order has already been created with the reference, if it finds one, the status of the order is updated accordingly.
      On the other hand, if no order is found, it creates a new one and sets the status to `paid`
- src:
  - assets: This contains different gifts images
  - components: There are three components used in this app:
    - Cart: This holds a list of gifts currently available in a fictitious cart.
    - Layout: This sets base structure of the app using two columns. It holds the Cart and Receipt components.
    - Receipt: This contains a from for collecting the customer's detail. It also show the price breakdown of the user's fees
  - data: This contains a JSON file used to populate the Cart component
  - store: This is used to manage state across the Cart and Receipt component
## Start the app
- Open terminal and run command:
```
npm run serve
```
- If you are also using the sample backend, start the node server:
```
node server.js
```
