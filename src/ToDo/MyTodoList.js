// not done today 
// node module file not attache to this labtest file plz download it


import React, { useState, useEffect } from "react";

import "./style.css";

// get the localStorage data back
const getLocalData = () => {
  // const lists = localStorage.getItem("mytodolist");
const lists=0;
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
  const baseURL = "http://localhost:8003/getalltodolist"
  useEffect(() => {
 
    getAllData()
  }, []);


  const getAllData = async()=>{
  
   
   try {
     const res = await fetch(`${baseURL}`, {
         method: "GET",
         mode: "cors",
         headers: {
           "Content-Type": "application/json",
         },
       });
       const itemdata = await res.json();
       console.log(itemdata,"hjj")
      //  return itemdata;
      console.log(itemdata)
       setItems(itemdata)
 } catch (error) {
   console.error("Error adding data: ", error);
 }
  }


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
          return itemdata;
    } catch (error) {
      console.error("Error adding data: ", error);
    }
  };





  // add the items fucnction
  const addItem = () => {
    if (!inputdata) {
      alert("plz fill the data");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, taskname: inputdata };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        taskid: new Date().getTime().toString(),
        taskname: inputdata,
      };
      setItems([...items, myNewInputData]);
      saveData(myNewInputData)
      getAllData()
      setInputData("");
    }
  };

  //edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.taskid === index;
    });
    setInputData(item_todo_edited.taskname);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // how to delete items section
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.taskid !== index;
    });
    setItems(updatedItems);
  };

  // remove all the elements
  const removeAll = () => {
    setItems([]);
  };

  // adding localStorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

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
                      onClick={() => editItem(curElem.taskid)}></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.taskid)}></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* rmeove all button  */}
          <div className="showItems">
            <button
              className="btn btneffect"
              data-sm-link-text="Remove All"
              onClick={removeAll}>
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTodoList;
