import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchService } from './services/search.service';
import { ResultItemComponent } from './components/result-item/result-item.component';
import { JoinPipe } from './pipes/join.pipe';
import { SimpleFormatPipe } from './pipes/simple-format.pipe';
import { ResultFormComponent } from './components/result-form/result-form.component'

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    ResultItemComponent,
    JoinPipe,
    SimpleFormatPipe,
    ResultFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
