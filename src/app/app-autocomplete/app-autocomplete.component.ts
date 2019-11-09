import { Component, ContentChild, ContentChildren, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { AutocompleteContentDirective } from './directive/autocomplete-content.directive';
import { OptionComponent } from './app-option/app-option.component';
import { switchMap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './app-autocomplete.component.html',
  exportAs: 'appAutocomplete',
  styleUrls: ['./app-autocomplete.component.css']
})
export class AutocompleteComponent {
  // @ts-ignore
  @ViewChild('root') rootTemplate: TemplateRef<any>;

  // @ts-ignore
  @ContentChild(AutocompleteContentDirective)
  content: AutocompleteContentDirective;

  @ContentChildren(OptionComponent) options: QueryList<OptionComponent>;

  optionsClick() {
    return this.options.changes.pipe(
      switchMap(options => {
        const clicks$ = options.map(option => option.click$);
        return merge(...clicks$);
      })
    );
  }
}
