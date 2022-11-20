import Select from 'react-dropdown-select'
import React, { useEffect, useState } from 'react';

function Ads_Dropdown({ onSelect, data }) {
    const [options, setOptions] = useState([])

    useEffect(() => {
        var optionsData = []
        for(var i=0; i < data.length; i++) {
            optionsData.push({id: i+1, Interest: data[i]})
        }
        console.log("listing name", optionsData)
        setOptions(optionsData)
    }, [data])

    const [selectedOptions, setSelectedOptions] = useState([])

    return (
        <>
            <div style={{marginLeft:"50px", width: '700px', padding: "6px", border:"30px"  }}
            className="rounded-lg" >
                <Select className='rounded-lg p-6 text-gray-700 ' options={options.map((item, index) => {
                    return { value: item.id, label: item.Interest }
                })}
                    
                    values={selectedOptions} onChange={(values) => {
                        setSelectedOptions([...values]);
                        onSelect(values)
                    }}
                  
                       

                    />
            </div>
        </>
    );
}

export default Ads_Dropdown;