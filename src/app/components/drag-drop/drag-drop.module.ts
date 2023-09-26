import { NgModule } from "@angular/core";
import { DragDropComponent } from "./drag-drop.component";
import { CommonModule } from "@angular/common";
import { DragDropModule } from '@angular/cdk/drag-drop'
import { GridModule } from "../grid/grid.module";

@NgModule({
    declarations: [
        DragDropComponent,
    ],
    imports: [
        CommonModule,
        DragDropModule,
        GridModule,
    ],
    exports: [
        DragDropComponent
    ]
})
export class DragDropAunserModule {}