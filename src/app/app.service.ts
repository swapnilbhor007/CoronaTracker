import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { ICase } from "./cases";

@Injectable({
  providedIn: "root",
})
export class TrackerService {

  //lastUpdated: Date;

  constructor(private httpClient: HttpClient) {}

  //private dataUrl = 'assets/data/cases.json';

  //private dataUrl = 'https://api.npoint.io/632184653ada90515889';

  private dataUrl =
    "https://spreadsheets.google.com/feeds/list/165B08xhYYPwByiVJy8-_zjQKU9qi5gzBN7e6hiRwMNs/od6/public/values?alt=json";

  getCases(): Observable<ICase[]> {
    return this.httpClient.get<ICase[]>(this.dataUrl).pipe(
      map(data => this.parseObject(data)),
     //tap((data) => console.log("Cases:" + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      errorMessage = `Client side or Network Error Occured ${err.error.message}`;
    } else {
      errorMessage = `Server returned code ${err.status}, error message ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

 parseObject(obj) : any {
  // this.lastUpdated = obj.feed.updated.$t;
    var obj1 = obj.feed.entry;
    var str = "[";
    for (var i=0; i < obj1.length; i++) {
    str = str + "{" + obj1[i].content.$t + "},";
    }
    str = str.slice(0,-1);
    str = str + "]";
    str = this.formatHeaders(str);
     //console.log("data : " + str);
    return JSON.parse(str);
  }

  formatHeaders(str: string) : string{
    str = str.replace(/location/g,'"location"');
    str = str.replace(/newcases/g,'"newcases"');
    str = str.replace(/total/g,'"total"');
    str = str.replace(new RegExp("\\bnewdeaths\\b", 'g'),'"newdeaths"');
    str = str.replace(new RegExp("\\bdeaths\\b", 'g'),'"deaths"');
    str = str.replace(new RegExp("\\bnewrecovered\\b", 'g'),'"newrecovered"');
    str = str.replace(new RegExp("\\brecovered\\b", 'g'),'"recovered"');
    str = str.replace(/active/g,'"active"');
    str = str.replace(new RegExp("\\bnewtests\\b", 'g'),'"newtests"');
    str = str.replace(new RegExp("\\btests\\b", 'g'),'"tests"');
    str = str.replace(/source/g,'"source"');    
    return str;
  }
}
