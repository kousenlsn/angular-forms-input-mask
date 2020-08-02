import { trigger, transition, animate, style, AnimationTriggerMetadata, query, stagger, animateChild } from '@angular/animations';

export const demoAppAnimations: AnimationTriggerMetadata[] = [
  trigger('slide', [
    transition(':enter', [
      style({
        transformOrigin: 'top',
        transform: 'scaleY(0.5)',
        height: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
        opacity: 0,
        overflow: 'hidden',
      }),
      animate('250ms ease-in',
        style({
          transform: 'scaleY(1)',
          height: '*',
          paddingTop: '*',
          paddingBottom: '*',
          opacity: 1,
        })
      )
    ]),
    transition(':leave', [
      style({
        transformOrigin: 'top',
        height: '*',
        paddingTop: '*',
        paddingBottom: '*',
        opacity: 1,
      }),
      animate('250ms ease-out',
       style({
         transform: 'scaleY(0.5)',
         height: '0px',
         paddingTop: '0px',
         paddingBottom: '0px',
         opacity: 0,
       })
      )
    ])
  ]),

  trigger('zoomed', [
    transition(':enter', [
      style({
        opacity: 0,
      }),
      animate('250ms ease-in',
        style({
          opacity: 1,
        })
      )
    ]),
    transition(':leave', [
      animate('250ms ease-out',
       style({
         opacity: 0,
       })
      )
    ])
  ]),
]