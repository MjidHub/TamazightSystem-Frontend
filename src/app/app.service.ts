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
    return this.http.post(url, {pattern: pat, number: numsentences}).pipe(
      map((data: any) => {
        return data;
      }), catchError( error => {
        return throwError( 'Something went wrong!' );
      }));
  }

  sendSentence(pat, sen, ver) {
    const url = this.url + 'train';
    console.log(ver, pat, sen);
    return this.http.post(url, {pattern: pat, sentence: sen, label: ver}).pipe(
      map((data: any) => {
        return data;
      }), catchError( error => {
        return throwError( 'Something went wrong!' );
      }));
  }

  sendNewWord(value, type, radical, postype, gender, person, num, tense, annex, state, aspect) {
    const tempWord: Map<string, string> = new Map();
    tempWord['Base Form'] = value; tempWord['Radical'] = radical; tempWord['POSType'] = postype; tempWord['Gender'] = gender;
    tempWord['Person'] = person; tempWord['Number'] = num; tempWord['Tense'] = tense; tempWord['Annex'] = annex;
    tempWord['State'] = state; tempWord['Aspect'] = aspect; tempWord['Type'] = type;
    tempWord.forEach((val: string, key: string) => {
      if (val === 'None') {
        tempWord.set(key, '');
      }
    });
    this.newWords.push(tempWord);
    const url = this.url + 'saveword';
    return this.http.post(url, {full: value, pos: type, gen: gender, pers: person, number: num, ten: tense, type: postype,
                              st: state, asp: aspect, rad: radical, an: annex}).pipe(
      map((data: any) => {
        return data;
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
