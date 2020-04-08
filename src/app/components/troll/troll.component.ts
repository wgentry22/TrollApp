import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SafeResourceUrl} from '@angular/platform-browser';
import {letsRoll} from '../../app.animations';

@Component({
  selector: 'app-troll',
  template: `
    <mat-card @letsRoll>
      <div class="embed-responsive embed-responsive-16by9">
        <iframe
          class="embed-responsive-item troll-player"
          [src]="troll"
          allow="autoplay;"
          allowfullscreen
          frameborder="0"
          playsinline
          #player
        >
        </iframe>
      </div>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ letsRoll ]
})
export class TrollComponent implements OnInit, OnChanges {

  @Input() troll: SafeResourceUrl;

  constructor() {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      const change = changes[prop];
      if (prop === 'troll' && change && change.currentValue) {
        this.troll = change.currentValue;
      }
    }
  }


}
