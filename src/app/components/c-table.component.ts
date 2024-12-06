import { LocalStorageService } from '#services';
import { IQuestion, IQuestionData } from '#types';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-c-table',
  standalone: true,
  imports: [NzTableModule, NzDividerModule],
  template: `
    <nz-table
      #basicTable
      [nzData]="questionListData()"
      nzShowPagination="false"
    >
      <thead>
        <tr>
          <th>№</th>
          <th>Sual</th>
          <th>Cavab</th>
          <th>Bal</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        @for (question of questionListData(); track question; let idx = $index)
        {
        <tr>
          <td>{{ idx + 1 }}</td>
          <td>{{ question.question }}</td>
          <td>{{ question.optionText }}</td>
          <td>{{ question.point }}</td>
          <td>{{ question.rightAnswer ? 'Doğru' : 'Yanliş' }}</td>
        </tr>
        }
      </tbody>
    </nz-table>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CTableComponent {
  public questionList = input.required<IQuestion[]>({ alias: 'data' });
  protected localStorage = inject(LocalStorageService);

  public questionListData = computed(() => {
    if (!this.questionList()) {
      return this.questionList();
    } else {
      return Object.values(this.localStorage.getItem('questionList') || {});
    }
  });

  ngOnInit() {
    console.log(this.questionListData());
  }
}
