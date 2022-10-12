import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, AuthenticationService } from '../_services';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';


@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    loading = false;
    submitted = false;
    signInError : string | undefined;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private http: HttpClient,
    ) {
        //redirect if logged in
        if(localStorage.getItem('loggedIn')){
            this.router.navigate(['/chat']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required]
        });
    }

    get form() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }
        
        this.loading = true;
        //this.authenticationService.register(this.registerForm.value);
        this.register(this.registerForm.value);
    }

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

    register(name: Object) {
        console.log(name);

        this.http.post<User>("http://localhost:5000/api/users/", name).subscribe(
            (data: User) => {
                localStorage.setItem('loggedIn', JSON.stringify(data));
                //redirect to chat page
                this.router.navigate(['/chat']);
            },
            (err) => {
                console.log(err);
                //set error message
                this.signInError = "Login failed. Please try a different username.";
                this.submitted = false;
                this.loading = false;
            }
        )
    }
}

