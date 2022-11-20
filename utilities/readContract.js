import { ethers } from "ethers";
import { ddw_ads_abi } from "./abi";

export const providers = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
export const ads_read_contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ddw_ads_abi, providers);
