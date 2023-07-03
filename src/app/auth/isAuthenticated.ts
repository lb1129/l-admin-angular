import { ReplaySubject } from 'rxjs'

export default {
  value: new ReplaySubject<boolean>(1)
}
