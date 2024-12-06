import { CInputFileuploadComponent, CTableComponent } from '#components';
import { questionList } from '#constant';
import { userQuestionsSelector } from '#store';
import { IQuestion, IQuestionData } from '#types';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CTableComponent, CInputFileuploadComponent, NzButtonModule],
  template: `
    <div class="flex flex-col gap-4 p-4">
      <app-c-input-fileupload></app-c-input-fileupload>
      <app-c-table [data]="userQuestionsData()"></app-c-table>
      <button
        class="ml-2 w-[150px] uppercase"
        nz-button
        nzType="primary"
        type="submit"
      >
        Tamamla
      </button>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {
  public store = inject(Store);
  public userQuestionsData = signal<IQuestion[]>([]);
  questionList = questionList;

  public ngOnInit(): void {
    this.store
      .select(userQuestionsSelector)

      .subscribe((result) => {
        const data = Object.values(result || []);

        this.userQuestionsData.set(data);
      });
  }
}
