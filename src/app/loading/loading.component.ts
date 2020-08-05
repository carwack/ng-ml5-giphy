import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
  <div class="loading">
    Model is loading...
    <img src="/assets/timer.svg" alt="Loading timer icon" />
  </div>
  `,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
}
