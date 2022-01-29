import {Component, ViewEncapsulation} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {JsonPipe} from "@angular/common";
import {CommonModule} from "@angular/common";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {ResponseObject} from "./responseObject";
import {ResponseView} from "./responseView";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'JsonParserUI';

  private baseUrl = 'http://localhost:8080';

  file1: File| null = null;
  file2: File| null = null;

  responseEntity: ResponseObject = new ResponseObject(new Array<string>(), new ResponseView(new Array<string>(), new Array<string>()));

  constructor(private http: HttpClient, public sanitized: DomSanitizer) {
  }

  selectFile(event: any): void {
    if(this.file1 == null) {
      this.file1 = event.target.files.item(0);
    } else {
      this.file2 = event.target.files.item(0);
    }
  }

  highlightKeyWord(sentence: string, keyWord: string[]) {
    for (let i = 0; i < keyWord.length; i++) {
      sentence = sentence.replace(keyWord[i],
        `<span class="red">${keyWord[i]}</span>`);
    }
    return this.sanitized.bypassSecurityTrustHtml(sentence);
  }

  highlightKeyWordSimple(sentence: string, keyWord: string[]) {
    for (let i = 0; i < keyWord.length; i++) {
      sentence = sentence.replace(keyWord[i],
        `<span class="red">${keyWord[i]}</span>`);
    }
    return sentence;
  }

  jsonWalker(jsonString: string) {
    console.log(JSON.parse(jsonString).metadata)
  }

  getIndex (str: string, word: string): number {
    return str.indexOf(word);
  }

  click(): void {
    this.upload().subscribe((data:any) => {
      this.responseEntity = data;
    });
  }

  replaceToUglyJson(str: string): string {
    str = str.replace(/{/g, "{\n");
    str = str.replace(/}/g, "\n}");
    str = str.replace(/\[/g, "[\n");
    str = str.replace(/,/g, ",\n");
    return str;
  }

  fin(str: string): string {
    var s1 = str.replace(new RegExp(`(\\{)|(\\()|(\\[)`,'g'),'$1$2$3\n');
    var s2 = s1.replace(new RegExp(`(\\})|(\\))|(\\])`,'g'),'$1$2$3\n');
    var s3 = s2.replace(new RegExp(',','g'),',\n');
    var tokens = s3.split('\n');
    var offsets: string[] = [];
    var index=0;
    var offets = (tokens).forEach((token)=>{
      offsets.push('\t'.repeat(index)+token.trim());
      if (token.match('[\\{|\\(|\\[]')){index++};
      if (token.match('[\\}|\\)|\\]]')){index--};
    })
    return offsets.join('\n')
  }

  upload(){
    const formData: FormData = new FormData();
    if(this.file1 != null && this.file2 != null) {
      formData.append('file1', this.file1);
      formData.append('file2', this.file2);
    }
    return this.http.post(`${this.baseUrl}/test`, formData);
  }

}
