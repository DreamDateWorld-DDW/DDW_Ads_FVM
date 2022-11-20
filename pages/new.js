import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Ads_Dropdown from './Ads_Dropdown';
import { createDDWAdsWriteContract } from '../utilities/writeContract';

function New() {
    const [userDetails, setuserDetails] = useState();
    const [dropdata, setData] = useState();
    const [viewdata, setViewData] = useState();
    const onSelect = async (values) => {
        setuserDetails({ ...userDetails, interest: values })
    }

    function transform_data(_data) {
        returnData = {}
        for(i=0; i<data[8].length; i++){
            if(!(_data[8][i] in  returnData)) returnData[_data[8][i]] = {}
            if(_data[9][i] in returnData[_data[8][i]]) {

            }
            returnData[_data[8][i]] = { }
        }
        _data[8] 
    }

    useEffect(() => {
        var Contract = createDDWAdsWriteContract();
        Contract.view_listing_names().then(
            (listings) => {
                if(listings.length === 0) return;
                setData(listings)
                Contract.view_listing_analytics().then(
                    (response) => {
                        console.log(response)
                        var thedata = transform_data(response)
                        setViewData(thedata);
                    }
                )
            }
        )
    })

    const data = [
        {
            name: 'Coffee',
            male: 4000,
            female: 2400,

        },
        {
            name: 'Club',
            male: 3000,
            female: 1398,

        },
        {
            name: 'Park',
            male: 2000,
            female: 9800,
            amt: 2290,
        },
        {
            name: 'Hiking',
            male: 2780,
            female: 3908,
            amt: 2000,
        },
    ]


    return (
        <div className="  h-screen items-center flex justify-center ">
            <div className="bg-gray-100 flex rounded-xl  w-3/5 font-mono  mt-20">
                <div className="flex-1 text-gray-700  p-20 text-center mt-2 ">


                    <div className=' grid grid-row-4 grid-flow-col w-full rounded-lg mt-18 mb-16 '>

                        <div className=' p-3  m-6 flex-col bg-white mt-2 h-22 text-center justify-center cursor-pointer shadow-2xl flex rounded-xl'>
                            <h2 className='text-xl w-full mt-2 text-center items-center justify-center '>Total Watch  Count  </h2>
                            <h2 className='text-xl text-purple-600 hover:text-blue-300 '>1000</h2>
                        </div>

                        <div className=' p-3 m-6  flex-col bg-white mt-2 h-22 text-center justify-center cursor-pointer shadow-2xl flex rounded-xl'>
                            <h2 className='text-xl  mt-2 text-center items-center justify-center '>Total Value Locked </h2>
                            <h2 className='text-xl text-gray-600 hover:text-orange-800 '>$2000</h2>
                        </div>

                        <div className=' p-3 m-6  flex-col bg-white mt-2 h-22 text-center justify-center cursor-pointer shadow-2xl flex rounded-xl'>
                            <h2 className='text-xl  mt-2 text-center items-center justify-center '>Total Value  Spent </h2>
                            <h2 className='text-xl text-red-600 hover:text-orange-600'>$1000</h2>
                        </div>

                        <div className=' p-3 m-6  flex-col bg-white mt-2 h-22 text-center justify-center cursor-pointer shadow-2xl flex rounded-xl'>
                            <h2 className='text-xl  mt-2 text-center items-center justify-center '>Remaining Amount  </h2>
                            <h2 className='text-xl text-green-600 hover:text-green-500 '>$1000</h2>
                        </div>



                    </div>
                    <div className=''>
                        <ResponsiveContainer width="100%" height="90%" aspect={3}>
                            <BarChart
                                width={500}
                                height={300}
                                data={data}
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
                            className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500  uppercase  text-white py-3 mt-6 rounded-full w-3/5">
                            Withdraw Your Funds
                        </button>

                    </div>
                </div>
            </div>

        </div >
    )
}

export default New