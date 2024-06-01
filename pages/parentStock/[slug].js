import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function parentStock() {
  useEffect(() => {
    getData();
  }, []);
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
  const getData = async () => {
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
    } catch (error) {
      console.log(error);
    }
  };
  const router = useRouter();
  const { slug } = router.query;
  const goToWarehouse = (id) => {
    router.push(`/warehouse/${id}`);
  };
  const goToOrder = (id) => {
    router.push(`/order/${id}`);
  };
  return (
    <>
      <div>
        {Object.keys(parentData).map((item) => {
          return (
            <div>
              {slug == parentData[item]._id && (
                <div>
                  <div className="flex items-center justify-center">
                    {parentData[item].id && (
                      <div>
                        {Object.keys(parentData[item].id).map((child) => {
                          const c = parentData[item].id[child];
                          return (
                            <div className="m-3 bg-gray-100 p-4">
                              <div className="container ">
                                <div className="row">
                                  <div className="">
                                    <div className="flex justify-between items-center	py-4">
                                      <p className="font-bold">Stock Entry</p>
                                      <button
                                        onClick={() =>
                                          goToOrder(parentData[item]._id)
                                        }
                                        class="w-24 hover:border-solid hover:border-2 hover:border-neutral-800 rounded-xl
                                          font-bold py-2 px-4 border-solid border-2 border-neutral-400"
                                      >
                                        Order
                                      </button>
                                    </div>
                                    <div className="">
                                      <button
                                        onClick={() => goToWarehouse(c._id)}
                                        class="w-36 hover:text-gray-800 text-gray-500 py-2 px-4 rounded"
                                      >
                                        Warehouse
                                      </button>
                                    </div>
                                    <div className="p-4 border-solid border-2 border-neutral-400 rounded-xl">
                                      <div className="font-bold text-xl ">
                                        {c.product[0].name}
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <div className="text-gray-400">
                                          {c.variation[0].size} /{" "}
                                          {c.variation[0].color}
                                        </div>
                                        <div className="font-bold">
                                          FBA : {c.stock[0].inventoryfba}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="p-10 flex items-center justify-center">
                                      <div className="flex items-center justify-between w-50">
                                        <div className="text-gray-500 font-bold">
                                          Cost
                                        </div>
                                        <div className="font-bold">
                                          {c.product[0].cost}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="p-10 font-bold">Stock</div>
                                    <div className="p-10 flex items-center justify-center">
                                      <div className="flex flex-column items-center justify-between">
                                        {Object.keys(c.stock[0].warehouse).map(
                                          (w) => {
                                            const warehouse =
                                              c.stock[0].warehouse[w];
                                            return (
                                              <div className="m-3 bg-gray-300 p-3">
                                                {warehouse.name} -
                                                {warehouse.value}
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {!parentData[item].id && (
                      <div>
                        {console.log(parentData[item])}
                        <div className="m-3 bg-gray-100 p-4">
                          <div className="container ">
                            <div className="row">
                              <div className="">
                                <div className="flex justify-between items-center	py-4">
                                  <p className="font-bold">Stock Entry</p>
                                  <button
                                    onClick={() =>
                                      goToOrder(parentData[item]._id)
                                    }
                                    class="w-24 hover:border-solid hover:border-2 hover:border-neutral-800 rounded-xl
                                          font-bold py-2 px-4 border-solid border-2 border-neutral-400"
                                  >
                                    Order
                                  </button>
                                </div>
                                <div className="">
                                  <button
                                    onClick={() =>
                                      goToWarehouse(parentData[item]._id)
                                    }
                                    class="w-36 hover:text-gray-800 text-gray-500 py-2 px-4 rounded"
                                  >
                                    Warehouse
                                  </button>
                                </div>
                                <div className="p-4 border-solid border-2 border-neutral-400 rounded-xl">
                                  <div className="font-bold text-xl ">
                                    {parentData[item].product[0].name}
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="text-gray-400">
                                      {parentData[item].variation[0].size} /
                                      {parentData[item].variation[0].color}
                                    </div>
                                    <div className="font-bold">
                                      FBA :{" "}
                                      {parentData[item].stock[0].inventoryfba}
                                    </div>
                                  </div>
                                </div>
                                <div className="p-10 flex items-center justify-center">
                                  <div className="flex items-center justify-between w-50">
                                    <div className="text-gray-500 font-bold">
                                      Cost
                                    </div>
                                    <div className="font-bold">
                                      {parentData[item].product[0].cost}
                                    </div>
                                  </div>
                                </div>
                                <div className="p-10 font-bold">Stock</div>
                                <div className="p-10 flex items-center justify-center">
                                  <div className="flex flex-column items-center justify-between">
                                    {Object.keys(
                                      parentData[item].stock[0].warehouse
                                    ).map((w) => {
                                      const warehouse =
                                        parentData[item].stock[0].warehouse[w];
                                      return (
                                        <div className="m-3 bg-gray-300 p-3">
                                          {warehouse.name} -{warehouse.value}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default parentStock;
