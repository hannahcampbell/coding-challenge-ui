import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'schedulicity-chat';
  

  constructor(
    private router: Router,
    
  ){
    //redirect if not logged in
    if(!localStorage.getItem('loggedIn')){
      this.router.navigate(['/login']);
    }
    else{
      this.router.navigate(['/chat']);
    }
  }

}
