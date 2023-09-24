import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {SetList} from "./actions/main.actions";


@State<any>({
  name: 'main',
  defaults: {
      taskEdit: {
        model: null,
        dirty: false,
        status: '',
        errors: {},
      },
    taskList: {
      model: null,
      list: [],
      dirty: false,
      status: '',
      errors: {},
    },
  },
})
@Injectable()
export class MainState {
  constructor() {}

  @Action(SetList)
  SetList(ctx: StateContext<any>, { payload }: any) {
    const state = ctx.getState();
    ctx.patchState({
      taskList: {
        ...state.taskList,
        list: payload
      },
    });
  }
}
