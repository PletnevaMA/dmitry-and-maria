import React, {useEffect} from 'react';
import {Names} from "./Names/Names";
import './mainPage.scss';
import styled from "styled-components";
import {motion} from "framer-motion";
import {ReactComponent as Heart} from "../images/heart.svg";
import {ReactComponent as Location} from "../images/location.svg";
import {ReactComponent as Gift} from "../images/gift.svg";
import {CountDown} from "./CountDown/CountDown";


const FlexCenter = styled(motion.div)`
display: flex;
justify-content: center;
align-items: center`

const month = [[1, 2, 3],[4, 5, 6, 7, 8, 9, 10], [11, 12, 13, 14, 15, 16, 17], [18, 19, 20, 21, 22, 23, 24], [25, 26, 27, 28, 29, 30] ]

export const MainPage = () => {
    useEffect(() => {

        const postData = async (ev) => {
            ev.preventDefault();
            // получаем ссылки на элементы формы
            const name = document.querySelector("[name=name]");
            const phone = document.querySelector("[name=phone]");

            // собираем данные из элементов формы
            let details = {
                name: name.value.trim(),

                phone: phone.value.trim(),

            };

            // подготавливаем данные для отправки
            let formBody = [];
            for (let property in details) {
                // кодируем названия и значения параметров
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            // склеиваем параметры в одну строку
            formBody = formBody.join("&");

            // выполняем отправку данных в Google Apps
            const result = await fetch(URL_APP, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                },
                cors: "no-cors",
                body: formBody,
            })
                .then((res) => res.json())
                .catch(() => alert("Ошибка!"))
            // .then((res) => console.log(res));

            if (result.type === 'success') {
                name.value = '';

                phone.value = '';

                alert('Спасибо за заявку!')
            }
            if (result.type === 'error') {
                alert(`Ошибка( ${result.errors}`)
            }
        }

        const URL_APP = "https://script.google.com/macros/s/AKfycbyX3R2Az3RePeYSuT4wfAciIwfu5Gkn6P9-N7Vq6mrz5Z6FvV91SCvbqkc7ihU2cHshgg/exec";

        // находим форму в документе
        const form = document.querySelector("#form");

        // указываем адрес отправки формы (нужно только в начале примера)
        form.action = URL_APP;

        // навешиваем обработчик на отправку формы
        form.addEventListener("submit", postData);

        return () => {
            // это cleanup здесь мы заметаем следы от наших предыдущих действий
            // удалим обработчик при размонтировании компонента
            form.removeEventListener('submit', postData);
        };

    }, [])
    return (
        <div className="main">
            <div className="main_start">
                <Names/>
                <div className="text">приглашают на свою свадьбу</div>
                <FlexCenter style={{marginTop: '60px'}} initial={{ opacity: 0 }} animate={{ y: [0, 20, 0], opacity: 1 }} transition={{ delay: 2, duration: 2, times: [0, 0.5, 1], repeat: Infinity, }}>
                    <img alt="Dmitry and Maria" width="48px" height="32px" src="https://static.tildacdn.com/tild3764-3337-4432-b961-316366353332/Frame_1123.png"/>
                </FlexCenter>
            </div>

    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <div className="text">Скоро наступит очень важный для нас день –<span style={{fontWeight: 700, marginLeft: '6px'}}>мы станем семьей!</span></div>
        <div className="text">Этот день будет для нас особенным, и мы хотим провести его в кругу близких и друзей! <br/> С большим удовольствием приглашаем Вас на замечательный праздник - нашу свадьбу.</div>
        <div className="month">Сентябрь</div>
        <div className="month_container">
            <Heart style={{position: 'absolute', top: '48px', right: '40px'}}/>
            {month.map(week => <div className="week_container">{week.map(day => <div style={{width: '28px', textAlign: 'center'}}>{day}</div>)}</div>)}
        </div>
        <div className="title">Место проведения</div>
        <div className="text">Ульяновская область, Чердаклинский район, село Архангельское, <br/>«Парк-отель Архангельская Слобода»</div>
        <div className="text">СБОР ГОСТЕЙ</div>
        <div className="text" style={{fontWeight: 700, fontSize: '32px', textDecoration: 'underline', marginTop: '16px'}}>15:40</div>


        <Location style={{width: '100px', height: '120px', marginTop: '20px'}}/>
        <button className="button_location">Как добраться?</button>

        <CountDown date={new Date('Sat, 6 Sep 2023 15:40:00')}/>

        <div className="title">Дресс-код</div>
        <div className="text">На нашей свадьбе ограничений по дресс-коду нет. <br/> Для нас главное - Ваше присутствие и хорошее настроение!</div>
        <Gift style={{marginTop: '20px'}}/>
        <div className="text">Мы очень ценим Вашу заботу, внимание и будем рады любому подарку! <br/> И не важно, в какой конверт Вы его упакуете :)</div>
        <div className="title">Анкета</div>
        <div className="text">ПРОСИМ ВАС ПОДТВЕРДИТЬ СВОЁ ПРИСУТСТВИЕ</div>
        <div className="text" style={{fontWeight: 700}}>ДО 06.08.2023:</div>

        <form method="post" id="form" name="submit-to-google-sheet">

            <input name="name" type="text" placeholder="First Name"/>
            <input name="phone" type="text" placeholder="Last Name"/>
            <button type="submit">Subscribe</button>
        </form>


    </div>

        </div>

    );
};
