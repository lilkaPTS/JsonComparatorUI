export class ResponseObject {
  private _errors: Array<string> = new Array<string>();
  private _configFile1: string = "";
  private _configFile2: string = "";
  private _metadata: Array<string> = new Array<string>();

  constructor(errors: Array<string>, configFile1: string, configFile2: string, metadata: Array<string>) {
    this._errors = errors;
    this._configFile1 = configFile1;
    this._configFile2 = configFile2;
    this._metadata = metadata;
  }

  get errors(): Array<string> {
    return this._errors;
  }

  set errors(value: Array<string>) {
    this._errors = value;
  }

  get configFile1(): string {
    return this._configFile1;
  }

  set configFile1(value: string) {
    this._configFile1 = value;
  }

  get configFile2(): string {
    return this._configFile2;
  }

  set configFile2(value: string) {
    this._configFile2 = value;
  }

  get metadata(): Array<string> {
    return this._metadata;
  }

  set metadata(value: Array<string>) {
    this._metadata = value;
  }
}
