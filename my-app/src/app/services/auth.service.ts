import { Injectable, NgZone } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

   user:  User = {};

  constructor(
    // public user: User,
    private ngZone: NgZone,
    public afauth: AngularFireAuth,
    private router: Router,
    public userservice: UserService) { 

      this.checkLocalStorage();
  }

  checkLocalStorage() {
    if (!localStorage.getItem('user')) {
      this.getDataFromFirebase();
    } else {
      console.log('localStorage ready!');
    }
  }

  getDataFromFirebase() {
    this.afauth.authState.subscribe(auth => {
      if (auth) {
        this.user = auth; // save data firebase on user
        console.log('Authenticated');
        this.userservice.setUserLoggedIn(this.user); // set user data from firebase on local storage
      } else {
        console.log('Not authenticated');
      }
    });
  }

    async login(email: string, password:string){
      try {
        //?Guardar en una variable
        return await this.afauth.signInWithEmailAndPassword(email,password);
        //? Peticion a user con uid
      }catch (err) {
        console.log("error en login: ", err);
        return null;
      }
    }

    getUserLogged(){
      return this.afauth.authState;
    }

    logOut(){
      this.userservice.clearLocalStorage();
      this.afauth.signOut().then(() => {
        this.router.navigate(['login']);
      });
  
    }

}
