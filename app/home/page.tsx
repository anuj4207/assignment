"use client";
import React, { useState, useEffect } from "react";
import "./app.css"; // Add your custom styling
import { add, getData, update } from "./api/route";

const Page = () => {
  // use state for reszing 3 components
  const initialWidth = window.innerWidth / 2;
  const [width1, setWidth1] = useState(initialWidth);
  const [width2, setWidth2] = useState(initialWidth);
  const [width3, setWidth3] = useState(initialWidth * 2);
  const [height1, setHeight1] = useState(200);
  const [height2, setHeight2] = useState(200);
  const [height3, setHeight3] = useState(300);
  const [isResizing, setResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [type, setType] = useState("n");
  const [resizingComponent, setResizingComponent] = useState(null);

  //use state for data operations
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [addCount, setAddCount] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [dataA, setDataA] = useState([]);
  const [error, setError] = useState(false);
  const [idu, setIdu] = useState(0);
  //useEffect for updating count and data
  useEffect(() => {
    data();
  }, []);
  useEffect(() => {}, [addCount, updateCount, dataA]);

  //function for handling data input
  async function handleAdd() {
    if (value !== "") {
      let res = await add(value);
      if (res.msg === "success") {
        setError(false);
        setValue("");
        setAddCount(addCount + 1);
        data();
      }
    } else {
      setError(true);
    }
  }
  //function for fetching count
  async function data() {
    let res = await getData();
    if (res.msg === "success") {
      setDataA(res.data);
    }
  }
  //update count
  async function updateData(id: number) {
    if (value2 !== "") {
      let res = await update(value2, id);

      if (res.msg === "success") {
        setError(false);
        setValue2("");
        setUpdateCount(updateCount + 1);
        data();
      }
    } else {
      setError(true);
    }
  }

  const handleMouseDown = (e, component, typ) => {
    setResizing(true);
    setResizingComponent(component);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setType(typ);
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    if (resizingComponent === "component1") {
      const newWidth1 = width1 + deltaX;
      const newWidth2 = width2 - deltaX;
      const newHeight1 = height1 + deltaY;

      if (newWidth1 >= 50 && newWidth2 >= 50) {
        setWidth1(newWidth1);
        setWidth2(newWidth2);
      }

      if (newHeight1 >= 50) {
        setHeight1(newHeight1);
      }
    } else if (resizingComponent === "component2") {
      const newWidth2 = width2 - deltaX;
      const newWidth1 = width1 + deltaX;
      const newHeight2 = height2 + deltaY;

      if (newWidth2 >= 50 && newWidth1 >= 50) {
        setWidth2(newWidth2);
        setWidth1(newWidth1);
      }

      if (newHeight2 >= 50) {
        setHeight2(newHeight2);
      }
    } else if (resizingComponent === "component3") {
      if (type === "n") {
        const newHeight3 = height3 - deltaY;
        if (newHeight3 >= 50) {
          setHeight3(newHeight3);
        }
      } else if (type === "s") {
        const newHeight3 = height3 + deltaY;
        if (newHeight3 >= 50) {
          setHeight3(newHeight3);
        }
      }
      const newWidth3 = width3 - deltaX;

      setWidth3(newWidth3);
    }

    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseUp = () => {
    setResizing(false);
    setResizingComponent(null);
  };

  // Attach event listeners to the document for resizing
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, resizingComponent]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row  m-10  w-screen">
        {/* first resizable component */}
        <div
          className="resizable-component bg-lightPink mx-4 rounded-xl"
          style={{
            width: `${width1}px`,
            height: `${height1}px`,
            marginRight: "5px",
          }}
        >
          <div
            className="resizer top"
            onMouseDown={(e) => handleMouseDown(e, "component1", "n")}
          />
          <div
            className="resizer left"
            onMouseDown={(e) => handleMouseDown(e, "component1", "e")}
          />
          <div
            className="resizer right"
            onMouseDown={(e) => handleMouseDown(e, "component1", "w")}
          />
          <div
            className="resizer bottom"
            onMouseDown={(e) => handleMouseDown(e, "component1", "s")}
          />

          {/* Your resizable content goes here */}
          <div className="flex flex-col justify-center mt-4   items-center drop-shadow-xl">
            <input
              type="text"
              placeholder="Add some data for table"
              className="bg-white border-2 rounded-md p-2"
              value={value}
              onChange={(e) => {
                e.preventDefault();
                setValue(e.target.value);
              }}
            ></input>
            <button
              className="p-2 border-2 bg-lightBlue mt-2 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                handleAdd();
              }}
            >
              Add Data
            </button>
            {error ? (
              <div className="text-white text-sm">Can't add empty data</div>
            ) : (
              <div className="hidden"></div>
            )}
          </div>
        </div>
        {/* second resizable component */}
        <div
          className="resizable-component bg-lightBlue mx-4 rounded-xl"
          style={{ width: `${width2}px`, height: `${height2}px` }}
        >
          <div
            className="resizer top"
            onMouseDown={(e) => handleMouseDown(e, "component2", "n")}
          />
          <div
            className="resizer left"
            onMouseDown={(e) => handleMouseDown(e, "component2", "e")}
          />
          <div
            className="resizer right"
            onMouseDown={(e) => handleMouseDown(e, "component2", "w")}
          />
          <div
            className="resizer bottom"
            onMouseDown={(e) => handleMouseDown(e, "component2", "s")}
          />

          {/* Your resizable content goes here */}
          <div className="flex flex-col justify-center mt-4   items-center drop-shadow-xl">
            <h1 className="font-semibold">Add counter {addCount}</h1>
            <h1 className="font-medium">Update counter {updateCount}</h1>
          </div>
        </div>
      </div>
      {/* third resizable component */}
      <div className="flex flex-row  m-10  w-screen">
        <div
          className="resizable-component mx-4 w-screen bg-text text-white rounded-2xl drop-shadow-xl"
          style={{
            width: `${width3}px`,
            height: `${height3}px`,
            marginRight: "5px",
          }}
        >
          <div
            className="resizer top"
            onMouseDown={(e) => handleMouseDown(e, "component3", "n")}
          />
          <div
            className="resizer left"
            onMouseDown={(e) => handleMouseDown(e, "component3", "e")}
          />
          <div
            className="resizer right"
            onMouseDown={(e) => handleMouseDown(e, "component3", "w")}
          />
          <div
            className="resizer bottom"
            onMouseDown={(e) => handleMouseDown(e, "component3", "s")}
          />

          {/* Your resizable content goes here */}
          <div className="flex flex-col justify-center mt-4   items-center ">
            <table>
              <tr>
                <th className="px-4">Id</th>
                <th className="px-4">Data</th>
                <th className="px-4">Action</th>
              </tr>
              {dataA.length == 0 ? (
                <></>
              ) : (
                dataA.map((v, i) => {
                  return (
                    <tr key={v.id} className="">
                      <td key={v.id * 10} className="px-4">
                        {v.id}
                      </td>
                      <td key={v.id * 100} className="px-4">
                        {v.mydata}
                      </td>
                      <td key={v.id * 1000} className="flex flex-row px-4">
                        <input
                          key={v.id * 10000}
                          type="text"
                          placeholder="Update"
                          className="bg-white border-2 text-sm rounded-md p-1 text-lightBlueBg w-20 my-2"
                          value={v.id === idu ? value2 : "Update"}
                          onSelect={(e) => {
                            e.preventDefault();
                            setIdu(v.id);
                          }}
                          onChange={(e) => {
                            e.preventDefault();
                            setValue2(e.target.value);
                          }}
                        ></input>
                        <button
                          key={v.id}
                          className="p-1 text-sm border-2 bg-lightBlue mt-2 rounded-md my-2 mx-2"
                          onClick={(e) => {
                            e.preventDefault();
                            updateData(v.id);
                          }}
                        >
                          Update Data
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
