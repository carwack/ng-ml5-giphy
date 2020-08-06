import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { GiphyService } from './services/giphy.service';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    GiphyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
