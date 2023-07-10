import React from 'react';
import {Names} from "./Names/Names";
import './mainPage.scss';
import styled from "styled-components";
import {motion} from "framer-motion";
import {ReactComponent as Heart} from "../images/heart.svg";


const FlexCenter = styled(motion.div)`
display: flex;
justify-content: center;
align-items: center`

const month = [[1, 2, 3],[4, 5, 6, 7, 8, 9, 10], [11, 12, 13, 14, 15, 16, 17], [18, 19, 20, 21, 22, 23, 24], [25, 26, 27, 28, 29, 30] ]

export const MainPage = () => {
    return (
        <div className="main">
            <div className="main_start">
                <Names/>
                <div className="text">приглашают на свою свадьбу</div>
                <FlexCenter style={{marginTop: '60px'}} initial={{ opacity: 0 }} animate={{ y: [0, 20, 0], opacity: 1 }} transition={{ delay: 2, duration: 2, times: [0, 0.5, 1], repeat: Infinity, }}>
                    <img alt="Dmitry and Maria" width="48px" height="32px" src="https://static.tildacdn.com/tild3764-3337-4432-b961-316366353332/Frame_1123.png"/>
                </FlexCenter>
            </div>

    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px'}}>
        <div className="text">Скоро наступит очень важный для нас день –<span style={{fontWeight: 700, marginLeft: '6px'}}>мы станем семьей!</span></div>
        <div className="text">Этот день будет для нас особенным, и мы хотим провести его в кругу близких и друзей! <br/> С большим удовольствием приглашаем Вас на замечательный праздник - нашу свадьбу.</div>
        <div className="month">Сентябрь</div>
        <div className="month_container">
            <Heart style={{position: 'absolute', top: '48px', right: '40px'}}/>
            {month.map(week => <div className="week_container">{week.map(day => <div style={{width: '28px', textAlign: 'center'}}>{day}</div>)}</div>)}
        </div>
        <div className="title">Место проведения</div>
        <div className="text">Ульяновская область, Чердаклинский район, село Архангельское, <br/>«Парк-отель Архангельская Слобода»</div>
        <button className="button_location">Как добраться?</button>
        <div className="title">Тайминг</div>
        <div
             style={{backgroundImage: 'url("https://static.tildacdn.com/tild3261-3762-4638-b964-396335616665/Frame_1122.png")', width: '30px', height: '30px'}}></div>
    </div>

        </div>

    );
};
