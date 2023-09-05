import { NgModule } from "@angular/core";
import { DragDropComponent } from "./drag-drop.component";
import { CommonModule } from "@angular/common";
import { DragDropModule } from '@angular/cdk/drag-drop'
import { DragListComponent } from "./drag-list/drag-list.component";
import { DragItemComponent } from "./drag-item/drag-item.component";
import { DropAreaComponent } from "./drop-area/drop-area.component";
import { GridModule } from "../grid/grid.module";

@NgModule({
    declarations: [
        DragDropComponent,
        DragListComponent,
        DragItemComponent,
        DropAreaComponent
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