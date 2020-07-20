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
- For a sample backend, you can also clone this [repo](https://github.com/PaystackOSS/sample-backend). The backend is only available in Node.

## Code Structure
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
