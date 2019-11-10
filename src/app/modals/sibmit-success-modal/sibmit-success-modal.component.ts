import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sibmit-success-modal',
  templateUrl: './sibmit-success-modal.component.html',
  styleUrls: ['./sibmit-success-modal.component.css']
})
export class SibmitSuccessModalComponent implements OnInit {
  @Input() newWord;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  close() {
    this.activeModal.close();
  }

}
