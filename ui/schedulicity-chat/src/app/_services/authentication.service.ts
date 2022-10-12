import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { User } from '../_models';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
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

    login(username: string) {
        // let response = this.http.get('http://localhost:5000/api/users/dove').subscribe();
        // console.log(response);
        this.http.get<User>("http://localhost:5000/api/users/" + username).subscribe((data: User) => {
            console.log(data)
        })

    }

    /*login(user: User) {
        this.http.get(environment.baseAPIURL + 'users/' + user).pipe(map(response => {
            //login is successful, set local storage
            localStorage.setItem('loggedIn', JSON.stringify(response));
            console.log(response);
            })
        ).subscribe();
    }*/

    /*login(username: string) {
        this.http.get(environment.baseAPIURL + 'users/' + username).pipe(map(response => {
            //login is successful, set local storage
            if(response && response.hasOwnProperty('id')){
                localStorage.setItem('loggedIn', JSON.stringify(response));
                console.log(localStorage.getItem('loggedIn'));
            }
            //login unsuccessful
            else{
                console.log(response);
            }
        }));
    }*/

    // login(username: string){
    //     let response = this.http.get(environment.baseAPIURL + 'users/' + username).pipe(map(response => {
    //         localStorage.setItem('loggedIn', JSON.stringify(response));
    //         console.log(localStorage.getItem('loggedIn'));
    //         return response;
    //     }));
    // }

    register(username: string) {
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
    }

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
}
