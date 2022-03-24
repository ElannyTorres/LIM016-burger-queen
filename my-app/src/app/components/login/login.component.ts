import { Component, OnInit } from '@angular/core';
import { faCrown, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { UserService }from '../../services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public listUsers: any[] = [];
  faCrow = faCrown;
  faUser = faUserGroup;

  
   loginForm = {
    email:  '',
    password: ''
  }

  public user = {
    id: '',
    email:'',
    name: '',
    role: '',
  
  }

  constructor(
    private authService: AuthService,
    private dataService : DataService,
    private fireStoreService : FirestoreService,
    private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
  }

  Login(){
   const {email,password} = this.loginForm;
    this.authService.login(email,password).then(res =>{
      //* Peticion Colección de usuarios
      //! capturar el id
      console.log(res?.user?.uid);
      this.fireStoreService.getUsers(res?.user?.uid).subscribe(data => {
        this.user ={
          id: data.id,
          email: data.get('email'),
          name: data.get('name'),
          role: data.get('role'),
        }
        this.userService.setUserLoggedIn(this.user);
      });
      this.Role();
    });    
  }

  

  Role() {
    console.log(this.userService.getUserLoggedIn());
    const objUser = this.userService.getUserLoggedIn();
    console.log(objUser.role);
    if(objUser.role === 'chef') {
          this.router.navigateByUrl("/chef");
    } else if (objUser.role === 'waiter') {
          this.router.navigateByUrl("/waiter")
    }
    
  }

}
