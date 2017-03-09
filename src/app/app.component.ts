import { Component } from '@angular/core';
import { SearchService, Result } from './services/search.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Searchy The Search Engine';
  showResultForm = false;
  showAddMessage = false

  constructor(private searchService: SearchService) { 
    this.searchService.addEvent
      .subscribe(
        json => {
          this.showResultForm = false; 
          this.showAddMessage = true;
        },
        console.error.bind(console),
        () => console.log('DONE')
      );
  }


}
