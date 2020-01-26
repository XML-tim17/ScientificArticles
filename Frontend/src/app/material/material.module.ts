import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'
import {MatToolbarModule, MatButtonModule, MatInputModule, MatTabsModule, MatTableModule, MatCheckboxModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    MatSnackBarModule,
  ],
  exports: [
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    MatSnackBarModule,
  ]
})
export class MaterialModule { }
