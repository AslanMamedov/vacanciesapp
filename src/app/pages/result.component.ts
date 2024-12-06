import { CTableComponent } from '#components';
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

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CTableComponent],
  template: ` <app-c-table [data]="userQuestionsData()"></app-c-table> `,
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
