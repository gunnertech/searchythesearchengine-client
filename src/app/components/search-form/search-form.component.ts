import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

import { SearchService, Result } from '../../services/search.service'

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  formModel: FormGroup;
  results: Observable<Result[]>;


  constructor(private fb: FormBuilder, private searchService: SearchService) { 
    this.formModel = fb.group({
      'search': [null, null],
      'checkboxesGroup': fb.group({
        'title': [true, null],
        'body': [true, null],
        'authors': [true, null],
        'keywords': [true, null]
      })
    });

    this.searchService.searchEvent
      .subscribe(
        params => this.results = this.searchService.search(params),
        console.error.bind(console),
        () => console.log('DONE')
      );

    this.formModel.controls['search'].valueChanges
      .debounceTime(500)
      .subscribe( () => this.searchService.searchEvent.emit(this.formModel.value));

    this.formModel.controls['checkboxesGroup'].valueChanges
      .debounceTime(50)
      .subscribe( () => this.searchService.searchEvent.emit(this.formModel.value));
  }

  ngOnInit() {}

}
