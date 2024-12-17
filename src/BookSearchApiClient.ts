import { XMLHttpRequest } from "xmlhttprequest"

type Book = {
  title: string,
  author: string,
  isbn: string,
  quantity: string,
  price: string,
}

class BookSearchApiClient {
  private format: "json" | "xml"

  constructor(format: "json" | "xml") {
    this.format = format;
  }

  getBooksByAuthor = (authorName: string, limit: number): Promise<Book[]> => {
    return new Promise( (resolve, reject) => {
      let result = [];
  
      // Create a new request object
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "http://api.book-seller-example.com/by-author?q=" +
          authorName +
          "&limit=" +
          limit +
          "&format=" +
          this.format
      );

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
          } else if (this.format == "xml") {
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
    
          return resolve(result)
        } else {
          return reject("Request failed. Returned status of " + xhr.status)
        }
      };

      // Hanle error
      xhr.onerror = (e) => {
        reject(`failed to request. ${e}`,)
      }
    
      // Send the request
      xhr.send();
    })  
  };
}

export default BookSearchApiClient
