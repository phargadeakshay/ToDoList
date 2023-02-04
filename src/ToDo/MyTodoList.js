import React, { useState, useEffect } from "react";

import "./style.css";

// get the localStorage data back
const getLocalData = () => {
  // const lists = localStorage.getItem("mytodolist");
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
      console.log(itemdata, "hjj");
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
      <div >
        <div >
          <div>
            <p >Add Your List Here😊</p>
          </div>
          <div >
            <input
              type="text"
              placeholder="✍ Add Item"
              
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <span  onClick={addItem}></span>
            ) : (
              <span  onClick={addItem}>Add</span>
            )}
          </div>
          {/* show our items  */}
          <div >
            {items.map((curElem) => {
              return (
                <div key={curElem.taskid}>
                  <h3>{curElem.taskname}</h3>
                  <div >
                    <p
                     
                      onClick={() => editItem(curElem.taskid)}
                    >edit</p>
                    <p
                    
                      onClick={() => deleteItem(curElem.taskid)}
                    >Del</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* rmeove all button  */}
          <div >
            <button
              
             
              onClick={removeAll}
            >
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTodoList;
