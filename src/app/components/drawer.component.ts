import { DrawerService } from '#services';
import { Component, inject } from '@angular/core';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [NzDrawerModule],
  template: `
    <nz-drawer
      [nzClosable]="false"
      [nzVisible]="isVisible"
      nzPlacement="right"
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
  protected drawerService = inject(DrawerService);

  public ngOnInit(): void {
    this.drawerService.dreawerIsVisible.subscribe((visible) => {
      this.isVisible = visible;
    });
  }

  public onClose(): void {
    this.drawerService.onClose();
  }
}
