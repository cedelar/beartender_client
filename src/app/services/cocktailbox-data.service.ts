import { Injectable } from '@angular/core';
import { COCKTAILBOXES } from '../cocktailbox/mock-cocktailbox';
import { Cocktailbox } from '../model/cocktailbox.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailboxDataService {
  private _cocktailboxes = COCKTAILBOXES;

  constructor() { }

  public get_cocktailboxes(): Cocktailbox[]{
    return this._cocktailboxes;
  }
  
}
