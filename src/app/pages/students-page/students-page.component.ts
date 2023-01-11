import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from 'src/app/models/students.models';
import { StudentDialogComponent } from 'src/app/shared/components/student-dialog/student-dialog.component';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent {
  students: Student[] = [
    new Student(1,"Lionel","Messi","10",true),
    new Student(2,"Angel","Di maria","11",true),
    new Student(3,"Alexis","Mac Allister","20",true),
    new Student(4,"Emiliano","Martinez","23",true), 
    new Student(5,"Julian","Alvarez","9",true),  
    new Student(6,"Kylian","Mbappe","1",false),  
  ]

  displayedColumns = ['id','apellido','nombre','nota','esActivo','editar','eliminar']

  constructor(private readonly dialogService: MatDialog){}

  addStudent(){
   const dialog = this.dialogService.open(StudentDialogComponent)

   dialog.afterClosed().subscribe((value) =>{
    if (value){
      const lastId = this.students[this.students.length - 1]?.id;
      this.students = [...this.students, new Student(lastId+1, value.nombre, value.apellido, value.nota, true)];
    }
   })
  }

  removeStudent(student: Student){
    this.students = this.students.filter((stu) => stu.id !== student.id);
  }

  editStudent(student: Student){
    const dialog = this.dialogService.open(StudentDialogComponent, {
      data: student,
    })

    dialog.afterClosed().subscribe((data) =>{
      if (data){
        this.students = this.students.map((stu) => stu.id === student.id?{...stu, ...data}:stu)
      }
    })
  }
}
