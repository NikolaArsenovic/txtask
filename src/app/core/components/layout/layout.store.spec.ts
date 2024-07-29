import { LayoutStore } from './layout.store';
import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs';

describe('LayoutStore', () => {
  let store: LayoutStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayoutStore]
    });

    store = TestBed.inject(LayoutStore);
  });

  afterEach(() => {
    store.setState({ isLoading: false });
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  describe('Selectors', () => {
    beforeEach(() => {
      store.setState({ isLoading: false });
    });

    afterEach(() => {
      store.setState({ isLoading: false });
    });

    it('should return the current isLoading state', () => {
      store.vm$.pipe(take(1)).subscribe((vm) => {
        expect(vm.isLoading).toBe(false);
      });

      store.updateIsLoadingState(true);

      store.vm$.pipe(take(1)).subscribe((vm) => {
        expect(vm.isLoading).toBe(true);
      });
    });
  });

  describe('Reducers', () => {
    beforeEach(() => {
      store.setState({ isLoading: false });
    });

    afterEach(() => {
      store.setState({ isLoading: false });
    });

    it('should update the isLoading state', () => {
      store.updateIsLoadingState(true);

      store.vm$.pipe(take(1)).subscribe((vm) => {
        expect(vm.isLoading).toBe(true);
      });

      store.updateIsLoadingState(false);

      store.vm$.pipe(take(1)).subscribe((vm) => {
        expect(vm.isLoading).toBe(false);
      });
    });
  });

  describe('Effects', () => {
    beforeEach(() => {
      store.setState({ isLoading: false });
    });

    afterEach(() => {
      store.setState({ isLoading: false });
    });

    it('should set the isLoading state through the setIsLoading effect', () => {
      store.setIsLoading(false);

      store.vm$.pipe(take(1)).subscribe((vm) => {
        expect(vm.isLoading).toBe(false);
      });

      store.setIsLoading(true);

      store.vm$.pipe(take(1)).subscribe((vm) => {
        expect(vm.isLoading).toBe(true);
      });
    });
  });
});
