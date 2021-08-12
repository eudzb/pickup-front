import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SearchReplacementComponent} from '../../components/search-replacement/search-replacement.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  searchReplacement() {
    this.modalService.open(SearchReplacementComponent, {
      centered: true,
      modalDialogClass: 'custom-modal'
    });
  }
}
