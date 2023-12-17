import React, { useRef, useState, useEffect } from 'react';
import Select from 'react-select';
import ACTIONS from '../socket/actions';

/*
?Styles To Be Applied...!!!
*/
//colors
const pricolor = '#000000';
const darkpri = '#2121DE';
const yellow = '#F3F518';
const border = '2px solid white';
const fontFamily = 'pixel';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        width: '100px',
        backgroundColor: pricolor,
        cursor: 'pointer',
        fontFamily: fontFamily,
        textAlign: 'center',
        fontSize: '30px',
        border: state.isFocused ? border : border,
        borderRadius: 'none',
        "&:hover": {
            borderColor: darkpri,
        }
    }),

    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#ffffff',
        "&:hover": {
            color: yellow,
        }
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#ffffff',
        "&:hover": {
            color: yellow,
        }
    }),

    indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none',
    }),

    noOptionsMessage: (provided) => ({
        ...provided,
        color: '#ffffff',
        fontFamily: fontFamily,
    }),

    option: (provided, state) => ({
        ...provided,
        cursor: 'pointer',
        backgroundColor: state.isSelected ? darkpri : state.isFocused ? darkpri : 'transparent',
        color: state.isSelected ? yellow : state.isFocused ? yellow : '#ffffff',
        fontFamily: fontFamily,
        padding: '0.4em 1.5em',
        fontSize: '30px',
    }),

    input: (provided) => ({
        ...provided,
        color: '#ffffff',
        padding: '0.2em 0.8em',
    }),

    menu: (provided) => ({
        ...provided,
        backgroundColor: pricolor,
        fontSize: '25px',
        width: 'fit-content',
        border: border,
        borderRadius: 'none',
        marginLeft: '20px',
        marginTop: '6px',
    }),
};


/*
?Language Options
*/
const options = [
    { label: 'C++', value: 'cpp' },
    { label: 'Java', value: 'java' },
    { label: 'Python', value: 'py' },
    { label: 'GoLang', value: 'go' },
    { label: 'C', value: 'c' },
    { label: 'C#', value: 'cs' },
];


/* 
?Component Function Is Starting From Here
*/
export default function LangSelect({ setLanguage, setFileName, playgroundId, socketRef, isPlaygroundRoute }) {


    const handleChange = (selectedOption) => {
        setLanguage((prevLanguage) => prevLanguage = selectedOption.value);
        setFileName((prevFileName) => prevFileName = selectedOption.value);
    };


    return (
        <>
            <Select
                onChange={handleChange}
                // className="basic-single"
                styles={customStyles}
                classNamePrefix="select"
                defaultValue={options[0]}
                // name="color"
                options={options}
                isSearchable
            />
        </>
    )
}
