import { useEffect, useState } from 'react'
import './App.css'

function Caching() {

  console.log('부모 호출됨');
  
  const [filterName, setFilterName] = useState("");
  const todos = ["today : a", "yesterday : b", "c"]; 
  const filter = (a : string) => a.toLowerCase().includes(filterName) ;

  useEffect(() => {
    
    return () => {console.log("cleanup Function is called")}
  }, [filterName]);
  
  return (
    <>
      <div className="">parent component</div>
      <div className="">
          Filter by
          {/* setState를 호출해도 똑같은 값으로 변경하면 함수 재호출 안됨 */}
          <button onClick={e => setFilterName("today")}>Today</button>
          <button onClick={e => setFilterName("yesterday")} >Yesterday</button>
      </div>
      {/* <TodoList todos={todos} filter={filter}/> */}
      {/* key값이 일정해도 자식을 무조건 호출함 */}
      {/* <TodoList 
      key={1} 
      todos={todos} filter={filter}/> */}

      <TodoList 
      // key={JSON.stringify(todos)} 
      todos={todos} filter={filter}/>      
    </>
  )
}

export default Caching

const getFilteredTodos = (todos : string[], filter : (a : string) => boolean) => todos.filter(filter) ; 

const TodoList = ({ todos, filter } 
                : { todos : string[], filter : (a : string) => boolean}) => {

    console.log('자식 호출됨');
    
    // const [newTodo, setNewTodo] = useState('');
    // 🔴 Avoid: redundant state and unnecessary Effect
    const [visibleTodos, setVisibleTodos] = useState<string[]>(todos);

    useEffect(() => {
      setVisibleTodos(getFilteredTodos(todos, filter));
    }, [todos, filter]);

    console.log(visibleTodos);
    
    return <>
        {visibleTodos.map((v,i) => {
          return <div className="" key={i}>
            {v}
          </div>
        })}
    </>
}