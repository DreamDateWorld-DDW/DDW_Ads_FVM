import React, { useState } from 'react'
import Link from 'next/link';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Ads_Dropdown from './Ads_Dropdown';

function New() {
    const [userDetails, setuserDetails] = useState();
    const onSelect = async (values) => {
        setuserDetails({ ...userDetails, interest: values })
    }

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];


    return (
        <div className="  h-screen items-center flex justify-center ">
            <div className="bg-gray-100 flex rounded-xl  w-3/5 font-mono  mt-20">
                <div className="flex-1 text-gray-700  p-20 text-center mt-2 ">


                    <div className=' grid grid-row-3 grid-flow-col w-full rounded-lg  mb-16 '>
                        <div className=' p-3 m-6 flex-col bg-white mt-2 h-22 text-center justify-center  cursor-pointer shadow-2xl flex rounded-xl'>
                            <h2 className='text-xl  mt-2 text-center items-center justify-center '>Total Value Locked </h2>
                            <h2 className='text-xl text-gray-600 hover:text-orange-800 '>$2000</h2>
                        </div>

                        <div className=' p-3 m-6  flex-col bg-white mt-2 h-22 text-center justify-center font cursor-pointer  shadow-2xl flex rounded-xl'>
                            <h2 className='text-xl  mt-2 text-center items-center justify-center '>Total Value  Spent </h2>
                            <h2 className='text-xl text-red-600 hover:text-orange-600'>$1000</h2>
                        </div>

                        <div className=' p-3 m-6  flex-col bg-white mt-2 h-22 text-center justify-center cursor-pointer shadow-2xl flex rounded-xl'>
                            <h2 className='text-xl  mt-2 text-center items-center justify-center '>Remaining Amount </h2>
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
                                <Bar dataKey="pv" fill="#8884d8" />
                                <Bar dataKey="uv" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="text-center">

                        <Ads_Dropdown onSelect={onSelect} />
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

        </div>
    )
}

export default New