import { ethers } from "ethers";
import { ddw_ads_abi } from "./abi";

export const createDDWAdsWriteContract = () => {
    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner()
            const Contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
                ddw_ads_abi,
                signer
            );
            return Contract;
        } else {
            console.log("Ethereum object doesn't exist!");
        }
    } catch (error) {
        console.log('write contract', error);
    }
};