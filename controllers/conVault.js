const Vault = require("../models/Vault");
const USER = require("../models/User");

const createVaultItem = async (req, res) => {
    try {
        const { content, tags } = req.body;
        console.log(req.user);
        const userId = req.user.id;
        const user = await USER.findById(userId);
        if (!user) return res.status(404).json({ msg: "user not found" });
        const vault = await Vault.create({ content, tags, userId });
        res.status(201).json({ msg: "scssful created vault", Data: vault });
    } catch (err) {
        res.status(500).json({ msg: "crached server", Data: err.message });
    }
};

const getAllVault = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await USER.findById(userId);
        if (!user) return res.status(404).json({ msg: "user not found" });
        const vault = await Vault.find({ userId })
        res.status(200).json({ msg: "scssful get all vault", Data: vault });
    } catch (err) {
        res.status(500).json({ msg: "crached server", Data: err.message });
    }
};


const getVaultItem = async (req, res) => {
    try {
        const userId = req.user.id;

        const id = req.params.itemId
        if (!id) return res.status(404).json({ msg: "VaultId not found" });
        const user = await USER.findById(userId);
        if (!user) return res.status(404).json({ msg: "user not found" });
        const vault = await Vault.findOne({ userId, _id: id })
        if (!vault) return res.status(404).json({ msg: "vault not found" });
        res.status(200).json({ msg: "scssful get vault", Data: vault });
    } catch (err) {
        res.status(500).json({ msg: "crached server", Data: err.message });
    }
};






const updateVaultItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const id = req.params.itemId
        if (!id) return res.status(404).json({ msg: "VaultId not found" });
        const user = await USER.findById(userId);
        if (!user) return res.status(404).json({ msg: "user not found" });

        const update = req.body
        const updateVault = await Vault.findOneAndUpdate({userId, _id: id},update, {new: true, runValidators:true})
         if (!updateVault) return res.status(404).json({ msg: "vault not found" });
          res.status(200).json({ msg: "scssful update", Data: updateVault  });
    } catch (err) {
        res.status(500).json({ msg: "crached server", Data: err.message });
    }
};

const deleteVaultItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const id = req.params.itemId
        const deletedItem = await Vault.findOneAndDelete({userId, _id: id})
        if (!deletedItem) return res.status(404).json({ msg: "filed delete item" })
         res.status(200).json({ msg: "scssful delete", Data: deletedItem  });

    } catch (err) {
        res.status(500).json({ msg: "crached server", Data: err.message });
    }
};

module.exports = {
    createVaultItem,
    getAllVault,
    getVaultItem,
    updateVaultItem,
    deleteVaultItem,
};
