import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
function warehouse() {
  const router = useRouter();
  const { slug } = router.query;
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
      setData(response.msg);
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
    wname["name"] = e;
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
    ware["id"] = slug;
    setWare({ ...ware, [e.target.name]: e.target.value });
  };

  const transfer = async () => {
    //const temp = {};
    // temp["fromware"] = ware.fromware;
    // temp["toware"] = ware.toware;
    // temp["stockValue"] = ware.stockValue;

    const item = data.find((i) => i._id == `${ware.id}`);

    const wval = item.stock[0].warehouse.find(
      (i) => i.name == `${ware.fromware}`
    );
    console.log(wval);

    // console.log(ware.stockValue);
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
              {/* <div class="text-center mb-20">
                <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                  Warehouse {slug}
                </h1>
              </div> */}
              <div>
                {Object.keys(data).map((item) => {
                  return (
                    <div>
                      {data[item]._id == slug && (
                        <div class="p-2 w-full ">
                          <div class="text-center mb-20">
                            <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                              Warehouse
                            </h1>
                          </div>
                          <div class="bg-gray-100 rounded flex p-4 h-full items-center ">
                            <span class="w-full flex flex-column justify-between items-center ">
                              {Object.keys(data[item].stock[0].warehouse).map(
                                (w) => {
                                  return (
                                    <div className="flex w-full px-3 my-3 justify-between">
                                      <div>
                                        {data[item].stock[0].warehouse[w].name}{" "}
                                        -{" "}
                                        {data[item].stock[0].warehouse[w].value}
                                      </div>
                                      <div>
                                        <button
                                          onClick={() =>
                                            deleteWarehouse(
                                              data[item].stock[0].warehouse[w]
                                                .name
                                            )
                                          }
                                          class="  text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-800 rounded text-lg"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </span>
                          </div>
                          <div>
                            <div class="p-2 w-full mb-10">
                              <div class="bg-gray-100 rounded flex p-4 h-full items-center ">
                                <span class="w-full flex justify-between items-center ">
                                  <div className="row">
                                    <div className="col-md-8 flex h-10">
                                      <div class="w-50 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                        <select
                                          class=""
                                          name="fromware"
                                          onChange={(e) => transferStock(e)}
                                        >
                                          <option value="none">FROM</option>
                                          {Object.keys(
                                            data[item].stock[0].warehouse
                                          ).map((wname) => {
                                            return (
                                              <option
                                                value={`${data[item].stock[0].warehouse[wname].name}`}
                                              >
                                                {
                                                  data[item].stock[0].warehouse[
                                                    wname
                                                  ].name
                                                }
                                              </option>
                                            );
                                          })}
                                        </select>
                                      </div>
                                      <div className="w-50 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                        <select
                                          class=""
                                          name="toware"
                                          onChange={(e) => transferStock(e)}
                                        >
                                          <option value="none">TO</option>
                                          {Object.keys(
                                            data[item].stock[0].warehouse
                                          ).map((wname) => {
                                            return (
                                              <option
                                                value={`${data[item].stock[0].warehouse[wname].name}`}
                                              >
                                                {
                                                  data[item].stock[0].warehouse[
                                                    wname
                                                  ].name
                                                }
                                              </option>
                                            );
                                          })}
                                        </select>
                                      </div>
                                      <div class="relative mb-4">
                                        <input
                                          type="text"
                                          id="full-name"
                                          name="stockValue"
                                          placeholder="stock value"
                                          onChange={(e) => {
                                            transferStock(e);
                                          }}
                                          class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-4 h-20 flex items-center justify-center">
                                      <button
                                        onClick={() => transfer()}
                                        class="text-white bg-blue-500 px-8 focus:outline-none hover:bg-blue-800 rounded"
                                      >
                                        Transfer stock
                                      </button>
                                    </div>
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default warehouse;
