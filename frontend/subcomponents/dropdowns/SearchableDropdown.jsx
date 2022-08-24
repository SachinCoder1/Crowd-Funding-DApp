import React, { useState } from 'react';
import Select from 'react-select';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    // borderBottom: '1px solid grey',
    cursor: "pointer",
  }),

}


export default function SearchableDropdown({options, placeholder, selectedOption, setSelectedOption, id  }) {
  return (
    <div className="">
      <label className='flex pb-2 ml-10' htmlFor={id}>{placeholder}</label>
      <Select
      styles={customStyles}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        arrow={false}
        options={options}
        placeholder={placeholder}
        isSearchable={true}
        isClearable
        className="w-max md:px-10 px-5 !cursor-pointer primary-50 text-black"
      />
    </div>
  );
}

