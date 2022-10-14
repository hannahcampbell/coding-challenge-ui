import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';


@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    loading = false;
    submitted = false;
    signInError : string | undefined;
    userList = this.getUserList();

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
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

    getUserList() {
        const userNames = new Map();
        this.http.get(environment.baseAPIURL + 'users').subscribe(
            (data: any) => {
                data.forEach((element: { name: string; }) => {
                    userNames.set(element.name, true)
                });
            },
            (err) => {
                //TODO something with error
            }
        )
        return userNames;
    }

    validateUsername(event: any) {
        if(this.userList.has(event.target.value)) {
            //prompt user that this username i not available
            this.signInError = "This username is not available.";
            this.loading = true;
        }
        else {
            this.signInError = "";
            this.loading = false;
        }
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
        this.register(this.registerForm.value);
    }


    register(name: Object) {
        this.http.post<User>(environment.baseAPIURL + 'users/', name).subscribe(
            (data: User) => {
                localStorage.setItem('loggedIn', JSON.stringify(data));
                //redirect to chat page
                this.router.navigate(['/chat']);
            },
            (err) => {
                //set error message
                this.signInError = "Login failed. Please try a different username.";
                this.submitted = false;
                this.loading = false;
            }
        )
    }
}

