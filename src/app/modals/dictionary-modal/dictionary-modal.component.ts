import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dictionary-modal',
  templateUrl: './dictionary-modal.component.html',
  styleUrls: ['./dictionary-modal.component.css']
})
export class DictionaryModalComponent implements OnInit {

  numberOfExamples: number;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }
  checkNumber() {
    if (this.numberOfExamples < 0) {
      this.numberOfExamples = 0;
    } else if (this.numberOfExamples > 10) {
      this.numberOfExamples = 10;
    }
  }
  confirm() {
    this.activeModal.close(this.numberOfExamples);
  }
  close() {
    this.activeModal.close(0);
  }

}
