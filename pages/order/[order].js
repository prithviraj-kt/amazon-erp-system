import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function order() {
  const router = useRouter();
  const [data, setData] = useState({});
  const [item, setItem] = useState({});
  const [allOrders, setAllOrders] = useState({});
  const [qty, setQty] = useState({});
  const [days, setDays] = useState({});
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const collectQty = (e) => {
    setQty({
      ...qty,
      [e.target.id]: {
        ["qty"]: e.target.value,
      },
    });
  };

  const collectDays = (e) => {
    setDays({
      ...days,
      [e.target.id]: {
        ["days"]: e.target.value,
      },
    });
  };
  useEffect(() => {
    getData();
    getAllOrders();
  }, []);
  const { order } = router.query;
  const getData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      setItem(response.data);
    } catch (error) {
      console.log(error.msg);
    }
  };

  const getAllOrders = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/getallorders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await res.json();
      setAllOrders(response.reverse());
    } catch (error) {}
  };
  const handleClick = async () => {
    for (const [key, value] of Object.entries(days)) {
      const ivalue = qty[key];
      days[key]["qty"] = ivalue.qty;
    }
    days["date"] = data.date;
    days["supplier"] = data.supplier;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/orders/createorder/${order}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(days),
        }
      );
      const res = await response.json();
      alert(res.msg);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  const updateDays = () => {
    // var list = Object.values(item);
    // for (var i = 0; i < Object.keys(item).length; i++) {
    //   setQty({
    //     ...qty,
    //     [list[i]._id]: {
    //       ["qty"]: expectedDays,
    //     },
    //   });
    // }
    // console.log(qty)
  };
  const [expectedDays, setExpectedDays] = useState("");
  const handleExpectedDays = (e) => {
    setExpectedDays({ ...expectedDays, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   updateExpectedDays();
  // },[expectedDays])

  return (
    <div className="">
      <div className="container">
        <div className="row flex items-center justify-center">
          <div className="col-md-6 flex flex-column items-center justify-between bg-gray-200 h-full">
            <div className="row flex items-center flex-row justify-between w-full p-3">
              <p className="text-xl font-bold w-24"> Order</p>
            </div>
            <div>
              <table class="table-fixed">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Supplier</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(allOrders).map((item) => {
                    return (
                      <tr>
                        <td>{allOrders[item].order_id}</td>
                        <td>{allOrders[item].date}</td>
                        <td>{allOrders[item].supplier}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="h-full w-full flex flex-column justify-between p-5">
              <div className="flex items-center justify-between">
                <label
                  for="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </label>
                <input
                  name="date"
                  type="datetime-local"
                  onChange={(e) => handleChange(e)}
                  className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Date"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <label
                  for="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Supplier
                </label>
                <select
                  onChange={(e) => handleChange(e)}
                  name="supplier"
                  id="cars"
                >
                  <option value="supplier1">Supplier 1</option>
                  <option value="supplier2">Supplier 2</option>
                  <option value="supplier3">Supplier 3</option>
                  <option value="supplier4">Supplier 4</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label
                  for="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Expected Days
                </label>
                <input
                  onChange={(e) => handleExpectedDays(e)}
                  name="expectedDays"
                  placeholder="Expected Days"
                  onBlur={updateDays}
                />
              </div>
              <div>
                <table class="table-auto w-full text-center">
                  <thead>
                    <tr className="">
                      <th>Varient</th>
                      <th>Quantity</th>
                      <th>Expected days</th>
                    </tr>
                  </thead>
                </table>
                {Object.keys(item).map((i) => {
                  return (
                    <div>
                      <tbody>
                        <tr>
                          <td>
                            {item[i].product[0].name}
                            {item[i].variation[0].size} -{" "}
                            {item[i].variation[0].color}
                            {/* {item[i].id[child].variation[0].size} -{" "}
                            {item[i].id[child].variation[0].color} */}
                          </td>
                          <td>
                            <input
                              id={`${item[i]._id}`}
                              name="qty"
                              type="number"
                              onChange={(e) => collectQty(e)}
                              className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="QTY"
                              required
                            />
                          </td>
                          <td>
                            <input
                              id={`${item[i]._id}`}
                              name="days"
                              type="number"
                              defaultValue={expectedDays}
                              onChange={(e) => collectDays(e)}
                              className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="DAYS"
                              required
                            />
                          </td>
                        </tr>
                      </tbody>
                    </div>
                  );
                })}
              </div>

              {/* <div className="flex items-center justify-between">
                <label
                  for="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Quantity
                </label>
                <input
                  name="qty"
                  type="text"
                  onChange={(e) => handleChange(e)}
                  id="first_name"
                  className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Quantity"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <label
                  for="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Expected days
                </label>
                <input
                  name="days"
                  type="text"
                  onChange={(e) => handleChange(e)}
                  id="first_name"
                  className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Expected days"
                  required
                />
              </div> */}
              <div className="flex items-center justify-center">
                <button
                  onClick={handleClick}
                  className="w-24  bg-blue-200 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default order;
