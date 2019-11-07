import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dictionary-modal',
  templateUrl: './dictionary-modal.component.html',
  styleUrls: ['./dictionary-modal.component.css']
})
export class DictionaryModalComponent implements OnInit {

  @Input() myModalTitle;
  @Input() myModalContent;
  words = ['Maryouma', 'cat', 'dog', 'Simpson', 'occur', 'capital', 'Omar', 'table', 'hamburger'];
  punctuations = [',', ';', '.', '?', '!', ':'];
  partsOS = ['Adjectives', 'Adverbs', 'Conjunctions', 'Interjections', 'Nouns', 'Prepositions', 'Pronouns', 'Verbs'];

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }
  close(selected) {
    this.activeModal.close(selected);
  }

}
