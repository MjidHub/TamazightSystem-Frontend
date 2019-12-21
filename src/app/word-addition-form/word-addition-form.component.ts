import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SibmitSuccessModalComponent} from '../modals/sibmit-success-modal/sibmit-success-modal.component';
import {FeedbackModalComponent} from '../modals/feedback-modal/feedback-modal.component';

@Component({
  selector: 'app-word-addition-form',
  templateUrl: './word-addition-form.component.html',
  styleUrls: ['./word-addition-form.component.css']
})
export class WordAdditionFormComponent implements OnInit {

  newWord: Map<string, string> = new Map();
  requirements: Map< string, Array<string> > = new Map();
  keyMappings: Map<string, string> = new Map();
  types = ['Proper Noun', 'Common Noun', 'Verb', 'Adjective', 'Conjunction', 'Pronoun', 'Preposition'];
  POSTypes = ['Possessive', 'Person Free'];
  genders = ['M', 'F'];
  persons = ['1st Person', '2nd Person', '3rd Person'];
  numbers = ['Singular', 'Plural'];
  tenses = ['Past', 'Present', 'Future'];
  aspects = ['Aorist', 'Imperfect', 'Perfect Positive', 'Perfect Negative'];
  states = ['Annex', 'Free'];
  annexes = ['Yes', 'No', 'Both'];

  constructor(private myservice: AppService, private modalService: NgbModal) {
    this.keyMappings['a'] = 'ⴰ'; this.keyMappings['i'] = 'ⵉ'; this.keyMappings['b'] = 'ⴱ'; this.keyMappings['y'] = 'ⵢ';
    this.keyMappings['k'] = 'ⴽ'; this.keyMappings['3'] = 'ⵄ'; this.keyMappings['g'] = 'ⴳ'; this.keyMappings['5'] = 'ⵅ';
    this.keyMappings['d'] = 'ⴷ'; this.keyMappings['q'] = 'ⵇ'; this.keyMappings['j'] = 'ⵊ'; this.keyMappings['4'] = 'ⵖ';
    this.keyMappings['f'] = 'ⴼ'; this.keyMappings['l'] = 'ⵍ'; this.keyMappings['D'] = 'ⴹ'; this.keyMappings['z'] = 'ⵣ';
    this.keyMappings['7'] = 'ⵃ'; this.keyMappings['c'] = 'ⵛ'; this.keyMappings['h'] = 'ⵀ'; this.keyMappings['n'] = 'ⵏ';
    this.keyMappings['S'] = 'ⵚ'; this.keyMappings['s'] = 'ⵙ'; this.keyMappings['T'] = 'ⵟ'; this.keyMappings['t'] = 'ⵜ';
    this.keyMappings['r'] = 'ⵔ'; this.keyMappings['m'] = 'ⵎ'; this.keyMappings['w'] = 'ⵡ'; this.keyMappings['Z'] = 'ⵥ';
    this.keyMappings['o'] = 'ⴻ';
  }

  init() {
    this.newWord['Base Form'] = '';
    this.newWord['Radical'] = '';
    this.newWord['Type'] = 'None';
    this.newWord['POSType'] = 'None';
    this.newWord['Gender'] = 'None';
    this.newWord['Person'] = 'None';
    this.newWord['Number'] = 'None';
    this.newWord['Tense'] = 'None';
    this.newWord['Annex'] = 'None';
    this.newWord['State'] = 'None';
    this.newWord['Aspect'] = 'None';
  }
  initRequirements() {
    this.requirements['Verb'] = ['Aspect', 'Gender', 'Person', 'Number', 'Tense'];
    this.requirements['Common Noun'] = ['State', 'Gender', 'Person', 'Number'];
    this.requirements['Proper Noun'] = ['State', 'Gender', 'Person', 'Number'];
    this.requirements['Adjective'] = ['State', 'Gender', 'Number'];
    this.requirements['Pronoun'] = ['Gender', 'POSType', 'Person', 'Number'];
    this.requirements['Preposition'] = ['Annex'];
  }
  ngOnInit() {
    this.init();
    this.initRequirements();
  }
  tifinaghConversion(wordForm) {
    const example = this.newWord[wordForm];
    const idx = example.length - 1;
    if (this.keyMappings[example[idx]]) {
      const replace = example[idx];
      const regex = new RegExp(replace, 'g');
      const newstr = example.replace(regex, this.keyMappings[example[idx]]);
      this.newWord[wordForm] = newstr;
    }
  }
  updateSelection(type, selection) {
    this.newWord[type] = selection;
  }
  checkCompletion() {
    if (this.newWord['Base Form'] === '') {
      return true;
    }
    const type = this.newWord['Type'];
    let check = true;
    if (type !== 'None') {
      check = false;
      for (const requirement of this.requirements[type]) {
        if (this.newWord[requirement] === 'None') {
          check = true;
        }
      }
    }
    return check;
  }
  saveWord() {
    this.myservice.sendNewWord(this.newWord['Base Form'], this.newWord['Type'], this.newWord['Radical'],
      this.newWord['POSType'], this.newWord['Gender'], this.newWord['Person'], this.newWord['Number'], this.newWord['Tense'],
      this.newWord['Annex'], this.newWord['State'], this.newWord['Aspect']).subscribe((res) => {
        if (res['resp'] === 'All Good Ma Main') {
          const modalRef = this.modalService.open(SibmitSuccessModalComponent);
          modalRef.componentInstance.newWord = this.newWord['Base Form'];
          modalRef.result.then(() => {
            this.init();
          });
        } else {
          const nestedModalRef = this.modalService.open(FeedbackModalComponent);
          nestedModalRef.componentInstance.header = 'Warning!';
          nestedModalRef.componentInstance.content = 'Something went wrong. Please double-check your inputs before submitting';
          nestedModalRef.result.then((response) => {});
        }
    });
  }

}
