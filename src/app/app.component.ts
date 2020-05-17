import { Component, OnInit } from '@angular/core';
import { ICase } from './cases';
import { TrackerService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Corona Tracker';
  cases: ICase[];
  errorMessage: string

  constructor(private trackerService: TrackerService) { }

  ngOnInit() {
    this.getCases();
  }

  getCases() {
    this.trackerService.getCases().subscribe({
      next: cases => this.cases = cases,
      error: err => this.errorMessage = err
    });
  }
}
