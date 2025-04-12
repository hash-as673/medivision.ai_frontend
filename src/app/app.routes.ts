import { Routes } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ResultsComponent } from './results/results.component';

export const appRoutes: Routes = [
  { path: '', component: FileUploadComponent }, 
  { path: 'results', component: ResultsComponent } 
];