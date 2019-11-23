import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mediatheque';

  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyB95brqRIHBujK2-oltS1E_3oZfGPZ3YBE",
      authDomain: "mediatheque-79484.firebaseapp.com",
      databaseURL: "https://mediatheque-79484.firebaseio.com",
      projectId: "mediatheque-79484",
      storageBucket: "mediatheque-79484.appspot.com",
      messagingSenderId: "732113379173",
      appId: "1:732113379173:web:211f8651693df547940b8c",
      measurementId: "G-WY9X89XXPC"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // firebase.analytics();
  
  }

}

