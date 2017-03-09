import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

import { SearchService, Result } from '../../services/search.service'

@Component({
  selector: 'app-result-form',
  templateUrl: './result-form.component.html',
  styleUrls: ['./result-form.component.css']
})
export class ResultFormComponent implements OnInit {
  formModel: FormGroup;
  formBuilder: FormBuilder;

  constructor(private fb: FormBuilder, private searchService: SearchService) { 
    this.formBuilder = fb;
  }

  ngOnInit() {
    this.formModel = this.formBuilder.group({
      abstract: ['', Validators.required],
      body: ['', Validators.required],
      journal: ['', Validators.required],
      link: ['', Validators.required],
      title: ['', Validators.required],
      keywords: this.formBuilder.array([
        this.initKeyword()
      ]),
      authors: this.formBuilder.array([
        this.initAuthor()
      ])
    });
  }

  initKeyword() {
    return this.formBuilder.group({
      text: ['', Validators.required]
    });
  }

  addKeyword() {
    const control = <FormArray>this.formModel.controls['keywords'];
    control.push(this.initKeyword());
  }

  removeKeyword(i: number) {
    const control = <FormArray>this.formModel.controls['keywords'];
    control.removeAt(i);
  }

  initAuthor() {
    return this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      institution: ['', Validators.required]
    });
  }

  addAuthor() {
    const control = <FormArray>this.formModel.controls['authors'];
    control.push(this.initAuthor());
  }

  removeAuthor(i: number) {
    const control = <FormArray>this.formModel.controls['authors'];
    control.removeAt(i);
  }

  onSubmit() {
    let keywords = this.formModel.value.keywords.map(keyword => keyword.text)
    this.searchService.add(Object.assign(this.formModel.value,{keywords}))
      .subscribe(
        json  => { 
          this.searchService.addEvent.emit(json);
          this.formModel.reset()
         },
        error => console.log(error)
      );
  }

}
