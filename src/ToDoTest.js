import React, { useState } from "react";

const ToDoTest = () => {
  const [newRegistration, setnewRegistration] = useState({
    taskName: "",
  });
  const [records, setRecords] = useState([]);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    setnewRegistration({ ...newRegistration, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setRecords([...records, newRegistration]);
  

    setnewRegistration({ taskName: "" });
  };

  return (
    <div className="flex flex-col justify-center items-center text-white bg-gray-600 h-screen w-full text-lg">
      <h1 className="text-black ">To List</h1>
      <div  >
      <form className="row g-3 bg-violet-900 p-5" onSubmit={handleSubmit} >
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="inputPassword2" className="visually-hidden">
            Add you task
          </label>
          <input
            type="text"
            className="form-control text-black"
            placeholder="Task Name"
            onChange={handleInput}
            value={newRegistration.taskName}
            name="taskName"
            id="taskName"
          />
        </div>
        <div className="flex justify-center items-center pt-3">
          <button type="submit" className="btn btn-primary mb-3">
            Add Task
          </button>
        </div>
      </form>
      </div>
        <div className="w-98">
          {records.map((curElement, index) => {
            const { taskName} = curElement;
            return (
              <div key={index}  className="text-white flex border mb-1 ">
               

                <p className="p-2">{taskName}</p>
                <p className="p-2">✒</p>
                <p className="p-2">❌</p>
                
              </div>
            );
          })}
        </div>
    </div>
  );
};

export default ToDoTest;
