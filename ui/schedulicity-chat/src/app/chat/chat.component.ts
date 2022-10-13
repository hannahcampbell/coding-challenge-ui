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
    roomID!: number;

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
                //trigger chat room message window
                if(data.length > 0){
                    this.roomID = data[0].id;
                }
            },
            (err) => {
                console.log(err);
                //TODO something with this error
                return;
            }
        )
    }

    logoutClick() {
        this.authenticationService.logout();
    }

    /**
     * Create chat room logic
     */
    get form() {
        return this.roomForm.controls;
    }

    createClick() {
        if(this.showCreateForm){
            this.showCreateForm = false;
        }
        else{
            this.showCreateForm = true;
        }
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
                //trigger chat room window
                this.roomID = data.id;
                //TODO clear form
            },
            (err) => {
                console.log(err);
                this.createError = "Room name must be unique";
                this.submitted = false;
                this.loading = false;
            }
        )
    }
    /**
     * End create chat room logic
     */
}