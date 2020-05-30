import { Component, OnInit } from '@angular/core';
import { ICase } from './cases';
import { TrackerService } from './app.service';
import {RouterModule} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Corona Tracker';
  cases: ICase[];
  errorMessage: string;
  sortOrder: string = "DESC";
  todaysDate: Date;
  showModal: boolean;
  imageUrls:[string];

   constructor(private trackerService: TrackerService) { }

  ngOnInit() {
    this.getCases();
    this.todaysDate = new Date();
  }

  show(imgUrls:[string])
  {
    this.showModal = true; // Show-Hide Modal Check
    this.imageUrls = imgUrls;
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }

  getCases() {
    this.trackerService.getCases().subscribe({
      next: cases => { this.cases = cases; this.sortCases("total"); },
      error: err => this.errorMessage = err
    });
  }

  setSortClass(): string {
    return this.sortOrder == 'ASC' ? 'fa fa-sort-down' : 'fa fa-sort-up';
  }

  sortCases<T>(propName: keyof ICase): void {
    this.cases.sort((a, b) => {
      if (a[propName] < b[propName])
        return -1;
      if (a[propName] > b[propName])
        return 1;
      return 0;
    });

    if (this.sortOrder === "DESC") {
      this.cases.reverse();
      this.sortOrder = "ASC";
    } else {
      this.sortOrder = "DESC";
    }
  }
}
