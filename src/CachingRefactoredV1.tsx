import { useEffect, useState } from 'react'
import './App.css'

function Caching() {

  const [filterName, setFilterName] = useState("");
  const todos = ["today : a", "yesterday : b", "c"]; 
  const filter = (a : string) => a.toLowerCase().includes(filterName) ;

  return (
    <>
      <div className="">parent component</div>
      <div className="">
          Filter by
          <button onClick={e => setFilterName("today")}>Today</button>
          <button onClick={e => setFilterName("yesterday")} >Yesterday</button>
      </div>
      <TodoList todos={todos} filter={filter}/>
    </>
  )
}

export default Caching

const getFilteredTodos = (todos : string[], filter : (a : string) => boolean) => todos.filter(filter) ; 

const TodoList = ({ todos, filter } : { todos : string[], filter : (a : string) => boolean}) => {

    // const [newTodo, setNewTodo] = useState('');
    // 🔴 Avoid: redundant state and unnecessary Effect
    const visibleTodos = getFilteredTodos(todos, filter)

    console.log(visibleTodos);
    
    return <>
        {visibleTodos.map((v,i) => {
          return <div className="" key={i}>
            {v}
          </div>
        })}
    </>
}