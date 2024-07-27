import { JobAd } from "./job-ad.model";

export interface JobAdDto extends JobAd {
  // DTO properties that are not part of the model
  createdAt: Date;
  updatedAt: Date;
}
