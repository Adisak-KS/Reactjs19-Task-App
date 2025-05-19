import React from "react";
import "./Item.css"
import { BsTrash } from "react-icons/bs";
import { MdEditSquare } from "react-icons/md";

function Item(props) {
  const {data, deleteTask,editTask} = props


  return (
    <div className="list-item">
      <p className="title">{data.title}</p>
      <div className="button-container">
        <button className="btn btn-danger" onClick={()=>deleteTask(data.id)}><BsTrash/></button>
        <button className="btn btn-warning" onClick={()=>{editTask(data.id)}}><MdEditSquare/></button>
      </div>
    </div>
  );
}

export default Item;
