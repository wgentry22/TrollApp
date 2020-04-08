import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subscription} from 'rxjs';
import {delay, take} from 'rxjs/operators';

@Component({
  selector: 'app-spinner',
  template: `
    <div *ngIf="showButton | async else troll">
      <mat-card>
        <mat-card-header>
          <mat-card-title class="full-width">Something Went Wrong <mat-icon>sentiment_very_dissatisfied</mat-icon></mat-card-title>
        </mat-card-header>
        <mat-card-actions>
          <button
            class="full-width"
            mat-raised-button
            color="warn"
            (click)="handleBugReport($event)"
          >
            Report Bug?
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
    <ng-template #troll>
      <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent implements OnInit, OnDestroy {

  initialTimeout: 1750;
  @Input() timeout = 1500;
  @Output() proceed = new EventEmitter<void>(true);
  private initialTimer: Subscription;
  private timer: any;

  private showButton$ = new BehaviorSubject<boolean>(false);

  get showButton(): Observable<boolean> {
    return this.showButton$.asObservable();
  }

  constructor() { }

  ngOnInit(): void {
    this.initialTimer = interval(this.initialTimeout).pipe(take(2), delay(500)).subscribe(num => {
      if (num > 0) {
        this.showButton$.next(true);
      }
    });
  }

  handleBugReport(event: MouseEvent): void {
    if (event) {
      event.preventDefault();
      this.proceed.emit();
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
    this.initialTimer.unsubscribe();
  }
}
