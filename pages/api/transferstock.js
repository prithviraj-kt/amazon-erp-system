import connectDb from "../../middleware/mongoose";
import updatedproduct from "../../model/updatedProduct";
//import warehouse from "../warehouse/[slug]";
const handler = async (req, res) => {
  if (req.method == "PUT") {
    const getData = await updatedproduct.find({ _id: req.body.id });
    let _id = req.body.id;
    let fware = req.body.fromware;
    let tware = req.body.toware;
    let svalue = req.body.stockValue;
    let wareHouse = getData[0].stock[0].warehouse;
    let temp = [];
    for (let i of wareHouse) {
      if (i.name === fware) {
        let t = {};
        t["name"] = fware;
        t["value"] = parseInt(i.value) - parseInt(svalue);
        temp.push(t);
      } else if (i.name === tware) {
        let t = {};
        t["name"] = tware;
        t["value"] = parseInt(i.value) + parseInt(svalue);
        temp.push(t);
      } else {
        temp.push(i);
      }
    }
    getData[0].stock[0].warehouse = temp;
    //await updatedproduct.findByIdAndUpdate(, getData);
    await updatedproduct.findByIdAndUpdate({ _id: getData[0]._id }, getData[0]);
    return res.status(200).json({ msg: "Success" });
    // const getAllData = await updatedproduct.find({});
    // var newWarehouse = [];
    // for (let wname of wareHouse) {
    //   if (wname.name === fware) {
    //     const temp = {};
    //     temp["name"] = wname.name;
    //     temp["value"] = parseInt(wname.value) - parseInt(svalue);
    //     newWarehouse.push(temp);
    //   } else if (wname.name === tware) {
    //     const temp = {};
    //     temp["name"] = wname.name;
    //     temp["value"] = parseInt(wname.value) + parseInt(svalue);
    //     newWarehouse.push(temp);
    //   } else {
    //     newWarehouse.push(wname);
    //   }
    // }

    // for (var items = 0; items < getAllData.length; items++) {
    //   //   items.stock[0].warehouse = newWarehouse;
    //   const singleItem = getAllData[items];
    //   singleItem.stock[0].warehouse = newWarehouse;
    //   await updatedproduct.findByIdAndUpdate(
    //     { _id: singleItem._id },
    //     singleItem
    //   );
    // }

    //wareHouse.find(i => i.name === fware)

    // const getAllData = await updatedproduct.find({});
    // for (let items of getAllData) {
    //   let newWarehouse = [];
    //   for (let wname of items.stock[0].warehouse) {
    //     if (wname.name != req.body.name) {
    //       newWarehouse.push(wname);
    //     } else {
    //       let newWareHouseName = wname;
    //       newWareHouseName.name = req.body.newName;
    //       newWarehouse.push(newWareHouseName);
    //     }
    //   }
    //   items.stock[0].warehouse = newWarehouse;
    //   await updatedproduct.findByIdAndUpdate({ _id: items._id }, items);
    // }
    // return res.status(200).json({ msg: "Warehouse name updated" });
  }
};
export default connectDb(handler);
