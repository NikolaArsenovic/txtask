import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LayoutStore } from './layout.store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  layoutStore = inject(LayoutStore);
  vm$ = this.layoutStore.vm$;
}
