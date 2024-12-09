import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute } from '@angular/router';
import { HttpVacancyService, UserService } from '#services';
import { Subscription } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  FormGroup,
  Validators,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
//--

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    @if(disabled()) {
    <div
      class=" flex flex-col items-center justify-center  p-2 bg-green-500 text-white font-bold rounded-md  w-[150px] h-[50px]"
    >
      CV-niz yuklenib
    </div>

    } @else {
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
          [disabled]="disabled()"
          id="fileInput"
          accept=".pdf,.docx"
          (change)="onFileChange($event)"
        />
      </label>

      @if(fileError) {
      <span class="text-red-500 font-extrabold">{{ fileError }}</span>
      }
    </form>
    }
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent {
  protected subscription$: Subscription | null = null;
  protected fileError: string | null = null;
  protected validateForm: FormGroup;
  protected disabled = signal<boolean>(false);
  //
  protected vacancyService = inject(HttpVacancyService);
  protected notification = inject(NzNotificationService);
  protected activeRoute = inject(ActivatedRoute);
  protected userService = inject(UserService);
  //
  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      file: [null, Validators.required],
    });
    this.userService.sendCv.subscribe((value) => {

      if (value) {
        this.disabled.set(value);

      }
    })
  }

  protected onFileChange(event: Event): void {
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

  protected onSubmit(): void {
    if (!this.validateForm.invalid) {
      const file = this.validateForm.get('file')?.value;
      const formData = new FormData();
      formData.append('file', file);
      const id = this.activeRoute.snapshot.params['id'];
      const answerId = this.activeRoute.snapshot.params['resultId'];

      this.subscription$ = this.vacancyService
        .applayCV(id, answerId, formData)
        .subscribe(() => {
          this.createNotification();
          this.disabled.set(true);
        });
    }
  }

  protected createNotification(): void {
    this.notification.blank(
      'CV-ni yuklədi',
      'CV-ni yüklədi və təsdiqləndikdən sonra cavabını əldə edə bilərsiniz.'
    );
  }

  protected ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
