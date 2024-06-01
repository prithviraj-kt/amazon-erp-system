import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
function warehouse() {
  const router = useRouter();
  const [data, setData] = useState({});
  useEffect(() => {
    authUser();
  }, []);
  const authUser = async () => {
    const auth = await localStorage.getItem("msg");
    if (auth != "success") {
      router.push("/login");
    }
  };
  useEffect(() => {
    getWareHouseData();
  }, []);
  const getWareHouseData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/getwarehouse`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let response = await res.json();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [newName, setNewName] = useState("");
  const handleChange = (e) => {
    setNewName(e.target.value);
    console.log(newName);
  };
  const deleteWarehouse = async (e) => {
    let wname = {};
    wname["name"] = e.name;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/deletewarehouse`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(wname),
        }
      );
      const response = await res.json();
      alert(response.msg);
      window.location.reload();
    } catch (error) {
      alert("Error occured");
    }
  };
  const addWarehouse = async () => {
    let addName = {};
    addName["name"] = newName;
    addName["value"] = 0;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/addwarehouse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addName),
        }
      );
      const response = await res.json();
      alert(response.msg);
      window.location.reload();
    } catch (error) {
      alert("Error occured");
    }
  };
  const [ware, setWare] = useState({});
  const transferStock = (e) => {
    console.log(ware);
    setWare({ ...ware, [e.target.name]: e.target.value });
  };

  const transfer = async () => {
    const wval = data.find((i) => i.name === `${ware.fromware}`);
    console.log(wval.value);
    console.log(ware.stockValue);
    if (parseInt(wval.value) < parseInt(ware.stockValue)) {
      alert(`Not enough stocks in ${wval.name}`);
    } else {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/transferstock`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ware),
          }
        );
        const response = await res.json();
        alert(response.msg);
        window.location.reload();
      } catch (error) {
        alert("Error occured");
      }
    }
  };

  return (
    <div>
      <section class="text-gray-600 body-font">
        <div className="container">
          <div className="row flex justify-center">
            <div className="col-lg-6">
              <div class="text-center mb-20">
                <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                  Warehouses
                </h1>
              </div>

              <div>
                
                {Object.keys(data).map((item) => {
                  return (
                    <div>
                      <div class="p-2 w-full ">
                        <div class="bg-gray-100 rounded flex p-4 h-full items-center ">
                          <span class="w-full flex justify-between items-center ">
                            <p>
                              {data[item].name} - {data[item].value}
                            </p>
                            <button
                              onClick={() => deleteWarehouse(data[item])}
                              class="  text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-800 rounded text-lg"
                            >
                              Delete
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                <div class="p-2 w-full ">
                  <div class="bg-gray-100 rounded flex p-4 h-full items-center ">
                    <span class="w-full flex justify-between items-center ">
                      <div class="relative mb-4">
                        <label
                          for="full-name"
                          class="leading-7 text-sm text-gray-600"
                        >
                          Warehouse Name
                        </label>
                        <input
                          type="text"
                          id="full-name"
                          name="full-name"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                      <button
                        onClick={() => addWarehouse()}
                        class="text-white bg-blue-500 border-0  px-8 focus:outline-none hover:bg-blue-800 rounded text-lg h-10"
                      >
                        Add
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div class="p-2 w-full mb-10">
                  <div class="bg-gray-100 rounded flex p-4 h-full items-center ">
                    <span class="w-full flex justify-between items-center ">
                      <div class="w-50 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                        <select
                          class=""
                          name="fromware"
                          onChange={(e) => transferStock(e)}
                        >
                          <option value="none">FROM</option>
                          {Object.keys(data).map((wname) => {
                            return (
                              <option value={`${data[wname].name}`}>
                                {data[wname].name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div class="w-50 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                        <select class="" onChange={(e) => transferStock(e)}>
                          <option value="none">TO</option>
                          {Object.keys(data).map((wname) => {
                            return (
                              <option
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                value={`${data[wname].name}`}
                              >
                                {data[wname].name}
                              </option>
                            );
                          })}{" "}
                        </select>
                      </div>
                      <div class="relative mb-4">
                        <label
                          for="full-name"
                          class="leading-7 text-sm text-gray-600"
                        >
                          Stock value
                        </label>
                        <input
                          type="text"
                          id="full-name"
                          name="stockValue"
                          onChange={(e) => {
                            transferStock(e);
                          }}
                          class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                      <button
                        onClick={() => transfer()}
                        class="text-white bg-blue-500 px-8 focus:outline-none hover:bg-blue-800 rounded "
                      >
                        Transfer stock
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default warehouse;
