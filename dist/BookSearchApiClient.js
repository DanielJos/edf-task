import { XMLHttpRequest } from "xmlhttprequest";
class BookSearchApiClient {
    constructor(format) {
        this.getBooksByAuthor = (authorName, limit) => {
            return new Promise((resolve, reject) => {
                let result = [];
                // Create a new request object
                let xhr = new XMLHttpRequest();
                xhr.open("GET", "http://api.book-seller-example.com/by-author?q=" +
                    authorName +
                    "&limit=" +
                    limit +
                    "&format=" +
                    this.format);
                // `on load` of the request do the following
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        if (this.format == "json") {
                            const json = JSON.parse(xhr.responseText);
                            result = json.map(function (item) {
                                return {
                                    title: item.book.title,
                                    author: item.book.author,
                                    isbn: item.book.isbn,
                                    quantity: item.stock.quantity,
                                    price: item.stock.price,
                                };
                            });
                        }
                        else if (this.format == "xml") {
                            const xml = xhr.responseXML;
                            result = xml.documentElement.childNodes.map(function (item) {
                                return {
                                    title: item.childNodes[0].childNodes[0].nodeValue,
                                    author: item.childNodes[0].childNodes[1].nodeValue,
                                    isbn: item.childNodes[0].childNodes[2].nodeValue,
                                    quantity: item.childNodes[1].childNodes[0].nodeValue,
                                    price: item.childNodes[1].childNodes[1].nodeValue,
                                };
                            });
                        }
                        return resolve(result);
                    }
                    else {
                        return reject("Request failed. Returned status of " + xhr.status);
                    }
                };
                // TODO: handle request error
                // Send the request
                xhr.send();
            });
        };
        this.format = format;
    }
}
export default BookSearchApiClient;
//# sourceMappingURL=BookSearchApiClient.js.map