import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './app-autocomplete.component';
import { AutocompleteDirective } from './directive/autocomplete.directive';
import { AutocompleteContentDirective } from './directive/autocomplete-content.directive';
import { OptionComponent } from './app-option/app-option.component';

const publicApi = [
  AutocompleteComponent,
  AutocompleteDirective,
  AutocompleteContentDirective,
  OptionComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [publicApi],
  exports: [publicApi]
})
export class AutocompleteModule {
}
