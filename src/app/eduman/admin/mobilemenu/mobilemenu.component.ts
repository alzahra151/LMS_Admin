import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
  ViewEncapsulation,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut, INavbarData } from './helper';
import { navbarData } from './nav-data';
import { isPlatformBrowser } from '@angular/common';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-mobilemenu',
  templateUrl: './mobilemenu.component.html',
  styleUrls: ['./mobilemenu.component.scss'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
  encapsulation: ViewEncapsulation.None
})
export class MobilemenuComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  multiple: boolean = false;
  platformId: Object
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  constructor(public router: Router, @Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      this.screenWidth = window.innerWidth;

    }
  }

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }

}
