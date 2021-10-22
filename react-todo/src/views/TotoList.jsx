import { useSelector, useDispatch } from "react-redux"

export default function TodoList() {
  const state = useSelector(state => state)
  const show = useSelector(state => state.show)
  const dispatch =  useDispatch()

  function handleDelete(todoId) {
    dispatch({type: 'deleteTodo', id: todoId})
  }

  function handleChecked(todoId) {
    dispatch({type: 'todoChecked', id: todoId})
  }

  function handleShow(show) {
    dispatch({type: 'changeShow', show: show})
    if (state.show === 'schedule') {
      return state.todos.filter(it => !it.done)
    } else if (state.show === 'completed') {
      return state.todos.filter(it => it.done)
    } else {
      return state.todos
    }
  }

  function handleClear() {
    dispatch({type: 'clearCompleted'})
  }

  return (
    <div>
      <ul>
        {handleShow(show).map(todo => 
          <li key={todo.id}>
            <input type="checkbox" checked={todo.done} onChange={() => handleChecked(todo.id)} />
            <span>{todo.text}</span>
            <button onClick={() => handleDelete(todo.id)}>&times;</button>
          </li>
        )}
      </ul>
      <div>
        <label><input type="radio" onChange={() => handleShow('all')} checked={show === 'all'}/>all</label>
        <label><input type="radio" onChange={() => handleShow('completed')} checked={show === 'completed'}/>completed</label>
        <label><input type="radio" onChange={() => handleShow('schedule')} checked={show === 'schedule'}/>schedule</label>
        <button onClick={handleClear}>clear all completed</button>
      </div>
    </div>
  )
}
