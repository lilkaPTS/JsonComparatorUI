import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {JsonPipe} from "@angular/common";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JsonParserUI';

  private baseUrl = 'http://localhost:8080';

  file1: File| null = null;
  file2: File| null = null;
  body1: any;
  body2: any;

  json1: string = "";
  json2: string = "";

  constructor(private http: HttpClient) {
  }

  selectFile(event: any): void {
    if(this.file1 == null) {
      this.file1 = event.target.files.item(0);
    } else {
      this.file2 = event.target.files.item(0);
    }
  }

  click(): void {
    // console.log(this.file1);
    // console.log(this.file2);


    // this.upload().subscribe(
    //   (event: any) => {
    //     if (event instanceof HttpResponse) {
    //       this.body1 = event.body[0];
    //       this.body2 = event.body[1];
    //       console.log(this.body1);
    //     }
    //   },
    //   (err: any) => {
    //     alert(err);
    //   });
    this.upload1().subscribe((data:any) => {
      this.json1 = data[0];
      this.json2 = data[1];
    });

  }

  upload(): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    if(this.file1 != null && this.file2 != null) {
      formData.append('file1', this.file1);
      formData.append('file2', this.file2);
    }
    const req = new HttpRequest('POST', `${this.baseUrl}/test`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  upload1(){
    const formData: FormData = new FormData();
    if(this.file1 != null && this.file2 != null) {
      formData.append('file1', this.file1);
      formData.append('file2', this.file2);
    }
    return this.http.post(`${this.baseUrl}/test`, formData);
  }

}
