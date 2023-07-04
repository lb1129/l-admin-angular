import {
  animate,
  animateChild,
  group,
  query,
  state,
  style,
  transition,
  trigger
} from '@angular/animations'

// TODO 根据路由是前进还是后退 进行动画切换
export const slideInAnimation = trigger('routeAnimations', [
  transition('* => *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        })
      ],
      { optional: true }
    ),
    query(':enter', [style({ transform: 'translate3d(100%, 0, 0)' })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [animate('200ms ease-out', style({ transform: 'translate3d(-100%, 0, 0)', opacity: 0 }))],
        {
          optional: true
        }
      ),
      query(':enter', [animate('300ms ease-out', style({ transform: 'translate3d(0%, 0, 0)' }))], {
        optional: true
      }),
      query('@*', animateChild(), { optional: true })
    ])
  ])
])
