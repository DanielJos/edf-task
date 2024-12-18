import BookSearchApiClient from "./BookSearchApiClient.js";
const fetchBooks = async () => {
    const client = new BookSearchApiClient("json");
    try {
        const booksByShakespeare = await client.getBooksByAuthor("Shakespeare", 10);
        console.log(booksByShakespeare);
    }
    catch (e) {
        console.error("error getting books by author.", e);
    }
};
fetchBooks();
setTimeout(() => {
    console.log("Exiting after demo timeout...");
    process.exit(0);
}, 5000);
//# sourceMappingURL=example-client.js.map