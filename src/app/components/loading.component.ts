import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  template: `<span class="loader"></span> `,
  styles: `
  .loader {
    width: 88px;
    height: 88px;
    border: 8px solid #FFF;
    border-bottom-color: #1890ff;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {}
