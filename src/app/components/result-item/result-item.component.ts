import { Component, OnInit, Input } from '@angular/core';
import {Result} from 'app/services/search.service';


@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css']
})
export class ResultItemComponent implements OnInit {
  @Input() result: Result;
  isFullMode: boolean = false;
  
  constructor() { 
    this.isFullMode = false;
  }

  ngOnInit() {
  }

}
