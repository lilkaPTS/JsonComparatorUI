import {ResponseView} from "./responseView";

export class ResponseObject {

  private _errors: Array<string> = new Array<string>();
  private _responseView: ResponseView = new ResponseView(new Array<string>(), new Array<string>());


  constructor(errors: Array<string>, responseView: ResponseView) {
    this._errors = errors;
    this._responseView = responseView;
  }

  get errors(): Array<string> {
    return this._errors;
  }

  set errors(value: Array<string>) {
    this._errors = value;
  }

  get responseView(): ResponseView {
    return this._responseView;
  }

  set responseView(value: ResponseView) {
    this._responseView = value;
  }
}
