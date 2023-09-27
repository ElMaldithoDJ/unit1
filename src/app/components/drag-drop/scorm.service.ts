import { Injectable } from '@angular/core';
import { ScormApiWrapper } from './util/scorm';

@Injectable()
export class ScormService {
  constructor(private scorm: ScormApiWrapper) {
    if (this.scorm.initialize()) {
      this.scorm.initialize();
      this.scorm.dataSet('cmi.core.score.min', '0');
      this.scorm.dataSet('cmi.core.score.max', '5');
    }
  }

  setScore(data: number): void {
    this.scorm.dataSet('cmi.core.score.raw', `${data}`);
  }

  stopScorm(): void {
    if(!this.scorm.terminate()) {
      this.scorm.terminate();
    }
  }
}
