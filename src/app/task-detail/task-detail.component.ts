import {Component, Inject, Input, OnInit} from '@angular/core';
import {Task} from "../task";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Tasks} from "../mock-tasks";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

interface DialogData extends Task {
  onCloseCallBack?: (task: Task) => void;
}


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})

export class TaskDetailComponent  implements OnInit {
  form = new FormGroup({
    titleControl:  new FormControl<string>( '', [Validators.required, Validators.minLength(5)]),
    dateControl: new  FormControl<string | Date>('', [Validators.required]),
    timeControl:  new FormControl<string | number>('', [Validators.required]),
    statusControl:  new FormControl<string>('', [Validators.required]),
    categoryControl:  new FormControl<string>('', [Validators.required])
    }

  )


  tasks = Tasks;
  constructor(  public dialogRef: MatDialogRef<TaskDetailComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.form.get('titleControl')?.setValue(this.data.title);
    this.form.get('dateControl')?.setValue(new Date(this.data?.date));
    this.form.get('timeControl')?.setValue(this.data.time);
    this.form.get('statusControl')?.setValue(this.data.status);
    this.form.get('categoryControl')?.setValue(this.data.category);
  }

  // startDate = new Date(2010, 0, 1);

  ngOnInit() {

  }

  compareFunction(o1:any, o2: any) {
    return o1 === o2
  }

  close(e:Event) {
    this.form.markAllAsTouched();
    if (this.form.status === 'INVALID') {
      e.preventDefault();
      e.stopPropagation()
      return
    }
    if (this.data.onCloseCallBack){
      this.data.onCloseCallBack(
        {
          id: this.data.id,
          title: this.form.get('titleControl')!.value || '',
          time: this.form.get('timeControl')!.value || '',
          date: this.form.get('dateControl')!.value || '',
          category: this.form.get('categoryControl')!.value || '',
          status: this.form.get('statusControl')!.value || '',
        }
      )
    }
    this.dialogRef.close
  }
}
