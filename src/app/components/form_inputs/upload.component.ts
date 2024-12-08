import { HttpVacancyService } from '#services';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form
      [formGroup]="validateForm"
      (ngSubmit)="onSubmit()"
      class="flex flex-col gap-2"
    >
      <label
        for="fileInput"
        class="cursor-pointer flex flex-col items-center justify-center  p-2 bg-[#1890ff] text-white font-bold rounded-md  w-[100px] h-[50px]"
      >
        CV-ni üklə

        <input
          class="hidden"
          type="file"
          id="fileInput"
          accept=".pdf,.docx"
          (change)="onFileChange($event)"
        />
      </label>

      @if(fileError) {
      <span class="text-red-500 font-extrabold">{{ fileError }}</span>
      }
    </form>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent {
  protected validateForm: FormGroup;
  fileError: string | null = null;
  protected vacancyService = inject(HttpVacancyService);
  protected activeRoute = inject(ActivatedRoute);
  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      file: [null, Validators.required],
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (!file) {
      this.fileError = 'Fayl seçilməyib';
      this.validateForm.patchValue({ file: null });
      return;
    }

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowedTypes.includes(file.type)) {
      this.fileError = 'Yalnız PDF və DOCX faylları  yukləyə bilərsiniz.';
      this.validateForm.patchValue({ file: null });
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      this.fileError = 'Maksimum fayl ölçüsü 5MB.';
      this.validateForm.patchValue({ file: null });
      return;
    }

    this.fileError = null;
    this.validateForm.patchValue({ file });
    this.onSubmit();
  }

  onSubmit(): void {
    if (!this.validateForm.invalid) {
      const file = this.validateForm.get('file')?.value;
      const formData = new FormData();
      formData.append('file', file);
      const id = this.activeRoute.snapshot.params['id'];
      const answerId = this.activeRoute.snapshot.params['resultId'];

      this.vacancyService.applayCV(id, answerId, formData).subscribe((data) => {
        console.log('ddddd', data);
      });
    }
  }
}
