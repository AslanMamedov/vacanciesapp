import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NzTableModule, NzDividerModule],
  template: `<nz-table
    nzSize="small"
    [nzData]="questionList()"
    [nzShowPagination]="false"
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
      @for (question of questionList(); track question; let idx = $index) {
      <tr>
        <td>{{ idx + 1 }}</td>
        <td class="font-bold text-sm">{{ question.question }}</td>
        <td>
          @if(question.rightAnswer) {

          <span class="bg-green-500 p-2 rounded-sm text-white font-bold ">
            {{ question.options }}</span
          >
          } @else { @if( question?.options ) {
          <span class="bg-red-500 p-2 rounded-sm text-white font-bold">
            {{ question?.options }}
          </span>

          } @else {
          <span class="p-2 rounded-sm text-black font-bold">-----</span>
          } }
        </td>
        <td class="font-bold text-xl text-blue-500">{{ question.point }}</td>
        <td>
          @if(question.rightAnswer ) {
          <span class="bg-green-500 p-2 rounded-sm text-white font-bold"
            >Doğru</span
          >
          } @else {
          <span class="bg-red-500 p-2 rounded-sm text-white font-bold"
            >Yalnış</span
          >
          }
        </td>
      </tr>
      }
    </tbody>
  </nz-table>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  public questionList = input.required<any[]>({ alias: 'data' });
}
