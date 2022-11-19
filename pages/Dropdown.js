import Select from 'react-dropdown-select'
import React, { useState } from 'react';

function Dropdown({ onSelect }) {
    const [options, setOptions] = useState([
        { id: 1, Interest: "Nightclubs" },
        { id: 2, Interest: "Whiskey" },
        { id: 3, Interest: "Indie" },
        { id: 4, Interest: "Hiking" },
    ])

    const [selectedOptions, setSelectedOptions] = useState([])

    return (
        <>
            <div style={{ width: '800px', padding:"6px",borderRadius:"2px" }} >
                <Select options={options.map((item, index) => {
                    return { value: item.id, label: item.Interest }
                })}
                    multi="true"
                    values={selectedOptions} onChange={(values) => { setSelectedOptions([...values]);
                     onSelect(values) }} />
            </div>
        </>
    );
}

export default Dropdown;