import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app-component/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../modules/angular-material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DictionaryModalComponent } from './modals/dictionary-modal/dictionary-modal.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { RemoveChoiceModalComponent } from './modals/remove-choice-modal/remove-choice-modal.component';
import { MatTabsModule } from '@angular/material';
import { ExampleGenerationComponent } from './example-generation/example-generation.component';
import { WordAdditionFormComponent } from './word-addition-form/word-addition-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DictionaryModalComponent,
    RemoveChoiceModalComponent,
    ExampleGenerationComponent,
    WordAdditionFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgbModule,
    FormsModule,
    FlexLayoutModule,
    MatTabsModule
  ],
  entryComponents: [
    DictionaryModalComponent,
    RemoveChoiceModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
