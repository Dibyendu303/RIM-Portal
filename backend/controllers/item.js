const Item = require("../models/itemSchema.js")
const { ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const storage = require("../config/config.js");


module.exports.download = async (req, res) => {
    try {
        const item = await Item.findByID(req.body.ID);
        res.status(200).json({ "link": item[req.body.type] }); //ToDo:
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
}

module.exports.addItem = async (req, res) => {
    let billURL = "";
    let sanctionURL = "";
    let purchaseURL = "";
    let inspectionURL = "";
    const timestamp = Date.now();

    if (req.files['bill']) {
        const fileNameBill = `${req.files['bill'][0].originalname.split(".")[0]}_${timestamp}.${req.files['bill'][0].originalname.split(".")[1]}`;
        const billRef = ref(storage, fileNameBill);

        try {
            const billSnapshot = await uploadBytesResumable(billRef, req.files['bill'][0].buffer, {
                contentType: req.files['bill'][0]?.mimetype,
            });
            billURL = await getDownloadURL(billSnapshot.ref);
        }
        catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    }

    if (req.files['sanctionLetter']) {
        const fileNameSanctionLetter = `${req.files['sanctionLetter'][0].originalname.split(".")[0]}_${timestamp}.${req.files['sanctionLetter'][0].originalname.split(".")[1]}`;
        const sanctionRef = ref(storage, fileNameSanctionLetter);

        try {
            const sanctionLetterSnapshot = await uploadBytesResumable(sanctionRef, req.files['sanctionLetter'][0].buffer, {
                contentType: req.files['sanctionLetter'][0]?.mimetype,
            });
            sanctionURL = await getDownloadURL(sanctionLetterSnapshot.ref);
        }
        catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    }

    if (req.files['purchaseOrder']) {
        const fileNamePurchaseOrder = `${req.files['purchaseOrder'][0].originalname.split(".")[0]}_${timestamp}.${req.files['purchaseOrder'][0].originalname.split(".")[1]}`;
        const purchaseOrderRef = ref(storage, fileNamePurchaseOrder);

        try {
            const purchaseOrderSnapshot = await uploadBytesResumable(purchaseOrderRef, req.files['purchaseOrder'][0].buffer, {
                contentType: req.files['purchaseOrder'][0]?.mimetype,
            });
            purchaseURL = await getDownloadURL(purchaseOrderSnapshot.ref);
        }
        catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    }

    if (req.files['inspectionReport']) {
        const fileNameInspectionReport = `${req.files['inspectionReport'][0].originalname.split(".")[0]}_${timestamp}.${req.files['inspectionReport'][0].originalname.split(".")[1]}`;
        const inspectionReportRef = ref(storage, fileNameInspectionReport);
        try {
            const inspectionReportSnapshot = await uploadBytesResumable(inspectionReportRef, req.files['inspectionReport'][0].buffer, {
                contentType: req.files['inspectionReport'][0]?.mimetype,
            });
            inspectionURL = await getDownloadURL(inspectionReportSnapshot.ref);
        }
        catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    }
    console.log("File successfully uploaded.");
    const data = req.body;
    data.ownedBy = req.user ? req.user : data.ownedBy;  // Change after authentication setup complete
    const item = {
        "name": data.name,
        "category": data.category,
        "ownedBy": data.ownedBy,
        "heldBy": data.heldBy ? data.heldBy : data.ownedBy,
        "quantity": data.quantity,
        "purchasedOn": data.purchasedOn,
        "bill": billURL,
        "sanctionLetter": sanctionURL,
        "purchaseOrder": purchaseURL,
        "inspectionReport": inspectionURL,
        "status": data.status,
        "remarks": data.remarks,
        "occupiedTime": []
    }
    const newItem = new Item(item);
    try {
        newItem.save()
        res.status(201).send({ result: "Success", item: newItem }); // Can be removed
    }
    catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}

module.exports.listAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(201).json(items);
    }
    catch {
        res.status(500).send(err);
        console.log(err);
    }
}

module.exports.deleteItem = async (req, res) => {
    try {
        const id = req.body.ID;
        // console.log("Delete item api called ", id);
        Item.findByIdAndRemove(id, (err, doc) => {
            if (!err) {
                res.status(200).send({ result: "Success" });
            } else {
                res.send(err);
                console.log(err);
            }
        })
    }
    catch {
        res.send(err);
        console.log(err);
    }
}

module.exports.returnItem = async (req, res) => {
    try {
        const item = await Item.findOneAndUpdate(
            { _id: req.body.itemId },
            { heldBy: req.body.heldBy }
        );
        if (item) {
            res.status(200).send({ result: "Success", item: item });
        }
        else res.status(404).send({ result: "Item Not Found" })

    }
    catch (err) {
        res.status(500).send(err);
    }
}