import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {RemoveChoiceModalComponent} from '../modals/remove-choice-modal/remove-choice-modal.component';
import {DictionaryModalComponent} from '../modals/dictionary-modal/dictionary-modal.component';

@Component({
  selector: 'app-example-generation',
  templateUrl: './example-generation.component.html',
  styleUrls: ['./example-generation.component.css']
})
export class ExampleGenerationComponent implements OnInit {

  generateSentence = false;
  pattern = [];
  utterance = [];
  generatedSentences = ['Lorem ipsum dolor sit amet, te stet cetero phaedrum has, sed diam modus nullam et',
    ' Numquam suavitate consulatu ex eam, falli dicant utinam est no',
    ' Mei ut purto theophrastus, sea nullam volutpat ea, Eam facer commune pericula ex'];
  patternOptions = ['POS', 'Punctuation', 'Word'];
  initPattern = ['POS', 'Word'];
  modalOptions: NgbModalOptions;
  @Input() chosenUtterance;

  constructor(private modalService: NgbModal) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }
  ngOnInit(): void {
  }
  addPattern(index) {
    this.pattern.splice(index, 0, 'None');
  }
  removePattern(index) {
    const modalRef = this.modalService.open(RemoveChoiceModalComponent);
    modalRef.result.then((userResponse) => {
      if (userResponse === 'yes') {
        this.pattern.splice(index, 1);
      }
    });
  }
  addUtterance(index) {
    this.utterance.splice(index, 0, 'None');
  }
  removeUtterance(index) {
    const modalRef = this.modalService.open(RemoveChoiceModalComponent);
    modalRef.result.then((userResponse) => {
      if (userResponse === 'yes') {
        this.utterance.splice(index, 1);
      }
    });
  }
  updatePattern(selected, index) {
    this.pattern[index] = selected;
  }
  updateUtterance(selected, index) {
    const modalRef = this.modalService.open(DictionaryModalComponent);
    modalRef.componentInstance.myModalTitle = 'Choose a ' + selected;
    modalRef.componentInstance.myModalContent = selected;

    modalRef.result.then((userResponse) => {
      if (userResponse !== '') {
        this.utterance[index] = userResponse;
      }
    });
  }
  generate(type) {
    if (type === 'pattern') {
      // Populate generatedSentence according to pattern
    } else if (type === 'utterance') {
      // Populate generatedSentence according to Utterance
    }
    this.generateSentence = true;
  }
  judge(index, verdict) {
  }

}
