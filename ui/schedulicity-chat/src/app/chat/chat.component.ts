import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Room } from '../_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({templateUrl: 'chat.component.html'})
export class ChatComponent implements OnInit {
    userName = this.authenticationService.getUsername();
    roomList: any;
    isDataAvailable = false;
    showCreateForm = false;
    roomForm!: FormGroup;
    submitted = false;
    createError: string | undefined;
    loading = false;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private http: HttpClient,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
    ) {
        //redirect if not logged in
        if(!localStorage.getItem('loggedIn')){
            this.router.navigate(['/login']);
        }
    }

    ngOnInit() {
        this.getRoomList();
        this.roomForm = this.formBuilder.group({
            name: ['', Validators.required]
        });
    }

    getRoomList() {
        return this.http.get(environment.baseAPIURL + 'rooms/').subscribe(
            (data: any) => {
                console.log(data);
                this.roomList = data.reverse();
                this.isDataAvailable = true
            },
            (err) => {
                console.log(err);
                //TODO something with this error
                return;
            }
        )
    }

    get form() {
        return this.roomForm.controls;
    }

    createClick() {
        this.showCreateForm = true;
    }

    onSubmit() {
        this.submitted = true;

        if (this.roomForm.invalid) return;

        this.loading = true;
        this.createRoom(this.roomForm.value);

    }

    createRoom(room: object) {
        //validate form
        this.http.post<Room>(environment.baseAPIURL + "rooms", room).subscribe(
            (data: Room) => {
                this.roomList.unshift(data);
                this.showCreateForm = false;
                this.submitted = false;
                this.loading = false;
                //TODO clear form
                //TODO trigger new room chat window
            },
            (err) => {
                console.log(err);
                this.createError = "Room name must be unique";
                this.submitted = false;
                this.loading = false;
            }
        )
    }

    cancelCreate() {
        this.showCreateForm = false;
    }

    logoutClick() {
        this.authenticationService.logout();
    }
}