import { IQuestion, IQuestionData } from '#types';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
    <nz-table #basicTable [nzData]="questionList()" nzShowPagination="false">
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
        @for (question of questionList(); track question; let idx = $index) {
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
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CTableComponent {
  questionList = input.required<IQuestion[]>({ alias: 'data' });

  ngOnInit() {
    console.log('qqq', this.questionList());
  }
}
