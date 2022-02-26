import {Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

  files: FileList|null = null;
  @ViewChild('inputFile') myInputVariable: ElementRef | null = null;
  indexes: Array<number> = new Array<number>();
  responseCheckEntity: ResponseObject = new ResponseObject(new Array<string>(), new ResponseView(new Array<string>(), new Array<string>()));
  responseEntity: ResponseObject = new ResponseObject(new Array<string>(), new ResponseView(new Array<string>(), new Array<string>()));

  constructor(private http: HttpClient) {
  }

  selectFile(event: any): void {
    this.files = event.target.files;
    if(this.files?.length == 2) {
      this.upload().subscribe((data:any) => {
        console.log(data);
        this.responseCheckEntity = data;
      });
    } else {
      this.responseCheckEntity.errors.push("The service can only work with two json files!!!");
    }
  }

  clearData(): void {
    this.files = null;
    this.responseCheckEntity = new ResponseObject(new Array<string>(), new ResponseView(new Array<string>(), new Array<string>()));
    this.responseEntity = new ResponseObject(new Array<string>(), new ResponseView(new Array<string>(), new Array<string>()));
    this.indexes = new Array<number>();
    if (this.myInputVariable) {
      this.myInputVariable.nativeElement.value = '';
    }
  }

  getIndex (str: string, word: string): number {
    return str.indexOf(word);
  }

  click(): void {
    this.responseEntity = this.responseCheckEntity;
    this.indexes = new Array<number>();
    for (let i = 0; i < this.responseEntity.responseView.configFile1.length; i++) {
      this.indexes.push(i);
    }
  }

  upload(){
    let formData: FormData = new FormData();
    if(this.files != null) {
      formData.append('file1', this.files[0]);
      formData.append('file2', this.files[1]);
    }
    return this.http.post(`${this.baseUrl}/validating`, formData);
  }
}
