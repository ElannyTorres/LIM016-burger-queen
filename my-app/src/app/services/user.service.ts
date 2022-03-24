import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

   // Set data on localStorage
   setUserLoggedIn(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    console.log('saved on localStorage');
  }
  // get data on localStorage
  getUserLoggedIn() {
    if (localStorage.getItem('user') ) {
      return JSON.parse(localStorage.getItem('user')!);
    } else {
      console.log('localStorage empty');
    }
  }
  // Optional: clear localStorage
  clearLocalStorage() {
    localStorage.clear();
  }


}
