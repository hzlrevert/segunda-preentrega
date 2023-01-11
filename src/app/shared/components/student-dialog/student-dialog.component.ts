import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA }from '@angular/material/dialog';
import { Student } from 'src/app/models/students.models';
@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styles: [
  ]
})
export class StudentDialogComponent {
  nombreControl = new FormControl('',[Validators.required])
  apellidoControl = new FormControl('', [Validators.required])
  notaControl = new FormControl('', [Validators.required, Validators.maxLength(2), Validators.minLength(1)])
  studentForm = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    nota: this.notaControl,
  })

  constructor(private readonly dialoRef: DialogRef, @Inject(MAT_DIALOG_DATA) public data: Student | null, 
  ){
    console.log(data);
    if(data){
      this.studentForm.patchValue(data)
    }
  }

  close(){
    this.dialoRef.close()
  }
}
