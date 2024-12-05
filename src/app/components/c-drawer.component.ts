import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-c-drawer',
  standalone: true,
  imports: [NzDrawerModule],
  template: `
    <nz-drawer
      [nzClosable]="false"
      [nzVisible]="isVisible()"
      nzPlacement="right"
      (nzOnClose)="onClose()"
    >
      <ng-container *nzDrawerContent>
        <ng-content></ng-content>
      </ng-container>
    </nz-drawer>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CDrawerComponent {
  public isVisible = input.required<boolean>({
    alias: 'isVisible',
  });

  public onCloseHandler = output<boolean>();

  onClose(): void {
    this.onCloseHandler.emit(false);
  }
}
