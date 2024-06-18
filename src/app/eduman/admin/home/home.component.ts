import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { SidebarComponent } from '../sidebar/sidebar.component';
// import { HeadertwoComponent } from '../../common/header/headertwo/headertwo.component';
import { EdumanModule } from '../../eduman.module';
// import { HeadertwoComponent } from '../../common/header/headertwo/headertwo.component';
// import { FooteroneComponent } from '../../common/footer/footerone/footerone.component';


@Component({
  selector: 'app-home',
  // imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
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

