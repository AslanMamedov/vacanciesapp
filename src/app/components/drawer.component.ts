import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { Component, inject } from '@angular/core';
import { DrawerService } from '#services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [NzDrawerModule],
  template: `
    <nz-drawer
      nzPlacement="right"
      [nzClosable]="false"
      [nzVisible]="isVisible"
      (nzOnClose)="onClose()"
    >
      <ng-container *nzDrawerContent>
        <ng-content></ng-content>
      </ng-container>
    </nz-drawer>
  `,
})
export class DrawerComponent {
  protected isVisible: boolean = false;
  //
  protected subscription$: Subscription | null = null;
  protected drawerService = inject(DrawerService);
  protected ngOnInit(): void {
    this.subscription$ = this.drawerService.dreawerIsVisible.subscribe(
      (visible) => {
        this.isVisible = visible;
      }
    );
  }

  protected onClose(): void {
    this.drawerService.onClose();
  }
  protected ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
