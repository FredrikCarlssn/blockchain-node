import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";

//postToBlockchain
const mineBlock = async (input) => {
	await axios.post(`${BASE_URL}/mine`, { data: input }).then((res) => {});
};

const createTransaction = async (input) => {
	await axios.post(`${BASE_URL}/transaction`, { data: input }).then((res) => {});
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
	const data = await axios.get(`${BASE_URL}/pending-transactions`).then((res) => {
		const data = res.data.data;
		return data;
	});
	return data;
};

const getBlockById = async (id) => {
	const data = await axios.get(`${BASE_URL}/block/${id}`).then((res) => {
		const data = res.data.data;
		return data;
	});
	return data;
};

export { mineBlock, createTransaction, getBlockchain, getPendingTransactions, getBlockById };
