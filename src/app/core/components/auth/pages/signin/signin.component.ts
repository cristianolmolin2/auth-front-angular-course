import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  formAuth: FormGroup = this.fb.group({
    email: ['', Validators.compose([Validators.email, Validators.required])],
    password: ['', Validators.required]
  });

  msgError!: string;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  login() {
    if (this.formAuth.valid) {
      this.authService.login(this.formAuth.getRawValue()).subscribe({
        next: (res) => res,
        error: (e) => (this.msgError = e)
      });
    }
  }

}
