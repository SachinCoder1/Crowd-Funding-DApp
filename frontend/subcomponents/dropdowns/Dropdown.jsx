import React, { useState } from 'react';
import Select from 'react-select';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    // borderBottom: '1px solid grey',
    cursor: "pointer",
  }),

}


export default function Dropdown({options, placeholder, selectedOption, setSelectedOption, id  }) {
  return (
    <div>
      <label className='w-32 ml-6 flex pb-2' htmlFor={id}>{placeholder}</label>
      <Select
      
      styles={customStyles}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        arrow={false}
        options={options}
        placeholder={placeholder}
        isClearable={true}
        className="w-max md:px-6 px-2 !cursor-pointer primary-50 text-black"
      />

    </div>
  );
}