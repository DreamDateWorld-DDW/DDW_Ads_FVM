import React from 'react'
import Link from 'next/link';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function New() {

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
            <div className="bg-white flex rounded-xl  w-3/5 font-latoRegular">
                <div className="flex-1 text-gray-700  p-20 text-center mt-2 ">
                    <h1 className="text-3xl pb-2 font-latoBold " >
                        DDW ADD&apos;s
                    </h1>

                    <div className='mt-16 '>
                        
                    </div>
                    <div>
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

                    <Link href="/">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 font-latoBold text-sm text-white py-3 mt-6 rounded-full w-3/5"

                        >
                            Back to home
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default New