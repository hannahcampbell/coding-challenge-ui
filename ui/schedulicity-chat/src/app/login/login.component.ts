import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { User } from '../_models';


@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    signInError : string | undefined;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private http: HttpClient,
    ){
        if(localStorage.getItem('loggedIn')){
            this.router.navigate(['/chat']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required]
        });
    }

    //get form field
    get form() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        if(this.loginForm.invalid){
            return;
        }
        this.loading = true;
        this.login(this.form.username.value);
    }

    login(username: string) {
        this.http.get<User>(environment.baseAPIURL + 'users/' + username).subscribe(
            (data: User) => {
                localStorage.setItem('loggedIn', JSON.stringify(data));
                //redirect to chat page
                this.router.navigate(['/chat']);
            },
            (err) => {
                //set error message
                this.signInError = "Login failed. Please correct your username or register.";
                this.submitted = false;
                this.loading = false;
            }
        )
    }
}