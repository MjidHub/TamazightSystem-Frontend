import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {RemoveChoiceModalComponent} from '../modals/remove-choice-modal/remove-choice-modal.component';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {DictionaryModalComponent} from '../modals/dictionary-modal/dictionary-modal.component';
import { AppService } from '../app.service';
import {YouSureModalComponent} from '../modals/you-sure-modal/you-sure-modal.component';
import {FeedbackModalComponent} from '../modals/feedback-modal/feedback-modal.component';

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

  generatedSentences = [];
  sentencesToReturn = [];

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
    this.keyMappings['o'] = 'ⴻ';
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
      let newArr = [];
      this.words['Conjunction'] = res.conj;
      this.words['Conjunction'].forEach((item, index) => {
        if (newArr.findIndex(i => i === item) === -1) {
          newArr.push(item);
        }
      });
      this.words['Conjunction'] = newArr;

      this.words['Adjective'] = res.adj;
      newArr = [];
      this.words['Adjective'].forEach((item, index) => {
        if (newArr.findIndex(i => i === item) === -1) {
          newArr.push(item);
        }
      });
      this.words['Adjective'] = newArr;

      this.words['Common Noun'] = res.cn;
      newArr = [];
      this.words['Common Noun'].forEach((item, index) => {
        if (newArr.findIndex(i => i === item) === -1) {
          newArr.push(item);
        }
      });
      this.words['Common Noun'] = newArr;

      this.words['Proper Noun'] = res.pn;
      newArr = [];
      this.words['Proper Noun'].forEach((item, index) => {
        if (newArr.findIndex(i => i === item) === -1) {
          newArr.push(item);
        }
      });
      this.words['Proper Noun'] = newArr;

      this.words['Verb'] = res.v;
      newArr = [];
      this.words['Verb'].forEach((item, index) => {

        if (newArr.findIndex(i => i === item) === -1) {
          newArr.push(item);
        }
      });
      this.words['Verb'] = newArr;

      this.words['Pronoun'] = res.pron;
      newArr = [];
      this.words['Pronoun'].forEach((item, index) => {
        if (newArr.findIndex(i => i === item) === -1) {
          newArr.push(item);
        }
      });
      this.words['Pronoun'] = newArr;

      this.words['Preposition'] = res.prep;
      newArr = [];
      this.words['Preposition'].forEach((item, index) => {
        if (newArr.findIndex(i => i === item) === -1) {
          newArr.push(item);
        }
      });
      this.words['Preposition'] = newArr;
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
        if (!this.words[selected].includes(word)) {
          this.words[selected].push(word);
        }
      }
    }
    if (this.items.controls[index].value.pattern !== selected) {
      this.items.removeAt(index);
      this.items.insert(index, this.createBox(selected, ''));
      this.options.splice(index, 1, this.words[selected]);
    }
  }
  generate() {
    const pattern = [];
    this.generatedSentences = [];
    this.sentencesToReturn = [];
    let allsgood = true;
    for (const control of this.items.controls) {
      if (control.value.pattern === 'None') {
        allsgood = false;
        break;
      }
      pattern.push(control.value.pattern);
    }
    if (allsgood) {
      const modalRef = this.modalService.open(DictionaryModalComponent);
      modalRef.result.then((userResponse) => {
        if (userResponse) {
          this.myservice.generateSentences(pattern, userResponse).subscribe( res => {
            if (res['response'] === 'Not Trained Yet') {
              const nestedModalRef = this.modalService.open(FeedbackModalComponent);
              nestedModalRef.componentInstance.header = 'New Pattern Alert';
              nestedModalRef.componentInstance.content = 'This pattern is new. Please start with a positive example for a the training process to take place';
              nestedModalRef.result.then((response) => {});
            } else {
              if (res['sentences'].length > 0) {
                for (const sentence of res['sentences']) {
                  let s = '';
                  for (const word of sentence) {
                    s += word + ' ';
                  }
                  this.generatedSentences.push(s);
                  this.sentencesToReturn.push(sentence);
                }
                this.generateSentence = true;
              } else {
                const nestedModalRef = this.modalService.open(FeedbackModalComponent);
                nestedModalRef.componentInstance.header = 'Insufficient Data';
                nestedModalRef.componentInstance.content = "There aren't enough words to generate sentences for this pattern. Add some words to the dictionary to proceed";
                nestedModalRef.result.then((response) => {});
              }
            }
          });
        }
      });
    } else {
      const modalRef = this.modalService.open(FeedbackModalComponent);
      modalRef.componentInstance.header = 'Input Incomplete';
      modalRef.componentInstance.content = 'All added pattern fields are required, please fill them or delete the empty ones before submitting your example';
      modalRef.result.then((response) => {});
    }
  }
  submitExample(verdict) {
    console.log(verdict);
    const example = [];
    const pattern = [];
    let allsgood = true;
    let forbiddenword = '';
    let soughtpattern = '';
    let s = '';
    for (const control of this.items.controls) {
      if (control.value.pattern === 'None' || (this.userInput && control.value.example === '')) {
        allsgood = false;
        break;
      }
      if (!this.words[control.value.pattern].includes(control.value.example)) {
        forbiddenword = control.value.example;
        soughtpattern = control.value.pattern;
        break;
      }
      example.push(control.value.example);
      pattern.push(control.value.pattern);
      s += control.value.example + ' ';
    }
    if (allsgood && (forbiddenword === '')) {
      const modalRef = this.modalService.open(YouSureModalComponent);
      modalRef.componentInstance.sentence = s;
      if (verdict === 'yes') {
        modalRef.componentInstance.verdict = 'correct';
      } else {
        modalRef.componentInstance.verdict = 'wrong';
      }
      modalRef.result.then((userResponse) => {
        if (userResponse === 'yes') {
          console.log(example, pattern, verdict);
          this.myservice.sendSentence(pattern, example, verdict).subscribe(res => {
            if (res['resp'] === 'Not trained yet') {
              const nestedModalRef = this.modalService.open(FeedbackModalComponent);
              nestedModalRef.componentInstance.header = 'New Pattern Alert';
              nestedModalRef.componentInstance.content = 'This pattern is new. Please start with a positive example for the training process to take place';
              nestedModalRef.result.then((response) => {});
            } else if (res['resp'] === 'Tudo Bem') {
              const nestedModalRef = this.modalService.open(FeedbackModalComponent);
              nestedModalRef.componentInstance.header = 'Submitted Successfully';
              nestedModalRef.componentInstance.content = 'Your example has been submitted successfully';
              nestedModalRef.result.then((response) => {
                for (let i = 0; i < this.items.controls.length; i++) {
                  this.items.controls[i].get('example').setValue('');
                  this.items.controls[i].get('example').updateValueAndValidity();
                }
              });
            } else {
              const nestedModalRef = this.modalService.open(FeedbackModalComponent);
              nestedModalRef.componentInstance.header = 'Warning!';
              nestedModalRef.componentInstance.content = 'Something went wrong. Please double-check your inputs before submitting';
              nestedModalRef.result.then((response) => {});
            }
          });
          console.log(verdict);
        }
      });
    } else if (!allsgood) {
      const nestedModalRef = this.modalService.open(FeedbackModalComponent);
      nestedModalRef.componentInstance.header = 'Input Incomplete';
      nestedModalRef.componentInstance.content = 'All added pattern and sentence input fields are required, please fill them or delete the empty ones before submitting your example';
      nestedModalRef.result.then((response) => {});
    } else {
      const nestedModalRef = this.modalService.open(FeedbackModalComponent);
      nestedModalRef.componentInstance.header = 'Input Incomplete';
      nestedModalRef.componentInstance.content = forbiddenword + ' is not a ' + soughtpattern + '. Please enter a valid ' + soughtpattern + ' or add this new one to the dictionary';
      nestedModalRef.result.then((response) => {});
    }
  }
  judge(index, verdict) {
    console.log(verdict);
    const example = this.sentencesToReturn[index];
    const pattern = [];
    let patternisfine = true;
    for (const control of this.items.controls) {
      if (control.value.pattern === 'None') {
        patternisfine = false;
        break;
      }
      pattern.push(control.value.pattern);
    }
    if (patternisfine) {
      // ARE YOU SURE YOU WANT TO SUBMIT THIS AS A RIGHT OR WRONG EXAMPLE
      const modalRef = this.modalService.open(YouSureModalComponent);
      modalRef.componentInstance.sentence = this.generatedSentences[index];
      if (verdict === 'yes') {
        modalRef.componentInstance.verdict = 'correct';
      } else {
        modalRef.componentInstance.verdict = 'wrong';
      }
      modalRef.result.then((userResponse) => {
        if (userResponse === 'yes') {
          console.log(example, pattern, verdict);
          this.myservice.sendSentence(pattern, example, verdict).subscribe(res => {
            if (res['resp'] === 'Not trained yet') {
              const nestedModalRef = this.modalService.open(FeedbackModalComponent);
              nestedModalRef.componentInstance.header = 'New Pattern Alert';
              nestedModalRef.componentInstance.content = 'This pattern is new. Please start with a positive example for the training process to take place';
              nestedModalRef.result.then((response) => {});
            } else if (res['resp'] === 'Tudo Bem') {
              const nestedModalRef = this.modalService.open(FeedbackModalComponent);
              nestedModalRef.componentInstance.header = 'Submitted Successfully';
              nestedModalRef.componentInstance.content = 'Your example has been submitted successfully';
              nestedModalRef.result.then((response) => {});
              this.generatedSentences.splice(index, 1);
              this.sentencesToReturn.splice(index, 1);
            } else {
              const nestedModalRef = this.modalService.open(FeedbackModalComponent);
              nestedModalRef.componentInstance.header = 'Warning!';
              nestedModalRef.componentInstance.content = 'Something went wrong. Please double-check your actions before submitting';
              nestedModalRef.result.then((response) => {});
            }
          });
          console.log(verdict);
        }
      });
    } else {
      const nestedModalRef = this.modalService.open(FeedbackModalComponent);
      nestedModalRef.componentInstance.header = 'Input Incomplete';
      nestedModalRef.componentInstance.content = 'All added pattern fields are required, please fill them or delete the empty ones before submitting your example';
      nestedModalRef.result.then((response) => {});
      // Holy shit pattern is incomplete
    }
  }

}
