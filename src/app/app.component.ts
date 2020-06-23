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
  errorMessage: string;
  sortOrder: string = "DESC";
  lastUpdated: Date;
  showModal: boolean;
  imageUrls: [string] = [""];
  slideIndex: number = 1;

  constructor(private trackerService: TrackerService) { }

  ngOnInit() {
    this.getCases();
    this.lastUpdated = new Date();
  }

  show(imgUrls: [string]) {
    this.showModal = true;
    this.imageUrls = imgUrls;
    //this.slideIndex = 1;
  }

  hide() {
    this.showModal = false;
    //this.slideIndex = 1;
  }

  moveSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  showSlides(n) {
    var slides = document.getElementsByClassName("carousel-item");

    if (n > slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = slides.length }

    for (var i = 0; i < slides.length; i++) {
      slides[i].className = slides[i].className.replace(" active", "");
    }
    //console.log("slide index: ", this.slideIndex);
    slides[this.slideIndex - 1].className += " active";
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
