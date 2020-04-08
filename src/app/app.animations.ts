import {animate, animateChild, group, state, style, transition, trigger} from '@angular/animations';

export const letsRoll = trigger('letsRoll', [
  transition(':enter', [
    group([
      group([
        style({ opacity: 0 }),
        animate('2500ms ease-in', style({ opacity: 1 }))
      ]),
      style({ transform: 'translateY(150%)' }),
      animate('6500ms ease-in', style({ transform: 'translateY(0)' })),
    ])
  ]),
]);

export const fadeOut = trigger('fadeOut', [
  transition(':leave', [
    group([
      style({ opacity: 1 }),
      animate('600ms', style({ opacity: 0 })),
      animateChild()
    ])
  ])
]);
