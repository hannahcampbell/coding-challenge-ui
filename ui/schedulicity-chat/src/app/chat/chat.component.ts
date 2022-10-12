import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';

@Component({templateUrl: 'chat.component.html'})
export class ChatComponent implements OnInit {
    userName = this.authenticationService.getUsername();

    constructor(
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit() {}

    logoutClick(){
        this.authenticationService.logout();
    }
}