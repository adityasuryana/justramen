import Account from "../models/Account.js";


export async function getAllAccounts(req, res) {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch accounts" });
  }
}

export function createAccount(req, res) {
  res.send("Account created");
}

export function updateAccount(req, res) {
  res.send("Account updated");
}

export function deleteAccount(req, res) {
  res.send("Account deleted");
}