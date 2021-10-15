import AccountRespository from '../repositories/account.repository.js';

async function createAccount(account) {
    return await AccountRespository.insertAccount(account);
}

async function getAccounts() {
    return await AccountRespository.getAccounts();
}

async function getAccount(id) {
    return await AccountRespository.getAccount(id);
}

async function deleteAccount(id) {
    return await AccountRespository.deleteAccount(id);
}

async function updateAccount(account) {
    return await AccountRespository.updateAccount(account);
}

async function updateBalance(account) {
    const value = await AccountRespository.getAccount(account.id);
    value.balance = account.balance;
    return await AccountRespository.updateAccount(value);
}

export default {
    createAccount,
    getAccounts,
    getAccount,
    deleteAccount,
    updateAccount,
    updateBalance
}