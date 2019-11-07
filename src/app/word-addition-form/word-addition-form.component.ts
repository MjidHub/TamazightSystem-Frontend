import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-word-addition-form',
  templateUrl: './word-addition-form.component.html',
  styleUrls: ['./word-addition-form.component.css']
})
export class WordAdditionFormComponent implements OnInit {

  types = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Conjunction'];
  genders = ['M', 'F', 'MF', 'None'];
  persons = ['1st Person', '2nd Person', '3rd Person'];
  numbers = ['Singular', 'Plural'];
  tenses = ['Past', 'Present', 'Future'];
  wordType = 'None';
  wordGender = 'None';
  wordPerson = 'None';
  wordNumber = 'None';
  wordTense = 'None';

  constructor() { }

  ngOnInit() {
  }
  updateSelection(type, selection) {
    if (type === 'type') {
      this.wordType = selection;
    }
    if (type === 'gender') {
      this.wordGender = selection;
    }
    if (type === 'person') {
      this.wordPerson = selection;
    }
    if (type === 'number') {
      this.wordNumber = selection;
    }
    if (type === 'tense') {
      this.wordTense = selection;
    }
  }
  checkCompletion() {
    return (this.wordType === 'None' || this.wordGender === 'None' || this.wordPerson === 'None' || this.wordNumber === 'None'
      || this.wordTense === 'None');
  }
  saveWord() {
  }


}
