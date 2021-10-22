import { useState } from "react"
import { useSelector, useDispatch} from "react-redux"

export default function TodoInput() {
  const lastId = useSelector(state => state.lastId)
  const todoDone = useSelector(state => state.todos.every((todo) => {
    return todo.done === true 
  }))
  const dispatch = useDispatch()

  const [inputValue, setValue] = useState("")

  function handleValue(e) {
    setValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({type: 'addTodo', text: inputValue, id: lastId})
    setValue('')
  }

  function handleAll(e) {
    dispatch({type: 'todosChecked', checked: e.target.checked})
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="checkbox" onChange={handleAll} checked={todoDone}/>
      <input type="text" value={inputValue} onChange={handleValue}/>
      <button>submit</button>
    </form>
  )
}
