import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private currentComponentSubject = new BehaviorSubject<string>('student-home');
  currentComponent$: Observable<string> = this.currentComponentSubject.asObservable();

  setCurrentComponent(componentName: string) {
    this.currentComponentSubject.next(componentName);
  }
}
