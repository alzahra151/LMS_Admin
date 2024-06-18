import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eduman';
  platformId: Object
  constructor(private router: Router, @Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
        window.scrollTo(0, 0)
      }

    });
  }
}
