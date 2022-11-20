import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Ads_Dropdown from './Ads_Dropdown';
import { createDDWAdsWriteContract } from '../utilities/writeContract';
import { ethers } from 'ethers';

function New() {
    const [dropdata, setData] = useState([]);
    const [viewdata, setViewData] = useState([]);
    const [listing, setListing] = useState(null);
    const [totalWatchCount, setTotalWatchCount] = useState(0);
    const [ValueLocked, setValueLocked] = useState(0);
    const [ValueSpent, setValueSpent] = useState(0);
    const [state, setState] = useState(null);
    const onSelect = async (value) => {
        setListing(value[0].label);
        var Contract = createDDWAdsWriteContract();
        var response = await Contract.view_listing_analytics(value[0].label);
        setViewData(transform_data(response));

    }
    const gender = {0: "male", 1: "female"}

    function transform_data(_data) {
        var returnData = []
        for(var i=0; i<_data[8].length; i+=2){
            var element = {name: _data[8][i], [gender[_data[9][i]]]: ethers.utils.formatUnits(_data[10][i], 0), [gender[_data[9][i+1]]]: ethers.utils.formatUnits(_data[10][i+1], 0)}
            returnData.push(element)
        }
        console.log("viewdata", returnData);
        return returnData;
    }

    useEffect(() => {
        var Contract = createDDWAdsWriteContract();
        console.log("dddd");
        Contract.view_listing_names().then(
            (listings) => {
                console.log("list", listings);
                if(listings.length === 0) return;
                setData(listings)
                setListing(listings[0])
                Contract.view_listing_analytics(listings[0]).then(
                    (response) => {
                       setViewData(transform_data(response));
                       setTotalWatchCount(ethers.utils.formatUnits(response.watchCountAchieved,0))
                       setValueLocked(Math.round(ethers.utils.formatEther(response.priceLocked)*100)/100)
                       setValueSpent(Math.round(ethers.utils.formatEther(response.spentValue)*100)/100)
                       console.log("state", response.state);
                       setState(parseInt(ethers.utils.formatUnits(response.state, 0)))
                    }
                )
            }
        )
    }, [])

    async function OnWithdraw() {

    }

    const State0 = <div className=' p-3 m-6  flex-col bg-white mt-2 h-22 text-center justify-center cursor-pointer shadow-2xl flex rounded-xl'>
    <h2 className='text-xl  mt-2 text-center items-center justify-center '>Remaining Amount  </h2>
    <h2 className='text-xl text-green-600 hover:text-green-500 '>{ValueLocked - ValueSpent} TFIL</h2>
    </div>


    return (
        <div className="  h-screen items-center flex justify-center ">
            <div className="bg-gray-100 flex rounded-xl  w-3/5 font-mono  mt-20">
                <div className="flex-1 text-gray-700  p-20 text-center mt-2 ">


                    <div className=' grid grid-row-4 grid-flow-col w-full rounded-lg mt-18 mb-16 '>

                        <div className=' p-3  m-6 flex-col bg-white mt-2 h-22 text-center justify-center cursor-pointer shadow-2xl flex rounded-xl'>
                            <h2 className='text-xl w-full mt-2 text-center items-center justify-center '>Total Watch  Count  </h2>
                            <h2 className='text-xl text-purple-600 hover:text-blue-300 '>{totalWatchCount}</h2>
                        </div>

                        <div className=' p-3 m-6  flex-col bg-white mt-2 h-22 text-center justify-center cursor-pointer shadow-2xl flex rounded-xl'>
                            <h2 className='text-xl  mt-2 text-center items-center justify-center '>Total Value Locked </h2>
                            <h2 className='text-xl text-gray-600 hover:text-orange-800 '>{ValueLocked} TFIL</h2>
                        </div>

                        <div className=' p-3 m-6  flex-col bg-white mt-2 h-22 text-center justify-center cursor-pointer shadow-2xl flex rounded-xl'>
                            <h2 className='text-xl  mt-2 text-center items-center justify-center '>Total Value  Spent </h2>
                            <h2 className='text-xl text-red-600 hover:text-orange-600'>{ValueSpent} TFIL</h2>
                        </div>
                        <div>
                        {state === 0 && 
                        <div className=' p-3 m-6  flex-col bg-white mt-2 h-22 text-center justify-center cursor-pointer shadow-2xl flex rounded-xl'>
                        <h2 className='text-xl  mt-2 text-center items-center justify-center '>Remaining Amount  </h2>
                        <h2 className='text-xl text-green-600 hover:text-green-500 '>{ValueLocked - ValueSpent} TFIL</h2>
                        </div>
                        }
                        {
                            state === 1 &&
                            <div className=' p-3 m-6  flex-col bg-white mt-2 h-22 text-center justify-center cursor-pointer shadow-2xl flex rounded-xl'>
                            <h2 className='text-xl  text-red-600 mt-2 text-center items-center justify-center '>Listed Ended, Withdraw:  </h2>
                            <h2 className='text-xl text-green-600 hover:text-green-500 '>{ValueLocked - ValueSpent} TFIL</h2>
                            </div>
                        }
                        {
                            state === 2 &&
                            <div className=' p-3 m-6  flex-col bg-white mt-2 h-22 text-center justify-center cursor-pointer shadow-2xl flex rounded-xl'>
                            <h2 className='text-xl  text-green-600 mt-2 text-center items-center justify-center '>Listed Ended, Money WithDrawn  </h2>
                            </div>
                        }
                        </div>       



                    </div>
                    <div className=''>
                        <ResponsiveContainer width="100%" height="90%" aspect={3}>
                            <BarChart
                                width={500}
                                height={300}
                                data={viewdata}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="male" fill="#8884d8" />
                                <Bar dataKey="female" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="text-center">

                        <Ads_Dropdown onSelect={onSelect} data={dropdata} />
                    </div>

                    <div className='grid grid-flow-row grid-cols-2'>
                        <Link href="/">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500  uppercase text-white py-3 mt-6 rounded-full w-3/5">
                                Back to home
                            </button>
                        </Link>


                        <button
                            type="submit"
                            className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500  uppercase  text-white py-3 mt-6 rounded-full w-3/5"
                            onClick={OnWithdraw}
                            >
                            Withdraw Your Funds
                        </button>

                    </div>
                </div>
            </div>

        </div >
    )
}

export default New