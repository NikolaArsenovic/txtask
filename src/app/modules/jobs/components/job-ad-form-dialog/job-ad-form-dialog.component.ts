import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { JobAdDialogData } from 'src/app/core/models/job-ad-dialog-data.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { JobService } from 'src/app/core/services/job.service';
import { JobAd } from 'src/app/core/models/job-ad.model';

@Component({
  selector: 'app-job-ad-form-dialog',
  templateUrl: './job-ad-form-dialog.component.html',
  styleUrl: './job-ad-form-dialog.component.scss'
})
export class JobAdFormDialogComponent {
  jobService: JobService = inject(JobService);

    get jobAdStatuses(): { value: string, text: string }[] {
      const selectStatuses = [];
      if(this.data.jobAd) {

      selectStatuses.push({
        text: this.data.jobAd?.status.charAt(0).toUpperCase() + this.data.jobAd?.status.slice(1),
        value: this.data.jobAd?.status
      });

        const nextStatus = this.jobService.getNextStatus(this.data.jobAd.status);
        if(nextStatus) {
          selectStatuses.push({
            text: nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1),
            value: nextStatus
          });
        }
      }

      return selectStatuses;
    }

  addOnBlur = true;
  separatorKeysCodes = [ENTER, COMMA] as const;
  saveButtonDisabled = false;

  jobAdForm = new FormGroup({
    id: new FormControl(this.data.jobAd?.id),
    title: new FormControl(this.data.jobAd ? this.data.jobAd.title : '', [Validators.required]),
    description: new FormControl(this.data.jobAd ? this.data.jobAd.description : '', [Validators.required]),
    status: new FormControl(this.data.jobAd ? this.data.jobAd.status : 'draft'),
    skills: new FormControl(this.data.jobAd ? this.data.jobAd.skills : [], [Validators.required]),
  });

  get skills() {
    return this.jobAdForm.get('skills');
  }

  get skillsValue(): string[] | null{
    return this.skills ? this.skills.value : [];
  }

  constructor(
    @Optional() public dialogRef: MatDialogRef<JobAdFormDialogComponent>,
    @Optional() @Inject(DIALOG_DATA) public data: JobAdDialogData) {}


  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.saveButtonDisabled = true;
    if(this.data.jobAd) {
      this.jobService.updateJobAd(this.jobAdForm.value as JobAd).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.jobService.saveJobAd(this.jobAdForm.value as JobAd).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add new skill
    if (value && this.skills) {
      const skills: string[] | null= this.skills.value;
      if(!skills?.includes(value)) {
        skills?.push(value);
        this.skills.setValue(skills);
      }
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(skill: string): void {
    if(this.skills) {
      const skills: string[] | null= this.skills.value;
      if(skills) {
        const index = skills.indexOf(skill);
        skills.splice(index, 1);
      }

      this.skills.setValue(skills);
    }
  }

  edit(skill: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove skill if it no longer has a value
    if (!value) {
      this.remove(skill);
      return;
    }

    // Edit existing skill
    if(this.skills) {
      const skills: string[] | null= this.skills.value;
      if(skills) {
        const index = skills.indexOf(skill);
        if (index >= 0) {
          skills[index] = value;

          this.skills.setValue(skills);
        }

      }
    }
  }

  trackByFn(index: number): number{
    return index;
  }
}
