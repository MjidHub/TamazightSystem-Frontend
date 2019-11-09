import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app-component/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Ng2CompleterModule } from 'ng2-completer';
import { AngularMaterialModule } from '../modules/angular-material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DictionaryModalComponent } from './modals/dictionary-modal/dictionary-modal.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RemoveChoiceModalComponent } from './modals/remove-choice-modal/remove-choice-modal.component';
import { MatTabsModule } from '@angular/material';
import { ExampleGenerationComponent } from './example-generation/example-generation.component';
import { WordAdditionFormComponent } from './word-addition-form/word-addition-form.component';
import { AutocompleteComponent } from './app-autocomplete/app-autocomplete.component';

import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { FilterPipe } from './example-generation/filter.pipe';
import {CommonModule} from '@angular/common';
import {AutocompleteModule} from './app-autocomplete/autocomplete.module';

@NgModule({
  declarations: [
    AppComponent,
    DictionaryModalComponent,
    RemoveChoiceModalComponent,
    ExampleGenerationComponent,
    WordAdditionFormComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    CommonModule,
    NgbModule,
    FormsModule,
    FlexLayoutModule,
    MatTabsModule,
    Ng2CompleterModule,
    ReactiveFormsModule,
    AutocompleteModule,
    OverlayModule
  ],
  entryComponents: [
    DictionaryModalComponent,
    RemoveChoiceModalComponent,
    AutocompleteComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
