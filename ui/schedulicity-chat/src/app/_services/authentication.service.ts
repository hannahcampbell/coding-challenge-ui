import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthenticationService{
    errorMsg: string | undefined;

    constructor(
    ) {}

    getLoggedInUser() {
        return localStorage.getItem('loggedIn');
    }

    logout() {
        localStorage.removeItem('loggedIn');
    }

    getUsername() {
        let loginData = this.getLoggedInUser();
        if(loginData){
            let data = JSON.parse(loginData);
            return data.name;
        }
        return null;
    }

    getUserId() {
        let loginData = this.getLoggedInUser();
        if(loginData){
            let data = JSON.parse(loginData);
            return data.id;
        }
    }
}
