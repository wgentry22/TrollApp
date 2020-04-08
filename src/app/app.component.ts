import {AfterContentInit, AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, interval, Observable} from 'rxjs';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {delay, filter, map, take, tap} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';
import {fadeOut} from './app.animations';
import {TrollComponent} from './components/troll/troll.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-spinner
        class="loading mb-3"
        *ngIf="show$ | async else commenceTrolling"
        (proceed)="showBugReport()"
      >
      </app-spinner>
      <ng-template #commenceTrolling>
        <app-bug-report *ngIf="(commence$ | async) === false" @fadeOut ></app-bug-report>
        <app-troll *ngIf="commence$ | async" [troll]="safeResourceUrl"></app-troll>
      </ng-template>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
  animations: [ fadeOut ]
})
export class AppComponent implements OnInit {
  title = 'troll';
  troll = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&showinfo=0&autohide=1';
  safeResourceUrl: SafeResourceUrl;
  private _show$ = new BehaviorSubject<boolean>(true);
  private _commence$ = new BehaviorSubject<boolean>(false);

  get commence$(): Observable<boolean> {
    return this._commence$.asObservable();
  }

  constructor(
    private domSanitizer: DomSanitizer,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit(): void {
    this.safeResourceUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.troll);
  }

  showBugReport(): void {
    this._show$.next(false);
    this.proceedWithTroll();
  }

  private proceedWithTroll(): void {
    interval(1250).pipe(take(2), delay(500), filter(num => num > 0)).subscribe(() => {
      this.doc.body.style.backgroundImage = "url('assets/background.webp')";
      this._commence$.next(true);
    });
  }

  get show$(): Observable<boolean> {
    return this._show$.asObservable();
  }
}
