import { NgModule } from '@angular/core';
import { GridComponent } from './grid.component';
import { ColumComponent } from './colum.component';
import { CommonModule } from '@angular/common';
import { GridService } from './grid.service';

@NgModule({
  declarations: [GridComponent, ColumComponent],
  imports: [CommonModule],
  exports: [GridComponent, ColumComponent],
  providers: [GridService],
})
export class GridModule {}
