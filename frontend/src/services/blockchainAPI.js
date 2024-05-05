import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1";

//postToBlockchain
const mineBlock = async (input) => {
  await axios.get(`${BASE_URL}/blockchain/mine`).then((res) => {});
};

const createTransaction = async (input) => {
  try {
    const response = await axios.post(`${BASE_URL}/transaction`, {
      data: input,
    });
    console.log("RES", response.status);
    return true;
  } catch (error) {
    console.log("Error occurred while creating transaction: ", error);
    return false;
  }
};

//getFromBlockchain
const getBlockchain = async () => {
  const data = await axios.get(`${BASE_URL}/blockchain`).then((res) => {
    console.log("RES", res);
    const data = res.data.chain;
    console.log("DATA FROM GETBLOCKCHAIN", data);
    return data;
  });
  return data;
};

const getPendingTransactions = async () => {
  const data = await axios
    .get(`${BASE_URL}/transaction/pending-transactions`)
    .then((res) => {
      const data = res.data;
      return data;
    });
  return data;
};

const getBlockById = async (id) => {
  const data = await axios.get(`${BASE_URL}/block/${id}`).then((res) => {
    console.log("res from getBlockById", res);
    const data = res.data.data;
    return data;
  });
  return data;
};

const validateBlockchain = async () => {
  const data = await axios.get(`${BASE_URL}/consensus`).then((res) => {
    const data = res.data;
    console.log("DATA FROM VALIDATE BLOCKCHAIN", data);
    return data;
  });
  return data;
};

export {
  mineBlock,
  createTransaction,
  getBlockchain,
  getPendingTransactions,
  getBlockById,
  validateBlockchain,
};
