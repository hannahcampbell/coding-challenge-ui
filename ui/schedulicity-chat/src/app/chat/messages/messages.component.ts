import { Component, Input, OnInit, OnChanges, SimpleChange } from "@angular/core";
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-messages',
    templateUrl: 'messages.component.html'
})

export class MessagesComponent implements OnInit, OnChanges{
    
    @Input() roomID!: number;
    @Input() userName!: string;
    currentRoom!: number;
    messageList: any;
    isDataAvailable = false;

    constructor(
        private http: HttpClient,
    ) {}

    ngOnInit() {}

    ngOnChanges(val: any): void {
        if(typeof val.roomID.currentValue !== 'undefined'){
            this.currentRoom = val.roomID.currentValue;
            this.getRoomMessages();
        }
    }

    getRoomMessages() {
        return this.http.get(environment.baseAPIURL + "rooms/" + this.currentRoom + '/messages').subscribe(
            (data: any) => {
                this.messageList = this.toReadableDate(data.splice(50));
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
    toReadableDate(data: any) {
        for(let i = 0; i < data.length; i++){
            data[i].created = formatDate(data[i].created, 'short', 'en_US');
        }
        return data;
    }

    postRoomMessage() {

    }

}