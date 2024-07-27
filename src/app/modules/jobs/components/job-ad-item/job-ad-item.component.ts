import { Component } from '@angular/core';

@Component({
  selector: 'app-job-ad-item',
  templateUrl: './job-ad-item.component.html',
  styleUrls: ['./job-ad-item.component.scss']
})
export class JobAdItemComponent {
  skills: string[] = ["magic", "alchemy", "wizardry"];
}
