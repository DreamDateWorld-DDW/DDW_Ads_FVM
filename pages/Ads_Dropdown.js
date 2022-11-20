import Select from 'react-dropdown-select'
import React, { useState } from 'react';

function Ads_Dropdown({ onSelect }) {
    const [options, setOptions] = useState([
        { id: 1, Interest: "Grocery" },
        { id: 2, Interest: "Fashion" },
        { id: 3, Interest: "Electronics" },
        { id: 4, Interest: "Beauty Products" },
        { id: 5, Interest: "Travel" },
    ])

    const [selectedOptions, setSelectedOptions] = useState([])

    return (
        <>
            <div style={{marginLeft:"50px", width: '700px', padding: "6px", border:"30px"  }}
            className="rounded-lg" >
                <Select className='rounded-lg p-6 text-gray-700 ' options={options.map((item, index) => {
                    return { value: item.id, label: item.Interest }
                })}
                    multi="true"
                    
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