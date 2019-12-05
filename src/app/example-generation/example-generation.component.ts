import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {RemoveChoiceModalComponent} from '../modals/remove-choice-modal/remove-choice-modal.component';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {DictionaryModalComponent} from '../modals/dictionary-modal/dictionary-modal.component';
import { AppService } from '../app.service';

@Component({
  selector: 'app-example-generation',
  templateUrl: './example-generation.component.html',
  styleUrls: ['./example-generation.component.css']
})
export class ExampleGenerationComponent implements OnInit {

  generateSentence = false;
  userInput = false;
  options = [];
  words: Map<string, Array<string>> = new Map();
  keyMappings: Map<string, string> = new Map();

  generatedSentences = ['ⵡⵍⵜⵎⴰ ⵜⴳⴰ ⵜⴰⵟⴱⵉⴱⵜ',
    'ⵏⴽⴽ ⴳⵉⵖ ⴰⵟⴱⵉⴱ',
    'ⵏⴽⴽ ⵔⵉⵖ ⵜⴰⵎⴰⵣⵉⵔⵜ'];

  patternOptions = ['Pronoun', 'Proper Noun', 'Common Noun', 'Verb', 'Adjective', 'Conjunction', 'Punctuation', 'Preposition'];
  initPattern = ['Pronoun', 'Proper Noun', 'Common Noun', 'Verb', 'Adjective', 'Adverb', 'Conjunction'];
  public boxForm: FormGroup;
  modalOptions: NgbModalOptions;
  arrayItems: {
    example: number;
    pattern: string;
  }[];

  constructor(private myservice: AppService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.boxForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
    this.keyMappings['a'] = 'ⴰ'; this.keyMappings['i'] = 'ⵉ'; this.keyMappings['b'] = 'ⴱ'; this.keyMappings['y'] = 'ⵢ';
    this.keyMappings['k'] = 'ⴽ'; this.keyMappings['3'] = 'ⵄ'; this.keyMappings['g'] = 'ⴳ'; this.keyMappings['5'] = 'ⵅ';
    this.keyMappings['d'] = 'ⴷ'; this.keyMappings['q'] = 'ⵇ'; this.keyMappings['j'] = 'ⵊ'; this.keyMappings['4'] = 'ⵖ';
    this.keyMappings['f'] = 'ⴼ'; this.keyMappings['l'] = 'ⵍ'; this.keyMappings['D'] = 'ⴹ'; this.keyMappings['z'] = 'ⵣ';
    this.keyMappings['7'] = 'ⵃ'; this.keyMappings['c'] = 'ⵛ'; this.keyMappings['h'] = 'ⵀ'; this.keyMappings['n'] = 'ⵏ';
    this.keyMappings['S'] = 'ⵚ'; this.keyMappings['s'] = 'ⵙ'; this.keyMappings['T'] = 'ⵟ'; this.keyMappings['t'] = 'ⵜ';
    this.keyMappings['r'] = 'ⵔ'; this.keyMappings['m'] = 'ⵎ'; this.keyMappings['w'] = 'ⵡ'; this.keyMappings['Z'] = 'ⵥ';
    this.words['Verb'] = [];
    this.words['Common Noun'] = [];
    this.words['Proper Noun'] = [];
    this.words['Adjective'] = [];
    this.words['Conjunction'] = [];
    this.words['Punctuation'] = [
      ',', '.', '!', '?'
    ];
    this.words['Pronoun'] = [];
    this.words['Preposition'] = [];
  }

  ngOnInit(): void {
    this.arrayItems = [];
    this.myservice.getDictionary().subscribe((res) => {
      this.words['Conjunction'] = res.conj;
      this.words['Adjective'] = res.adj;
      this.words['Common Noun'] = res.cn;
      this.words['Proper Noun'] = res.pn;
      this.words['Verb'] = res.v;
      this.words['Pronoun'] = res.pron;
      this.words['preposition'] = res.prep;
    });
  }

  createBox(chosen, initstr): FormGroup {
    return this.formBuilder.group({
      example: [initstr, [Validators.required]],
      pattern: [chosen, [Validators.required]]
    });
  }

  get items(): FormArray {
    return this.boxForm.get('items') as FormArray;
  }
  tifinaghConversion(index) {
    const example = this.items.controls[index].value.example;
    const idx = example.length - 1;
    if (this.keyMappings[example[idx]]) {
      const replace = example[idx];
      const regex = new RegExp(replace, 'g');
      const newstr = this.items.controls[index].value.example.replace(regex, this.keyMappings[example[idx]]);
      this.items.controls[index].get('example').setValue(newstr);
      this.items.controls[index].get('example').updateValueAndValidity();
    }
  }
  addPattern(index) {
    this.items.insert(index, this.createBox('None', ''));
    this.options.splice(index, 0, []);
  }
  removePattern(index) {
    const modalRef = this.modalService.open(RemoveChoiceModalComponent);
    modalRef.result.then((userResponse) => {
      if (userResponse === 'yes') {
        this.items.removeAt(index);
        this.options.splice(index, 1);
      }
    });
  }
  activateUserInput() {
    this.userInput = true;
  }
  updatePattern(selected, index) {
    const newWords = this.myservice.getNewWords(selected);
    if (newWords.length > 0) {
      for (const word of newWords) {
        this.words[selected].push(word);
      }
    }
    if (this.items.controls[index].value.pattern !== selected) {
      this.items.removeAt(index);
      this.items.insert(index, this.createBox(selected, ''));
      this.options.splice(index, 1, this.words[selected]);
    }
  }
  generate() {
    const modalRef = this.modalService.open(DictionaryModalComponent);
    modalRef.result.then((userResponse) => {
      if (userResponse) {
        this.generateSentence = true;
      }
    });
  }
  submitExample(verdict) {
    const example = this.items.controls.values()['example'];
    const pattern = this.items.controls.values()['pattern'];
    this.myservice.sendSentence(pattern, example, verdict);
    console.log(verdict);
  }
  judge(index, verdict) {
    const example = this.generatedSentences[index];
    const pattern = this.items.controls.values()['pattern'];
    this.myservice.sendSentence(pattern, example, verdict);
    console.log(verdict);
  }

}
