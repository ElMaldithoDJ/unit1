import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridModule } from './components/grid/grid.module';
import { DragDropAunserModule } from './components/drag-drop/drag-drop.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    DragDropAunserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
