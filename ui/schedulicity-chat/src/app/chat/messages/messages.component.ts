import { Component, Input, OnInit, OnChanges, SimpleChange } from "@angular/core";
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../_models';
import { AuthenticationService } from '../../_services';

@Component({
    selector: 'app-messages',
    templateUrl: 'messages.component.html'
})

export class MessagesComponent implements OnInit, OnChanges{
    @Input() roomID!: number;
    @Input() roomName: string | undefined;
    @Input() loggedIn: boolean | undefined;
    userName = this.authenticationService.getUsername();
    userId = this.authenticationService.getUserId();
    currentRoom!: number;
    messageList: any;
    isDataAvailable = false;
    messageForm!: FormGroup;
    loading = false;

    constructor(
        private authenticationService: AuthenticationService,
        private http: HttpClient,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.messageForm = this.formBuilder.group({
            message: ['', Validators.required]
        });
    }

    ngOnChanges(val: any): void {
        if(typeof val.roomID.currentValue !== 'undefined'){
            this.currentRoom = val.roomID.currentValue;
            this.getRoomMessages();
        }
    }

    getRoomMessages() {
        return this.http.get(environment.baseAPIURL + "rooms/" + this.currentRoom + '/messages').subscribe(
            (data: any) => {
                this.messageList = this.toReadableDate(data);
                if(this.messageList.length > 50){
                    //let cut = this.messageList.length - 50;
                    //this.messageList.splice(cut);
                    this.messageList = this.messageList.slice(-50);
                }
                this.isDataAvailable = true
            },
            (err) => {
                console.log(err);
                //TODO something with this error
                return;
            }
        )
    }
    
    //TODO set date format to locale format
    toReadableDate(data: any, create?: boolean) {
        if(create) {
            data.created = formatDate(data.created, 'short', 'en_US');
        }
        else {
            for(let i = 0; i < data.length; i++) {
                data[i].created = formatDate(data[i].created, 'short', 'en_US');
            }
        }
        return data;
    }

    /**
     * Create message logic
     */

    get form() {
        return this.messageForm.controls;
    }

    onSubmit() {
        if (this.messageForm.invalid) return;

        this.loading = true;
        let newMessage = new Message();
        newMessage.content = this.messageForm.value.message;
        newMessage.roomId = this.currentRoom;
        newMessage.userId = this.userId;

        this.postRoomMessage(newMessage);
    }

    postRoomMessage(message: object) {
        this.http.post<Message>(environment.baseAPIURL + "messages", message).subscribe(
            (data: Message) => {
                data = this.toReadableDate(data, true);
                data.userName = this.userName;
                this.messageList.push(data);
                if(this.messageList.length > 50){
                    //let cut = this.messageList.length - 50;
                    //this.messageList.splice(-cut);
                    this.messageList = this.messageList.slice(-50);
                }
            },
            (err) => {
                console.log(err);
                //TODO something with this error
            }
        )
        this.messageForm.reset();
        this.loading = false;
    }

    /**
     * end create message logic
     */

}