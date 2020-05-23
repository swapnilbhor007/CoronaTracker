import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators'
import { ICase } from './cases';

@Injectable({
    providedIn: 'root'
})

export class TrackerService {

    constructor(private httpClient: HttpClient) { }

    //private dataUrl = 'assets/data/cases.json';

    private dataUrl = 'https://api.npoint.io/f47d4c27a7c5d72f962c';

    getCases(): Observable<ICase[]> {
        return this.httpClient.get<ICase[]>(this.dataUrl).pipe(
           // map((cases: ICase[]) => cases.filter(t => new Date(t.recordDate).toDateString() == new Date().toDateString())),
            //tap(data => console.log('Treks:' + JSON.stringify(data))),
            catchError(this.handleError)
        )
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `Client side or Network Error Occured ${err.error.message}`;
        }
        else {
            errorMessage = `Server returned code ${err.status}, error message ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}