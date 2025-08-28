import Account from "../models/Account.js";


export async function getAllAccounts(req, res) {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch accounts" });
  }
}

export async function getAccountById(req, res) {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch account" });
  }
}

export async function createAccount(req, res) {
  try {
    const { name, email, password } = req.body;
    const newAccount = new Account({ name, email, password });
    const savedAccount = await newAccount.save();
    res.status(201).json(savedAccount);
  } catch (error) {
    res.status(500).json({ error: "Failed to create account" });
  }
}

export async function updateAccount(req, res) {
  try {
    const { name, email, password } = req.body;
    const updatedAccount = await Account.findByIdAndUpdate(
      req.params.id,
      { name, email, password },
      { new: true }
    );
    if (!updatedAccount) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(500).json({ error: "Failed to update account" });
  }
}

export async function deleteAccount(req, res) {
  try {
    const deletedAccount = await Account.findByIdAndDelete(req.params.id);
    if (!deletedAccount) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete account" });
  }
}