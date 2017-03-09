import {EventEmitter, Injectable} from '@angular/core';
import {Http, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { environment } from '../../environments/environment';

export interface SearchParams {
  search: string;
  fields: string;
}

export class Author {
  constructor(
    public email: string,
    public firstname: string,
    public institution: string,
    public lastname: string
  ) { }
}

export class Result {
  constructor(
    public abstract: string,
    public authors: Array<Author>,
    public body: string,
    public journal: string,
    public link: string,
    public keywords: Array<string>,
    public title: string
  ) { }
}

@Injectable()
export class SearchService {
  searchEvent: EventEmitter<any> = new EventEmitter();
  addEvent: EventEmitter<any> = new EventEmitter();

  constructor(private http: Http) {}
 
  search(params: SearchParams): Observable<Result[]> {
    if(!params.search) {
      return Observable.empty();
    }

    return this.http
      .get(`${environment.api}/search/query`, {search: encodeParams(params)})
      .map(response => response.json().hits.hits )
      .map(hits => hits.map(hit => hit._source) )
      .catch( err => Observable.empty() );
  }

  add(data: any): Observable<Result> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
   
   return this.http.post(`${environment.api}/search`, {article: data}, options).map(response => response.json())
  }

}

function encodeParams(params: any): URLSearchParams {
  const validParams = {
    authors: 'authors.*name',
    title: 'title',
    body: 'body',
    keywords: 'keywords'
  };
  
  let newParams = new URLSearchParams();

  newParams.append('search', params.search);

  newParams.append('fields', Object.keys(params.checkboxesGroup)
    .filter(key => params.checkboxesGroup[key])
    .map(key => validParams[key])
    .join(',')
  );


  return newParams;
}