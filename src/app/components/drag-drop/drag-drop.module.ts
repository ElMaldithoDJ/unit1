import { NgModule } from "@angular/core";
import { DragDropComponent } from "./drag-drop.component";
import { CommonModule } from "@angular/common";
import { DragDropModule } from '@angular/cdk/drag-drop'
import { GridModule } from "../grid/grid.module";
import { DragListComponent } from "./drag-list/drag-list.component";

@NgModule({
    declarations: [
        DragDropComponent,
        DragListComponent
    ],
    imports: [
        CommonModule,
        DragDropModule,
        GridModule
    ],
    exports: [
        DragDropComponent
    ]
})
export class DragDropAunserModule {}