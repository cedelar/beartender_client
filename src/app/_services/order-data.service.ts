import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  private _toOrderAmount$: BehaviorSubject<number>;
  private _orderedAmount$: BehaviorSubject<number>;
  private _boxAmountMap: Map<string, number>;
  private _cocktailAmountMap: Map<string, number>;
  
  constructor() { 
    this._toOrderAmount$ = new BehaviorSubject<number>(0);
    this._orderedAmount$ = new BehaviorSubject<number>(0);
    this._boxAmountMap = new Map();
    this._cocktailAmountMap = new Map();
  }

  get toOrderAmount$(): BehaviorSubject<number> {
    return this._toOrderAmount$;
  }

  get orderedAmount$(): BehaviorSubject<number> {
    return this._orderedAmount$;
  }

  updateToOrderAmount(amount: number): void{
    this._toOrderAmount$.next(amount);
  }

  updateOrderedAmount(amount: number): void{
    this._orderedAmount$.next(amount);
  }

  updateAmountMap(key: string, addedAmount: number, kind: string): void{
    //select map
    var toUpdate: Map<string, number>;
    if(kind == "box"){
      toUpdate = this._boxAmountMap;
    }else{
      toUpdate = this._cocktailAmountMap;
    }

    //update map
    if(toUpdate.has(key)){
      var endValue = toUpdate.get(key) + addedAmount;
      if(endValue > 0){
        toUpdate.set(key, endValue);
      }else{
        toUpdate.delete(key);
      }
    }else{
      if(addedAmount >= 0){
        toUpdate.set(key, addedAmount);
      }
    }

    //update observables
    var amountToOrder = 0;
    var amountOrdered = 0;
    for (let value of this._boxAmountMap.values()){
      amountToOrder += value;
    }
    for (let value of this._cocktailAmountMap.values()){
      amountOrdered += value;
    }
    this.updateToOrderAmount(amountToOrder);
    this.updateOrderedAmount(amountOrdered);
  }

  getValueFromMap(key: string, kind: string): number{
    //select map
    var toReturn: Map<string, number>;
    if(kind == "box"){
      toReturn = this._boxAmountMap;
    }else{
      toReturn = this._cocktailAmountMap;
    }

    //return value
    if(toReturn.has(key)){
      return toReturn.get(key);
    }else{
      return 0;
    }
  }
}
