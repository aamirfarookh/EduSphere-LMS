import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ContentService } from '../content.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-student-dash',
  templateUrl: './student-dash.component.html',
  styleUrls: ['./student-dash.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateX(-100%)',
        })
      ),
      transition('open <=> closed', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class Dashboard implements OnInit {
  isSidebarOpen = false;
  currentComponent: string = 'student-home';

  constructor(private contentService: ContentService, private router:Router) {}

  ngOnInit() {
    this.contentService.currentComponent$.subscribe((componentName) => {
      this.currentComponent = componentName;
    });
  }

  changeContent(componentName: string) {
    this.contentService.setCurrentComponent(componentName);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  logout() {
    localStorage.removeItem('access_token')
    this.router.navigate(['/home'])
  }
}

// #A1rq@hfwj123
