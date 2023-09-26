import { Injectable } from "@angular/core";
import { ScormApiWrapper } from "./util/scorm";

@Injectable()
export class ScormService {

  constructor(
    private scorm: ScormApiWrapper
  ) {}

  setScore(data: string): void {
    this.scorm.getApi()
  }

}