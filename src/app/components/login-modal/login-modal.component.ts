import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  @Input() login;
  emailSignIn: string | null = null;
  passwordSignIn: string | null = null;
  emailSignUp: string | null = null;
  passwordSignUp: string | null = null;
  confirmPasswordSignUp: string | null = null;

  loginState: string | null = null;
  errorMsg: string | null = null;

  constructor(
    private authService: AuthService,
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
    this.loginState = this.login;
  }

  goTo = (login: string) => this.loginState = login;

  isEmpty = (element) => {
    return !element || element.trim() === '';
  }

  onSignIn() {
    if (this.isEmpty(this.emailSignIn) || this.isEmpty(this.passwordSignIn)) {
      return;
    }
    const user = {
      user_email: this.emailSignIn,
      user_password: this.passwordSignIn
    };
    console.warn(user);
    // TODO Add request signIn here
    // this.authService.signIn(user)
    //   .subscribe(res => console.warn(res));
  }

  onSignUp() {
    if (this.isEmpty(this.emailSignUp) || this.isEmpty(this.passwordSignUp) || this.isEmpty(this.confirmPasswordSignUp)) {
      return;
    }
    if (this.passwordSignUp !== this.confirmPasswordSignUp) {
      this.errorMsg = 'Les mots de passes ne correspondent pas';
      return;
    }
    const newUser = {
      user_email: this.emailSignUp,
      user_password: this.passwordSignUp
    };
    console.warn(newUser);
    // TODO Add request signUp here
  }
}
