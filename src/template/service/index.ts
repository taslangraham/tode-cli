import { ORM } from "../../app";
import { ServiceReponse } from "../../config/constants";

class ServiceClassName {
  private _foo = "foo";

  constructor() {
    //
  }

  get foo() {
    return this._foo;
  }

  set foo(val: string) {
    this._foo = val;
  }

  public foobar() {
    //
  }
}

const ServiceNameService = new ServiceClassName();

export { ServiceNameService };
