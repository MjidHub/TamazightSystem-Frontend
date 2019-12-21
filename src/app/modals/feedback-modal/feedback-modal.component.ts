import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.css']
})
export class FeedbackModalComponent implements OnInit {
  @Input() header;
  @Input() content;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  close(choice) {
    this.activeModal.close(choice);
  }

}
