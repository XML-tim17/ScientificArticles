import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatToolbarModule, MatButtonModule, MatInputModule } from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class MaterialModule { }
