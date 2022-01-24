import {Component,  ViewEncapsulation} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {JsonPipe} from "@angular/common";
import {CommonModule} from "@angular/common";
import {DomSanitizer} from "@angular/platform-browser";
import {ResponseObject} from "./responseObject";
import {resourceChangeTicket} from "@angular/compiler-cli/src/ngtsc/core";

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

  str: string = '"version" : 4';

  responseEntity: ResponseObject = new ResponseObject(new Array<string>(), "asd", "dsa", new Array<string>());

  constructor(private http: HttpClient, private sanitized: DomSanitizer) {
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
      console.log(JSON.stringify(JSON.parse(this.responseEntity.configFile2).metadata))

      this.responseEntity.configFile2 = this.responseEntity.configFile2.replace(JSON.stringify(JSON.parse(this.responseEntity.configFile2).metadata),
        this.highlightKeyWordSimple(JSON.stringify(JSON.parse(this.responseEntity.configFile2).metadata), this.responseEntity.metadata));
      this.responseEntity.configFile2 = JSON.stringify(this.responseEntity.configFile2, null, 2);
      console.log(this.responseEntity.configFile2);
      //console.log(JSON.stringify(JSON.parse(this.responseEntity.configFile2).metadata));
      //this.responseEntity.configFile2 = this.responseEntity.configFile2.replace(JSON.stringify(JSON.parse(this.responseEntity.configFile2).metadata), "{fdsf}");
      //this.responseEntity.configFile1 = JSON.stringify(this.responseEntity.configFile1, null, 2);
      //this.responseEntity.configFile2 = JSON.stringify(this.responseEntity.configFile2, null, 2);
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
