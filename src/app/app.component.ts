import {Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
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
  files: FileList|null = null;
  @ViewChild('inputFile') myInputVariable: ElementRef | null = null;
  indexes: Array<number> = new Array<number>();

  responseEntity: ResponseObject = new ResponseObject(new Array<string>(), new ResponseView(new Array<string>(), new Array<string>()));

  constructor(private http: HttpClient) {
  }

  selectFile(event: any): void {
    this.files = event.target.files;
  }

  getIndex (str: string, word: string): number {
    return str.indexOf(word);
  }

  click(): void {
    if(this.files?.length == 2) {
      this.upload().subscribe((data:any) => {
        this.responseEntity = data;
        this.indexes = new Array<number>();
        for (let i = 0; i < this.responseEntity.responseView.configFile1.length; i++) {
          this.indexes.push(i);
        }
      });
    } else {
      console.log("Critical error!!!");
      if (this.myInputVariable) {
        this.myInputVariable.nativeElement.value = '';
      }
    }
  }

  upload(){
    let formData: FormData = new FormData();
    if(this.files != null) {
      formData.append('file1', this.files[0]);
      formData.append('file2', this.files[1]);
    }
    return this.http.post(`${this.baseUrl}/test`, formData);
  }
}
