import { Observable, take, tap } from "rxjs";

import { ComponentStore } from "@ngrx/component-store"
import { Injectable } from "@angular/core";

export interface LayoutState {
  isLoading: boolean
}

@Injectable({
  providedIn: 'root'
})
export class LayoutStore extends ComponentStore<LayoutState> {
  private isLoading$: Observable<boolean> = this.select((state) => state.isLoading);

  vm$ = this.select({
    isLoading: this.isLoading$
  });

  constructor(){
    super({
      isLoading: false
    })
  }
  // reduce
  updateIsLoadingState = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading: isLoading,
  }));

  //effects
  setIsLoading = this.effect((isLoading: Observable<boolean>) => {
    return isLoading.pipe(
      take(2),
      tap((isLoading: boolean) =>  {
      this.updateIsLoadingState(isLoading);
    }),
  );
  });
}
