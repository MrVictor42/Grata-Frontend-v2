import React from 'react';

const Homepage = () => {
    return (
        <div className = 'centralContent'>
            <p className = 'textContent'>
                Bem Vindo ao sistema de Gerenciamento de Reuniões e Atas (Grata), o 
                software que a sua empresa necessita para alcançar maiores níveis de
                aproveitamento em seus encontros. Planeje suas reuniões, defina os
                participantes, gere atas, diminua o desperdício de tempo com papeis e
                deixe que o Grata ajude você e sua empresa a alcançar seus objetivos
                estratégicos.
                <br></br>
                <br></br>                                
                O Grata é uma ferramenta Open-Source,
                ou seja, o código dela é aberto e pode ser encontrado nos repositórios 
                <a href = 'https://github.com/MrVictor42/Grata-Frontend-v2'> FrontEnd </a> 
                e <a href = 'https://github.com/MrVictor42/Grata-Backend-v2'>Backend.</a>
                <br></br>
                Caso Deseje uma documentação sobre o projeto, basta clicar neste
                <a href = 'https://github.com/FGAProjects/TCC'> link</a>.
                <br></br>
                Contato com o desenvolvedor via github: 
                <a href = 'https://github.com/MrVictor42'> MrVictor42</a>.
            </p>
        </div>
    );
}

export default Homepage;