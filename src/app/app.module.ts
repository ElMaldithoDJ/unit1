import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { GridModule } from './components/colums/grid.module';

@NgModule({
  declarations: [
    AppComponent,
    DragDropComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
