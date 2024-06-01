import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

function home() {
  const router = useRouter();
  const [filter, setFilter] = useState("parent");
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    authUser();
  }, []);
  const authUser = async () => {
    const auth = await localStorage.getItem("msg");
    if (auth != "success") {
      router.push("/login");
    }
  };
  const [parentData, setParentData] = useState({});
  useEffect(() => {
    getFilteredData();
  }, [filter]);

  const getFilteredData = async () => {
    if (filter == "parent") {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/parentprod`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response = await res.json();
        setParentData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    } else if (filter == "item") {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        let response = await res.json();
        setParentData(response.data);
      } catch (error) {}
    } else {
    }
  };

  const [cost, setCost] = useState("");

  const updateCost = async (e, id) => {
    let temp = { ...parentData };
    temp[id].product[0][e.target.name] = e.target.value;
    setParentData(temp);
    console.log(id);
    console.log(parentData);
    setCost(id);
    console.log(id);
  };

  const updateWareHouse = async (e, id) => {
    let temp = { ...parentData };
    temp[id].stock[0].warehouse[0][e.target.name] = e.target.value;
    setParentData(temp);
    console.log(id);
    console.log(parentData);
  };

  const addCost = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/updateprice`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cost),
      });
      let response = await res.json();
      console.log(response);
      if (response.msg) {
        alert("Successfully updated");
        window.location.reload();
      } else {
        alert("Update failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goToParentStock = (e) => {
    router.push(`/parentStock/${e}`);
  };

  const goToItemStock = (e) => {
    router.push(`/itemstock/${e}`);
  };

  return (
    <div>
      <div className="container">
        <div className="row flex items-center justify-center my-5 text-3xl text-blue-500 font-bold">
          Jumji
        </div>
        <div className="row">
          <div className="col-6 flex items-center justify-center flex-column">
            <div className="row text-gray-400">Sales</div>
            <div className="row text-3xl text-blue-500">99</div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-4">
                {" "}
                <div className="row text-gray-400">Orders</div>
                <div className="row text-3xl text-blue-500">99</div>
              </div>
              <div className="col-4">
                <div className="row text-gray-400">Items</div>
                <div className="row text-3xl text-blue-500">99</div>
              </div>
              <div className="col-4">
                {" "}
                <div className="row text-gray-400">Returns</div>
                <div className="row text-3xl text-red-500">99</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container p-10 flex justify-end">
        <select onChange={(e) => handleChange(e)} name="filter">
          <option value="parent">By Parent</option>
          <option value="order">By Order</option>
          <option value="item">By Items</option>
        </select>
      </div>
      {filter == "parent" && (
        <div>
          {parentData && (
            <div>
              {Object.keys(parentData).map((item) => {
                return (
                  <div className="p-3 bg-gray-200 m-3 rounded-lg">
                    <div className="flex justify-between">
                      <p className="font-bold">
                        {parentData[item].product[0].name}{" "}
                      </p>
                      <button
                        onClick={() => goToParentStock(parentData[item]._id)}
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        +
                      </button>
                    </div>
                    <div>
                      <div>
                        <div>
                          <div class="overflow-hidden my-10 bg-gray-200 mx-10">
                            <table class="min-w-full">
                              <thead class="border-b">
                                <tr>
                                  <th
                                    scope="col"
                                    class="text-sm font-medium text-gray-500 px-6 py-4 text-left"
                                  >
                                    Cost
                                  </th>
                                  {Object.keys(
                                    parentData[item].stock[0].warehouse[0]
                                  ).map((w) => {
                                    return (
                                      <th
                                        scope="col"
                                        class="text-gray-500 text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                      >
                                        {w}
                                      </th>
                                    );
                                  })}
                                </tr>
                              </thead>
                              <tbody>
                                <tr class="border-b">
                                  <td class="text-sm text-gray-900 px-6 py-4 font-bold whitespace-nowrap">
                                    <div>
                                      <p>{parentData[item].product[0].cost}</p>
                                      {/* <input
                                        class="shadow appearance-none border rounded w-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="username"
                                        type="text"
                                        defaultValue={
                                          parentData[item].product[0].cost
                                        }
                                        onChange={(e) =>
                                          updateCost(e, parentData[item]._id)
                                        }
                                        name="cost"
                                      /> */}
                                    </div>
                                  </td>
                                  {Object.keys(
                                    parentData[item].stock[0].warehouse[0]
                                  ).map((w) => {
                                    return (
                                      <th
                                        scope="col"
                                        class="text-sm font-bold px-6 py-4 text-left "
                                      >
                                        {
                                          parentData[item].stock[0]
                                            .warehouse[0][w]
                                        }
                                        {/* <input
                                          class="shadow appearance-none border rounded w-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          id="username"
                                          type="text"
                                          defaultValue={
                                            parentData[item].stock[0]
                                              .warehouse[0][w]
                                          }
                                          onChange={(e) =>
                                            updateWareHouse(
                                              e,
                                              parentData[item]._id
                                            )
                                          }
                                          name={w}
                                        /> */}
                                      </th>
                                    );
                                  })}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {parentData[item].id &&
                      parentData[item].id.map((child) => {
                        return (
                          <>
                            <div>
                              <div>
                                <div class="rounded-lg font-bold p-3 overflow-hidden bg-green-200 mx-10 my-3">
                                  <div>
                                    {child.variation[0].color} -{" "}
                                    {child.variation[0].size}
                                  </div>
                                  <table class="min-w-full">
                                    <thead class="border-b">
                                      <tr>
                                        <th
                                          scope="col"
                                          class="text-sm text-gray-500 font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                          Cost
                                        </th>
                                        {Object.keys(
                                          parentData[item].stock[0].warehouse[0]
                                        ).map((w) => {
                                          return (
                                            <th
                                              scope="col"
                                              class="text-sm font-medium text-gray-500 px-6 py-4 text-left"
                                            >
                                              {w}
                                            </th>
                                          );
                                        })}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr class="border-b">
                                        <td class="text-sm px-6 py-4 whitespace-nowrap">
                                          <div>
                                            <p>
                                              {parentData[item].product[0].cost}
                                            </p>
                                            {/* <input
                                              class="shadow appearance-none border rounded w-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                              id="username"
                                              type="text"
                                              defaultValue={
                                                parentData[item].product[0].cost
                                              }
                                              onChange={(e) =>
                                                updateCost(
                                                  e,
                                                  parentData[item]._id
                                                )
                                              }
                                              name="cost"
                                            /> */}
                                          </div>
                                        </td>
                                        {Object.keys(
                                          parentData[item].stock[0].warehouse[0]
                                        ).map((w) => {
                                          return (
                                            <th
                                              scope="col"
                                              class="text-sm font-medium px-6 py-4 text-left"
                                            >
                                              {
                                                parentData[item].stock[0]
                                                  .warehouse[0][w]
                                              }
                                              {/* <input
                                                class="shadow appearance-none border rounded w-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="username"
                                                type="text"
                                                defaultValue={
                                                  parentData[item].stock[0]
                                                    .warehouse[0][w]
                                                }
                                                onChange={(e) =>
                                                  updateWareHouse(
                                                    e,
                                                    parentData[item]._id
                                                  )
                                                }
                                                name={w}
                                              /> */}
                                            </th>
                                          );
                                        })}
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {filter == "item" && (
        <div>
          {parentData && (
            <div>
              {Object.keys(parentData).map((item) => {
                return (
                  <div>
                    <div>
                      <div>
                        <div>
                          <div class="overflow-hidden m-3 bg-gray-200 p-3">
                            <div className="font-bold flex justify-between ">
                              <div>{parentData[item].product[0].name}</div>
                              <button
                                onClick={() =>
                                  goToItemStock(parentData[item]._id)
                                }
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              >
                                +
                              </button>
                            </div>
                            <table class="min-w-full">
                              <thead class="border-b">
                                <tr>
                                  <th
                                    scope="col"
                                    class="text-sm text-gray-500 font-medium text-gray-900 px-6 py-4 text-left"
                                  >
                                    Cost
                                  </th>
                                  {Object.keys(
                                    parentData[item].stock[0].warehouse[0]
                                  ).map((w) => {
                                    return (
                                      <th
                                        scope="col"
                                        class="text-sm font-medium text-gray-500 px-6 py-4 text-left"
                                      >
                                        {w}
                                      </th>
                                    );
                                  })}
                                </tr>
                              </thead>
                              <tbody>
                                <tr class="border-b">
                                  <td class="text-sm px-6 py-4 whitespace-nowrap">
                                    {parentData[item].product[0].cost}
                                    {/* <input
                                      class="shadow appearance-none border rounded w-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                      id="username"
                                      type="text"
                                      defaultValue={
                                        parentData[item].product[0].cost
                                      }
                                      onChange={(e) =>
                                        updateCost(e, parentData[item]._id)
                                      }
                                      name="cost"
                                    /> */}
                                  </td>
                                  {Object.keys(
                                    parentData[item].stock[0].warehouse[0]
                                  ).map((w) => {
                                    return (
                                      <th
                                        scope="col"
                                        class="text-sm font-bold px-6 py-4 text-left"
                                      >
                                        {
                                          parentData[item].stock[0]
                                            .warehouse[0][w]
                                        }
                                        {/* <input
                                          class="shadow appearance-none border rounded w-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                          id="username"
                                          type="text"
                                          defaultValue={
                                            parentData[item].stock[0]
                                              .warehouse[0][w]
                                          }
                                          onChange={(e) =>
                                            updateWareHouse(
                                              e,
                                              parentData[item]._id
                                            )
                                          }
                                          name="cost"
                                        /> */}
                                      </th>
                                    );
                                  })}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default home;
