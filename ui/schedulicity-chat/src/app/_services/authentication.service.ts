import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { User } from '../_models';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SelectControlValueAccessor } from '@angular/forms';
//import * as internal from 'stream';

@Injectable({ providedIn: 'root' })
export class AuthenticationService{
    private loggedIn: Observable<User> | undefined;
    errorMsg: string | undefined;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    getLoggedInUser() {
        return localStorage.getItem('loggedIn');
    }

    logout() {
        localStorage.removeItem('loggedIn');
    }

    getUsername() {
        let loginData = localStorage.getItem('loggedIn');
        if(loginData){
            let data = JSON.parse(loginData);
            return data.name;
        }
        return null;
    }

    getUserId() {
        let loginData = localStorage.getItem('loggedIn');
        if(loginData){
            let data = JSON.parse(loginData);
            return data.id;
        }
    }
}
