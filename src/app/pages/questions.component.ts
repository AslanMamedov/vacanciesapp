import { QuestionsStepComponent } from '#template';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DrawerService } from '../services/drawer.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [QuestionsStepComponent],
  template: ` <app-questions-step></app-questions-step> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent {
  protected drawerService = inject(DrawerService);

  ngOnInit(): void {
    this.drawerService.onClose();
  }
}
