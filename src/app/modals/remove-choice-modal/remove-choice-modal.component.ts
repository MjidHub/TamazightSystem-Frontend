import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-remove-choice-modal',
  templateUrl: './remove-choice-modal.component.html',
  styleUrls: ['./remove-choice-modal.component.css']
})
export class RemoveChoiceModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  close(choice) {
    this.activeModal.close(choice);
  }

}
