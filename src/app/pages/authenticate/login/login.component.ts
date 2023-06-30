import { Component } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  form!: UntypedFormGroup

  constructor(private fb: UntypedFormBuilder) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submitHandler() {
    if (this.form.valid) {
      const value = this.form.value
      console.log(value)
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty()
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
    }
  }
}
