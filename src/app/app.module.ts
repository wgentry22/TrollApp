import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TrollComponent } from './components/troll/troll.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BugReportComponent } from './components/bug-report/bug-report.component';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    TrollComponent,
    BugReportComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
