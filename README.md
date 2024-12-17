# Javascript Code Test

`BookSearchApiClient` is a simple class that makes a call to a http API to retrieve a list of books and return them.

You need to refactor the `BookSearchApiClient` class, and demonstrate in `example-client.js` how it would be used. Refactor to what you consider to be production ready code. You can change it in anyway you would like and can use javascript or typescript.

Things you will be asked about:

1. How could you easily add other book seller APIs in the the future
2. How would you manage differences in response payloads between different APIs without needing to make future changes to whatever code you have in example-client.js
3. How would you implement different query types for example: by publisher, by year published etc
4. How your code would be tested

# Notes
`node --version` : v18.12.0

1. Use ESModules (because familiarity) 
2. I do indeed want typing here, so I will convert to TS

## Set up
1. Ensure ts installed, `npm i typescript`
2. Add a `tsconfig.json`
3. `npm i xmlhttprequest`

## Refactor BookSearchApiClient.js
1. Fix the reference to module.exports = "GetBookListApiClient" to use ESModules `export default <ClassName>` (`BookSearchApiClient` not `GetBookListApiClient`)
2. Use `()=>{}` func format to use the same `this` context
3. Use promises

## Refacctor example-client.js
1. Add a example-client.ts, and run with `tsc && node ./dist/example-client.js` (use `npm start`)
2. Refactor with ESModules

## Clean up
1. Add `node_modules` to gitignore