import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { QuestionsStepComponent } from '#template';
import { DrawerService } from '#services';
//-
@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [QuestionsStepComponent],
  template: ` <app-questions-step></app-questions-step> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent {
  protected drawerService = inject(DrawerService);

  protected ngOnInit(): void {
    this.drawerService.onClose();
  }
}
