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
    roomName: string | undefined;
    loggedIn = false;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private http: HttpClient,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
    ) {
        
        if(localStorage.getItem('loggedIn')){
            this.loggedIn = true;
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
                if(data){
                    this.roomList = data.sort((a: Room, b:Room) => 
                        new Date(<string>b.updated).getTime() - new Date(<string>a.updated).getTime()
                    );
                }
                this.isDataAvailable = true
                //trigger chat room message window
                if(data.length > 0){
                    this.roomID = data[0].id;
                    this.roomName = data[0].name;
                }
            },
            (err) => {
                console.log(err);
                //TODO something with this error
                return;
            }
        )
    }

    roomSelect(room: any){
        this.roomID = room.id;
        this.roomName = room.name;
    }

    logoutClick() {
        this.authenticationService.logout();
        this.loggedIn = false;
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
        this.createRoom(this.roomForm.value.name);

    }

    createRoom(room: string) {
        let newRoom = new Room;
        newRoom.name = room;
        newRoom.updated = new Date().toISOString();

        this.http.post<Room>(environment.baseAPIURL + "rooms", newRoom).subscribe(
            (data: Room) => {
                this.roomList.unshift(data);
                this.showCreateForm = false;
                this.roomForm.reset();
                //trigger messages component
                this.roomID = data.id;
                this.roomName = data.name;
            },
            (err) => {
                console.log(err);
                this.createError = "Room name must be unique";
            }
        )
        this.submitted = false;
        this.loading = false;
    }
    /**
     * End create chat room logic
     */
}