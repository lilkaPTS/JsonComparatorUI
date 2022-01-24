import {Component, ViewEncapsulation} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {JsonPipe} from "@angular/common";
import {CommonModule} from "@angular/common";
import {DomSanitizer} from "@angular/platform-browser";
import {ResponseObject} from "./responseObject";

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

  json1: string = "";
  json2: string = "";

  responseEntity: ResponseObject = new ResponseObject(new Array<string>(), "", "", new Array<string>());

  counter1: number = 0;
  counter2: number = 0;

  str: string = '"sha1" : "749d65718qwec394eae890e7137898419b48b021"';

  constructor(private http: HttpClient, private sanitized: DomSanitizer) {
  }

  selectFile(event: any): void {
    if(this.file1 == null) {
      this.file1 = event.target.files.item(0);
    } else {
      this.file2 = event.target.files.item(0);
    }
  }

  highlightKeyWord(sentence: string, keyWord: string) {
    sentence = sentence.replace(keyWord,
      `<span class="red">${keyWord}</span>`);
    return this.sanitized.bypassSecurityTrustHtml(sentence);
  }

  jsonWalker(jsonString: string) {
    console.log(JSON.parse(jsonString).metadata.description.version);
  }

  getIndex (str: string, word: string): number {
    return str.indexOf(word);
  }

  click(): void {
    this.upload().subscribe((data:any) => {
      this.responseEntity = data;
      //console.log(JSON.parse(this.json1).artifacts[0].mvn[0].groupId)
    });

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
