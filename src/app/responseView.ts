export class ResponseView {

  private _configFile1: Array<string> = new Array<string>();
  private _configFile2: Array<string> = new Array<string>();

  constructor(configFile1: Array<string>, configFile2: Array<string>) {
    this._configFile1 = configFile1;
    this._configFile2 = configFile2;
  }

  get configFile1(): Array<string> {
    return this._configFile1;
  }

  set configFile1(value: Array<string>) {
    this._configFile1 = value;
  }

  get configFile2(): Array<string> {
    return this._configFile2;
  }

  set configFile2(value: Array<string>) {
    this._configFile2 = value;
  }
}
