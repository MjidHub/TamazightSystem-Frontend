import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-you-sure-modal',
  templateUrl: './you-sure-modal.component.html',
  styleUrls: ['./you-sure-modal.component.css']
})
export class YouSureModalComponent implements OnInit {
  @Input() sentence;
  @Input() verdict;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  close(choice) {
    this.activeModal.close(choice);
  }

}
