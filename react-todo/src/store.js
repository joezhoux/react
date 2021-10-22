import { createStore } from 'redux'
import { produce } from 'immer'

const initialState = {
  show: 'all',
  idx: -1,
  lastId: 3,
  todos: [{
    text: 'eat',
    done: false,
    id: 1
  },{
    text: 'drink',
    done: true,
    id: 2
  }]
}

const mutations = {
  addTodo(draft, action) {
    draft.todos.push({
      text: action.text,
      done: false,
      id: action.id
    })
    draft.lastId++
  },
  deleteTodo(draft, action) {
    draft.todos = draft.todos.filter(it => it.id !== action.id)
  },
  todoChecked(draft, action) {
    draft.todos.forEach(it => {
      if(it.id === action.id) {
        it.done = !it.done
      }
    })
  },
  todosChecked(draft, action) {
    if(action.checked) {
      draft.todos.forEach(it => {
        if(!it.done) {
          it.done = true
        }
      })
    } else {
      draft.todos.forEach(it => {
        if(it.done) {
          it.done = false
        }
      })
    }
  },
  changeShow(draft, action) {
    draft.show = action.show
  },
  clearCompleted(draft) {
    draft.todos = draft.todos.filter(it => !it.done)
  }
}

const store = createStore(
  (state, action) => {
    const mutFunction = mutations[action.type]

    if (typeof mutFunction === 'function') {
      return produce(state, draft => {
        mutFunction(draft, action)
      })
    } else {
      return state
    }
  }, initialState)

export default store
