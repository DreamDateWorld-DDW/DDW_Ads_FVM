import Select from 'react-dropdown-select'
import React, { useEffect, useState } from 'react';
import { ads_read_contract } from '../utilities/readContract';

function Dropdown({ onSelect}) {
    const [options, setOptions] = useState([])

    useEffect(() => {
        ads_read_contract.view_keywords().then((keywords)=>{
        var optionsData = []
        for(var i=0; i < keywords.length; i++) {
            optionsData.push({id: i+1, Keyword: keywords[i]})
        }
        setOptions(optionsData)
        })
    })

    const [selectedOptions, setSelectedOptions] = useState([])

    return (
        <>
            <div style={{ width: '800px', padding:"6px",borderRadius:"2px" }} >
                <Select options={options.map((item, index) => {
                    return { value: item.id, label: item.Keyword }
                })}
                    multi="true"
                    values={selectedOptions} onChange={(values) => { setSelectedOptions([...values]);
                     onSelect(values) }} />
            </div>
        </>
    );
}

export default Dropdown;