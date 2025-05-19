import { useState, useEffect } from 'react';
import './App.css';
import AddForm from './components/AddForm';
import Header from './components/Header';
import Item from './components/Item';


function App() {

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || [])
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null)
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])


  function deleteTask(id) {
    const result = tasks.filter(item => item.id !== id);
    setTasks(result)
  }

  function saveTask(e) {
    e.preventDefault()

    if (!title) {
      alert("กรุณาป้อนข้อมูล")
    } else if (editId) {
      // แก้ไขรายการเดิม
      const updateTask = tasks.map((item) => {
        if (item.id === editId) {
          // รายการใดมี id ตรงกับ id ที่แก้ไข
          return { ...item, title: title }
        }
        return item;
      })

      setTasks(updateTask)
      setEditId(null)
      setTitle("")
    } else {

      // เพิ่มรายการใหม่
      const newTask = {
        id: Math.floor(Math.random() * 1000),
        title: title
      }

      setTasks([...tasks, newTask])
      setTitle("")
    }
  }

  function editTask(id) {
    setEditId(id)
    const editTask = tasks.find((item) => item.id === id)
    setTitle(editTask.title)
  }

  return (
    <div className={"App " + theme}>
      <Header theme={theme} setTheme={setTheme} />

      <div className='container'>
        <AddForm title={title} setTitle={setTitle} saveTask={saveTask} editId={editId} />
        <section>
          {
            tasks.map((data) => (
              <Item key={data.id} data={data} deleteTask={deleteTask} editTask={editTask} />
            ))
          }
        </section>
      </div>
    </div>
  );
}

export default App;
