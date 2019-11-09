import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {RemoveChoiceModalComponent} from '../modals/remove-choice-modal/remove-choice-modal.component';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-example-generation',
  templateUrl: './example-generation.component.html',
  styleUrls: ['./example-generation.component.css']
})
export class ExampleGenerationComponent implements OnInit {

  generateSentence = false;
  userInput = false;
  options = [
    {id: 1, label: 'One'},
    {id: 2, label: 'Two'},
    {id: 3, label: 'Three'},
  ];
  pattern = [];
  sentence = [];
  generatedSentences = ['Lorem ipsum dolor sit amet, te stet cetero phaedrum has, sed diam modus nullam et',
    ' Numquam suavitate consulatu ex eam, falli dicant utinam est no',
    ' Mei ut purto theophrastus, sea nullam volutpat ea, Eam facer commune pericula ex'];
  patternOptions = ['POS', 'Punctuation', 'Word'];
  initPattern = ['POS', 'Word'];
  public boxForm: FormGroup;
  modalOptions: NgbModalOptions;
  @Input() chosenUtterance;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  ngOnInit(): void {
    this.boxForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
  }

  createBox(chosen): FormGroup {
    return this.formBuilder.group({
      example: ['', [Validators.required]],
      pattern: [chosen, [Validators.required]]
    });
  }

  get items(): FormArray {
    return this.boxForm.get('items') as FormArray;
  }
  addPattern(index) {
    this.items.insert(index, this.createBox('None'));
  }
  removePattern(index) {
    const modalRef = this.modalService.open(RemoveChoiceModalComponent);
    modalRef.result.then((userResponse) => {
      if (userResponse === 'yes') {
        this.items.removeAt(index);
      }
    });
  }
  activateUserInput() {
    this.userInput = true;
  }
  updatePattern(selected, index) {
    if (this.items.controls[index].value.pattern !== selected) {
      this.items.removeAt(index);
      this.items.insert(index, this.createBox(selected));
    }
  }
  generate() {
    this.generateSentence = true;
  }
  judge(index, verdict) {
  }

}
