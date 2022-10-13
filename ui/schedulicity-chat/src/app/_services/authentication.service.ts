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

    /*login(username: string) {
        this.http.get<User>("http://localhost:5000/api/users/" + username).subscribe(
            (data: User) => {
                localStorage.setItem('loggedIn', JSON.stringify(data));
                return true;
            },
            (err) => {
                //TODO prompt user to retype username or register
                console.log(err);
                return false
            }
        )

    }*/

    /*register(username: string) {
        this.http
            .post(environment.baseAPIURL + 'users/', {'name': username})
            .pipe(
                map(response => {
                    return localStorage.setItem('loggedIn', JSON.stringify(response));
                }),
                catchError(err => {
                    return throwError(err);
                })
            )
    }*/

    logout() {
        localStorage.removeItem('loggedIn');
        this.router.navigate(['/login']);
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
