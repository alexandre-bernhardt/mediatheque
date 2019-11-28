import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/Book.model';
import * as firebase from 'firebase';
import { ResolveEnd } from '@angular/router';
import { reject } from 'q';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() {
    this.getBooks();
   }

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.database().ref('/books')
    .on('value', (data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    });
  }

  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(bookToRemove: Book) {
    console.log("suppression livre");
    if(bookToRemove.photo) {
      const storageRef = firebase.storage().refFromURL(bookToRemove.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimée :');
        }
      ).catch(
        (error) => {
          console.log('Fichier non trouvé : ' + error);
        }
      );
    }
    const bookIndex: number = this.books.findIndex(
      (book) => {
        console.log(book.title);
        if (book === bookToRemove) {
          console.log(">>>>>>>>>>>" + book.title);
          return true;
        }
      }
    );
    console.log(bookIndex);
    console.log(this.books.length);
    this.books.splice(bookIndex, 1);
    console.log(this.books.length);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        console.log('test date')
        console.log(almostUniqueFileName);
        console.log(firebase.storage().ref().child('images/' + almostUniqueFileName + file.name));
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Upload du fichier...');
          },
          (error) => {
            console.log(error);
            reject();
          },
          () => {
            resolve(upload.snapshot.downloadURL);
          }
        );
      }
    );
  }

}
