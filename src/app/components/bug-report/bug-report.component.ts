import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-bug-report',
  template: `
    <form [formGroup]="form" class="mt-3">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Report <mat-icon>bug_report</mat-icon> directly to William</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-form-field color="warn" appearance="outline" class="full-width">
            <mat-label>Title</mat-label>
            <input type="text" matInput class="full-width" (focus)="handleTroll()" formControlName="title">
          </mat-form-field>
          <mat-form-field color="warn" appearance="outline" class="full-width">
            <mat-label>Description</mat-label>
            <textarea matInput (focus)="handleTroll()" formControlName="description"></textarea>
          </mat-form-field>
        </mat-card-content>
        <mat-card-actions align="left">
          <button mat-flat-button color="warn">Submit</button>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BugReportComponent implements OnInit {

  form: FormGroup;

  @Output() proceed = new EventEmitter(true);

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: '',
      description: ''
    });
  }

  handleTroll(): void {
    this.proceed.emit();
  }
}
