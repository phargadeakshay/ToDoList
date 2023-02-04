import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";
const getLocalData = () => {
  const lists = 0;
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const MyTodoList = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const baseURL = "http://localhost:8003/getalltodolist";
  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const res = await fetch(`${baseURL}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const itemdata = await res.json();
      //  console.log(itemdata,"hjj")
      //  return itemdata;
      console.log(itemdata);
      setItems(itemdata);
    } catch (error) {
      console.error("Error adding data: ", error);
    }
  };

  const saveData = async (data) => {
    try {
      const res = await fetch(`${baseURL}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const itemdata = await res.json();
      // notify("task added succesfull")
      notify(itemdata, toast.success);

      return itemdata;
    } catch (error) {
      console.error("Error adding data: ", error);
    }
  };
  const updateData = async (data) => {
    try {
      const res = await fetch(`${baseURL}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const itemdata = await res.json();
      notify(itemdata, toast.success);
      return itemdata;
    } catch (error) {
      console.error("Error adding data: ", error);
    }
  };
  const deleteData = async (data) => {
    try {
      const res = await fetch(`${baseURL}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const itemdata = await res.json();
      notify(itemdata, toast.success);
      return itemdata;
    } catch (error) {
      console.error("Error adding data: ", error);
    }
  };

  // add the items fucnction
  const addItem = () => {
    if (!inputdata) {
      alert("please Enterthe data");
    } else if (inputdata && toggleButton) {
      items.map((curElem) => {
        if (isEditItem) {
          console.log(inputdata, "o", isEditItem, curElem.taskid);
          const editedData = {
            taskid: isEditItem,
            taskname: inputdata,
          };
          updateData(editedData);
          getAllData();
          return { ...curElem, taskname: inputdata };
        }
        return curElem;
      });

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        taskid: new Date().getTime().toString(),
        taskname: inputdata,
      };
      setItems([...items, myNewInputData]);
      saveData(myNewInputData);
      getAllData();
      setInputData("");
    }
  };

  //edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.taskid === index;
    });
    console.log(index, "eeeeeeeeeeeeeeeee");
    setInputData(item_todo_edited.taskname);
    setIsEditItem(index);
    setToggleButton(true);
  };
  const editItem1 = () => {
    const editedData = {
      taskid: isEditItem,
      taskname: inputdata,
    };
    updateData(editedData);
    getAllData();
  };

  // how to delete items section
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.taskid !== index;
    });
    const deleteId = {
      taskid: index,
    };
    deleteData(deleteId);
    setItems(updatedItems);
  };

  // remove all the elements
  const removeAll = () => {
    setItems([]);
  };

  const notify = (smg,code) =>code(smg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <div>
            <p className="headingtitle">Add Your List Here😊</p>
          </div>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          {/* show our items  */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.taskid}>
                  <h3>{curElem.taskname}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.taskid)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.taskid)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* rmeove all button  */}
          <div className="showItems">
            <button className="btn btneffect" onClick={removeAll}>
              <span>Remove All</span>
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default MyTodoList;
