const express = require("express")
const rout = express.Router()
const valiedToken = require("../middlewares/valiedToken")
const {createVaultItem,
    getAllVault,
    getVaultItem,
    updateVaultItem,
    deleteVaultItem} = require("../controllers/conVault")


// 1. مسار إنشاء نص جديد (POST)
rout.post("/", valiedToken, createVaultItem);

// 2. مسار جلب كل نصوص المستخدم (GET)
rout.get("/", valiedToken, getAllVault);

// 3. مسار جلب نص محدد (GET)
rout.get("/:itemId", valiedToken, getVaultItem);

// 4. مسار تعديل نص محدد (PUT)
rout.put("/:itemId", valiedToken, updateVaultItem);

// 5. مسار حذف نص محدد (DELETE)
rout.delete("/:itemId", valiedToken, deleteVaultItem);
module.exports = rout