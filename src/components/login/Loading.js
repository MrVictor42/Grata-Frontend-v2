import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const Loading = () => {
    return (
        <div style = {{ backgroundColor: 'white' }}>
            <LoadingOutlined className = 'loading'/><br/>
            <span className = 'text'> Carregando ... Aguarde um momento ... </span>
        </div>
    );
};

export default Loading;