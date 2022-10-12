import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services';
import { first } from 'rxjs/operators';


@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    returnUrl!: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,

        private http: HttpClient,
    ){
        if(localStorage.getItem('loggedIn')){
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    //get form field
    get form() {
        return this.loginForm.controls;
    }

    onSubmit() {
        //this.submitted = true;

        if(this.loginForm.invalid){
            return;
        }

        //this.http.get('http://localhost:5000/api/users/dove').subscribe();

        //this.loading = true;
        this.authenticationService.login(this.form.username.value);
    }

}