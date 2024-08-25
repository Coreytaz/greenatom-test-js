import { makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";

enableStaticRendering(typeof window === "undefined");

export class ModalPhotoStore {
  private _isOpen: boolean = false;
  private _albums: any[] = [];
  private _index: number | undefined = undefined;
  private _currentPhotoId: number | string | undefined = undefined;

  constructor() {
    makeAutoObservable<this>(this, undefined, {
      autoBind: true,
    });
  }

  get maxLengthAlbums() {
    return this._albums?.length - 1;
  }

  get index() {
    return this._index;
  }

  get isOpen() {
    return this._isOpen;
  }

  get currentPhoto() {
    return this._currentPhotoId;
  }

  get currentPhotoInfo() {
    return this._albums?.at(this._index) ?? {};
  }

  get albums() {
    return this._albums;
  }

  onOpen() {
    this._isOpen = true;
  }

  onClose() {
    this._isOpen = false;
  }

  onToggle(value: boolean) {
    this._isOpen = value;
  }

  setCurrentPhoto(value: number | string, index: number) {
    this._index = index;
    this._currentPhotoId = value;
  }

  setAlbums(album: any[]) {
    this._albums = album;
  }

  nextPhoto() {
    if (this._index === this.maxLengthAlbums) {
      this._index = 0;
    } else {
      this._index++;
    }
  }

  prevPhoto() {
    if (this._index === 0) {
      this._index = this.maxLengthAlbums;
    } else {
      this._index--;
    }
  }
}
