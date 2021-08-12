import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginModalComponent} from '../login-modal/login-modal.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  openLogin() {
    const modalRef = this.modalService.open(LoginModalComponent, {
      centered: true,
      modalDialogClass: 'custom-modal'
    });
    modalRef.componentInstance.login = 'signIn';
  }

  openCreateAccount() {
    const modalRef = this.modalService.open(LoginModalComponent, {
      centered: true,
      modalDialogClass: 'custom-modal'
    });
    modalRef.componentInstance.login = 'signUp';
  }
}
