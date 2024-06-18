import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  // standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
