import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SibmitSuccessModalComponent} from '../modals/sibmit-success-modal/sibmit-success-modal.component';

@Component({
  selector: 'app-word-addition-form',
  templateUrl: './word-addition-form.component.html',
  styleUrls: ['./word-addition-form.component.css']
})
export class WordAdditionFormComponent implements OnInit {

  newWord: Map<string, string> = new Map();
  types = ['Proper Noun', 'Common Noun', 'Verb', 'Adjective', 'Conjunction', 'Pronoun', 'Preposition', 'Punctuation'];
  genders = ['M', 'F', 'MF', 'None'];
  persons = ['1st Person', '2nd Person', '3rd Person'];
  numbers = ['Singular', 'Plural'];
  tenses = ['Past', 'Present', 'Future'];
  aspects = [];
  states = [];
  radicals = [];
  annexes = [];

  constructor(private myservice: AppService, private modalService: NgbModal) { }

  init() {
    this.newWord['Full Form'] = '';
    this.newWord['Type'] = 'None';
    this.newWord['Gender'] = 'None';
    this.newWord['Person'] = 'None';
    this.newWord['Number'] = 'None';
    this.newWord['Tense'] = 'None';
    this.newWord['Annex'] = 'None';
    this.newWord['State'] = 'None';
    this.newWord['Radical'] = 'None';
    this.newWord['Aspect'] = 'None';
  }
  ngOnInit() {
    this.init();
  }
  updateSelection(type, selection) {
    this.newWord[type] = selection;
  }
  checkCompletion() {
    return (this.newWord['Type'] === 'None' || this.newWord['Gender'] === 'None' || this.newWord['Person'] === 'None'
      || this.newWord['Number'] === 'None' || this.newWord['Tense'] === 'None' || this.newWord['State'] === 'None'
      || this.newWord['Aspect'] === 'None' || this.newWord['Radical'] === 'None' || this.newWord['Annex'] === 'None'
      || this.newWord['Base Form'] === '');
  }
  saveWord() {
    console.log(this.newWord);
    this.myservice.sendNewWord(this.newWord['Type'], this.newWord['Base Form']);
    const modalRef = this.modalService.open(SibmitSuccessModalComponent);
    modalRef.componentInstance.newWord = this.newWord['Base Form'];
    modalRef.result.then(() => {
      this.init();
    });
  }

}
