import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;

  constructor() { }

  toggleSideBar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  goToLinkedIn() {
    window.open('https://www.linkedin.com/in/mustapha-aouas-7918a214b/', '_blank');
  }

  goToHome() {

  }

  ngOnInit() {
  }

}
