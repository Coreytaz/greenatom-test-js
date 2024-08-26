import { makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";

enableStaticRendering(typeof window === "undefined");

export class PaginationStore {
  private _page: number | string = 1;
  constructor(page: number | string) {
    makeAutoObservable<this>(this, undefined, {
      autoBind: true,
    });
    this._page = page;
  }

  get page() {
    return this._page
  }

  nextPage() {
    this._page = +this._page + 1;
  }

  prevPage() {
    this._page = -this._page + 1;
  }
}
