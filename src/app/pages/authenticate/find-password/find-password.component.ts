import { Component } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-find-password',
  templateUrl: './find-password.component.html',
  styleUrls: ['./find-password.component.less']
})
export class FindPasswordComponent {
  form!: UntypedFormGroup

  constructor(private fb: UntypedFormBuilder) {
    this.form = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.required],
      code: ['', Validators.required]
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
