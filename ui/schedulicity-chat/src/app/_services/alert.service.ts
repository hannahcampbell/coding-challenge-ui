import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService{
    private subject = new Subject<any>();

    constructor() {}

    success(message: string) {
        this.subject.next({type: 'success', text: message});
    }

    error(message: string){
        this.subject.next({type: 'error', text: message});
    }


}