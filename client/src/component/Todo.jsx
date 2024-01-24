import React, { useState } from 'react';
import './Todo.css';
import EditIcon from '../assert/icons/edit.svg';
import DeleteIcon from '../assert/icons/delete.svg';
import Radio from './Radio';

const Todo = () => {
  const [completed, setCompleted] = useState(false);
  const [desView, setDesView] = useState(false);
  const toggleCompleted = () => {
    setCompleted(!completed);
  };

  return (
    <>
    <div className='todo' >
      <div className="svg-container" onClick={toggleCompleted}>
      <Radio status={completed} />
      </div>
      <div className={`todo-title ${completed?'completed':''}`} onClick={()=>setDesView(!desView)}>Title</div>
      <div className='btns'>
        <img src={EditIcon} alt="Edit icon" className="edit-icon" />
        <img src={DeleteIcon} alt="Delete icon" className="delete-icon" />
      </div>
    </div>
      {desView && <p className="des">description.....</p>}
    </>
  );
};

export default Todo;

