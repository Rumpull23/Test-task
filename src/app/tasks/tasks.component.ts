import {Component, OnInit} from '@angular/core';
import {Task} from "../task";
import {Tasks} from "../mock-tasks"
import {FormControl, FormGroup} from "@angular/forms";
import {TaskDetailComponent} from "../task-detail/task-detail.component";
import {MatDialog} from "@angular/material/dialog";
import {Select, Store} from "@ngxs/store";
import {SetList} from "../store/actions/main.actions";
import {merge, Observable} from "rxjs";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class  TasksComponent  implements OnInit{
  @Select((state: any) => state.main.taskList.list)
  list$!: Observable<Task[]>;

  filteredList: Task[] | null = null;
  tasks = Tasks;
  selectedTask?: Task;

  form = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    timeFilter: new FormControl(),
    statusFilter: new FormControl(),
    categoryFilter: new FormControl()
  })
constructor(private dialog:MatDialog, private store: Store) {

}

ngOnInit() {
  this.store.dispatch(new SetList(Tasks))
  this.store.select(state => state.main.taskList.model).subscribe((val: any) => {
    this.filteringList()
  } )
}

  onSelect(task: Task): void {
    this.dialog.open(TaskDetailComponent, {
      data: {
        id: task.id,
        title: task.title,
        time: task.time,
        date: task.date,
        category: task.category,
        status: task.status,
        onCloseCallBack: (task: Task) => this.onClose(task)
      },
      maxHeight: '1500px',
      width: '1000px',
      disableClose: true,
      autoFocus: false,
    });
    this.selectedTask = task;
  }
  onAddClick() {
    this.dialog.open(TaskDetailComponent, {
      data: {
        id: -1,
        title: '',
        time: '',
        date: '',
        category: '',
        status: '',
        onCloseCallBack: (task: Task) => this.addTask(task)
      },
      maxHeight: '1500px',
      width: '1000px',
      disableClose: true,
      autoFocus: false,
    });
  }
  onClose(task: Task) {
    const list = this.store.selectSnapshot(state => state.main.taskList.list);
    const index = list.findIndex((el: Task) => el.id === task.id);
    if (index >= 0) {
      list[index].title = task.title;
      list[index].time = task.time;
      list[index].date = task.date;
      list[index].category = task.category;
      list[index].status = task.status;
    }
    this.store.dispatch(new SetList(list))
  }

  addTask(task: Task) {
    const list = this.store.selectSnapshot(state => state.main.taskList.list);
    list.push({...task, id:list.length+1});
    this.store.dispatch(new SetList(list))
  }

  onDeleteClick(task: Task) {
    const list = this.store.selectSnapshot(state => state.main.taskList.list);
    this.store.dispatch(new SetList(list.filter((el: Task) => el.id !== task.id)))
    this.filteringList()
  }



  filteringList() {
    const formData = this.store.selectSnapshot(state =>  state.main.taskList.model)
    if (!((formData.startDate && formData.endDate) || formData.timeFilter || formData.statusFilter || formData.categoryFilter )) {
      return
    }
    let list = this.store.selectSnapshot(state => state.main.taskList.list);
    if (formData.startDate && formData.endDate) {
      const startDate =  new Date(this.form.get('startDate')?.value)
      const endDate = new Date(this.form.get('endDate')?.value)
      if(this.form.get('startDate')?.value && this.form.get('endDate')?.value){
        list = list.filter((el: Task) => {
          const elDate = new Date(el.date)
          return ((elDate.getTime() - endDate.getTime() <= 0) && (elDate.getTime() - startDate.getTime() >= 0))
        })
      }
    }
    if (formData.timeFilter ) {
      list = list.filter((el:Task) => el.time === formData.timeFilter)
    }
    if (formData.statusFilter ) {
      list = list.filter((el:Task) => el.status === formData.statusFilter)
    }
    if (formData.categoryFilter ) {
      list = list.filter((el:Task) => el.category === formData.categoryFilter)
    }
    this.filteredList = list
  }

  clearFilter() {
    this.filteredList = null
  }
}
