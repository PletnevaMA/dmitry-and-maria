import React from 'react';
import {Names} from "./Names/Names";
import './mainPage.scss';
import styled from "styled-components";
import {motion} from "framer-motion";


const FlexCenter = styled(motion.div)`
display: flex;
align-items: center;
justify-content: center`

export const MainPage = () => {
    return (
        <>
            <div className="main">
                <Names/>
                <div className="text">приглашают на свою свадьбу</div>
                <FlexCenter style={{marginTop: '60px'}} initial={{ opacity: 0 }} animate={{ y: [0, 20, 0], opacity: 1 }} transition={{ delay: 2, duration: 2, times: [0, 0.5, 1], repeat: Infinity, }}>
                    <img alt="Dmitry and Maria" width="48px" height="32px" src="https://static.tildacdn.com/tild3764-3337-4432-b961-316366353332/Frame_1123.png"/>
                </FlexCenter>
            </div>


            <div className="text">Скоро наступит очень важный для нас день – мы станем семьей!</div>
            <div className="text">Будем счастливы разделить этот день с вами</div>
        </>

    );
};
