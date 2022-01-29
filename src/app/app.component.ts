import {Component, ViewEncapsulation} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest, HttpResponse} from "@angular/common/http";
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

  constructor(private http: HttpClient) {
  }

  selectFile(event: any): void {
    if(this.file1 == null) {
      this.file1 = event.target.files.item(0);
    } else {
      this.file2 = event.target.files.item(0);
    }
  }

  getIndex (str: string, word: string): number {
    return str.indexOf(word);
  }

  click(): void {
    this.upload().subscribe((data:any) => {
      this.responseEntity = data;
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
