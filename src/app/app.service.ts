import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  newWords = [];
  url = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) { }

  getDictionary() {
    const url = this.url + 'getdict';
    return this.http.post(url, {}).pipe(
      map((data: any) => {
        return data;
      }), catchError( error => {
        return throwError( 'Something went wrong!' );
      }));
  }

  generateSentences(pat, numsentences) {
    const url = this.url + 'generate';
    this.http.post(url, {pattern: pat, number: numsentences}).pipe(
      map((data: any) => {
      }), catchError( error => {
        return throwError( 'Something went wrong!' );
      }));
  }

  sendSentence(pat, sen, ver) {
    const url = this.url + 'train';
    this.http.post(url, {pattern: pat, sentence: sen, verdict: ver}).pipe(
      map((data: any) => {
      }), catchError( error => {
        return throwError( 'Something went wrong!' );
      }));
  }

  sendNewWord(type, value) {
    const tempWord: Map<string, Array<string>> = new Map();
    tempWord['Type'] = type;
    tempWord['Base Form'] = value;
    this.newWords.push(tempWord);
    const url = this.url + 'addword';
    this.http.post(url, {full: value, pos: type}).pipe(
      map((data: any) => {
      }), catchError( error => {
        return throwError( 'Something went wrong!' );
      }));
  }
  getNewWords(type) {
    const wordsToGet = [];
    for (const word of this.newWords) {
      if (word['Type'] === type) {
        wordsToGet.push(word['Base Form']);
        this.newWords.splice(this.newWords.indexOf(word), 1);
      }
    }
    return wordsToGet;
  }
}
