import React, { useState } from 'react';
import { Input, AutoComplete } from 'antd';

function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

const searchResult = query =>
    new Array(getRandomInt(5)).join('.').split('.').map((item, idx) => {
        const category = `${ query }${ idx }`;
        return {
            value: category,
            label: (
                <div
                    style = {{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <span>
                    Found { query } on{' '}
                    <a
                        href = { `https://s.taobao.com/search?q=${ query }` }
                        rel = ''
                    >
                        { category }
                    </a>
                    </span>
                    <span>{ getRandomInt(200, 100)} results</span>
                </div>
            ),
        };
    });

const Complete = () => {
    const [ options, setOptions ] = useState([]);
    const handleSearch = value => {
    setOptions(value ? searchResult(value) : []);
};

const onSelect = value => {
    console.log('onSelect', value);
};

  return (
        <AutoComplete 
            dropdownMatchSelectWidth = { 252 }
            options = { options }
            className = 'autoComplete'
            onSelect = { onSelect }
            onSearch = { handleSearch }
        >
            <Input.Search size = 'large' 
                placeholder = 'Pesquise Aqui Sobre Projetos, Reuniões, Setores, Pessoas...' enterButton 
            />
        </AutoComplete>
    );
};

export default Complete;