import React, {useEffect} from 'react';
import {Names} from "./Names/Names";
import './mainPage.scss';
import styled from "styled-components";
import {motion} from "framer-motion";
import {ReactComponent as Heart} from "../images/heart.svg";
import {ReactComponent as Location} from "../images/location.svg";
import {ReactComponent as Gift} from "../images/gift.svg";
import {ReactComponent as Divider} from "../images/divider.svg";
import {ReactComponent as Bus} from "../images/bus.svg";
import {CountDown} from "./CountDown/CountDown";


const FlexCenter = styled(motion.div)`
display: flex;
justify-content: center;
align-items: center`

const month = [[1, 2, 3],[4, 5, 6, 7, 8, 9, 10], [11, 12, 13, 14, 15, 16, 17], [18, 19, 20, 21, 22, 23, 24], [25, 26, 27, 28, 29, 30] ];

const titleVariants = {
    offscreen: {
        opacity: 0,
        transform: 'scale(0.9)',
    },
    onscreen: {
        opacity: 1,
        transform: 'scale(1)',
        transition: {
            delay: 0.3,
            bounce: 0.4,
            duration: 0.8
        }
    }
};

const locationVariants = {
    offscreen: {
        opacity: 0,
        y: -50,
    },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.3,
            bounce: 0.4,
            duration: 0.8
        }
    }
}

const textVariants = {
    offscreen: {
        opacity: 0,
    },
    onscreen: {
        opacity: 1,
        transition: {
            delay: 0.3,
            duration: 1
        }
    }
}

const busVariants = {
    offscreen: {
        x: "100%",
    },
    onscreen: {
        x: "0%",
        transition: {
            delay: 0.3,
            duration: 1
        }
    }
}

export const MainPage = () => {
    useEffect(() => {

        const postData = async (ev) => {
            ev.preventDefault();
            // получаем ссылки на элементы формы
            const name = document.querySelector("[name=name]");
            const presence = document.querySelector("[name=presence]");

            // собираем данные из элементов формы
            let details = {
                name: name.value.trim(),
                presence: presence.value.trim(),
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
                mode: "no-cors",
                body: formBody,
            })
                .then((res) => res.json())
                .catch(() => {})
            // .then((res) => console.log(res));
                console.log(result);
            if (result?.type === 'success') {
                name.value = '';

                presence.value = '';

                alert('Спасибо! Данные успешно отправлены.')
            }
        }

        const URL_APP = "https://script.google.com/macros/s/AKfycbxwO9iYXngZOZtlPvzlcTuyc1CPUjWJUUJqqyGTiZNK-wBE5TtAGppRnlN9WvCqoWRu/exec";

        // находим форму в документе
        const form = document.querySelector("#form");

        // указываем адрес отправки формы (нужно только в начале примера)
        form.action = URL_APP;

        // навешиваем обработчик на отправку формы
        form.addEventListener("submit", postData);

        return () => {
            form.removeEventListener('submit', postData);
        };

    }, [])

    const handleClickLocation = () => {
        window.open('https://www.google.com/maps/place/%D0%9F%D0%B0%D1%80%D0%BA-%D0%BE%D1%82%D0%B5%D0%BB%D1%8C+%22%D0%90%D1%80%D1%85%D0%B0%D0%BD%D0%B3%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%B0%D1%8F+%D0%A1%D0%BB%D0%BE%D0%B1%D0%BE%D0%B4%D0%B0%22/@54.4383532,48.6465162,15z/data=!4m2!3m1!1s0x0:0xf65e68174362b6f1?sa=X&ved=2ahUKEwj69oih-52AAxXzEBAIHVH3AggQ_BJ6BAhREAA&ved=2ahUKEwj69oih-52AAxXzEBAIHVH3AggQ_BJ6BAhXEAg');
    }
    return (
        <div className="main">
            <div className="main_start">
                <div className="text" style={{fontSize: '24px', fontWeight: '700'}}>приглашение на свадьбу</div>
                <Names/>
                <div className="text" style={{fontSize: '24px', fontWeight: '700'}}>09.09.2023</div>
                <FlexCenter style={{marginTop: '60px'}} initial={{ opacity: 0 }} animate={{ y: [0, 20, 0], opacity: 1 }} transition={{ delay: 2, duration: 2, times: [0, 0.5, 1], repeat: Infinity, }}>
                    <img alt="Dmitry and Maria" width="48px" height="32px" src="https://static.tildacdn.com/tild3764-3337-4432-b961-316366353332/Frame_1123.png"/>
                </FlexCenter>
            </div>

    <div className="main_all">
        <motion.div  variants={textVariants}
                     initial="offscreen"
                     whileInView="onscreen"
                     viewport={{ once: true, amount: 1 }}
                     className="text">
            Скоро наступит очень важный для нас день –
            <span style={{fontWeight: 700, marginLeft: '6px'}}>
                мы станем семьей!
             </span>
        </motion.div>
        <motion.div
            variants={textVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 1 }}
            className="text">
            Этот день будет для нас особенным, и мы хотим провести его в кругу близких и друзей!
            <br/> С большим удовольствием приглашаем Вас на замечательный праздник - нашу свадьбу.
        </motion.div>
        <div className="month">Сентябрь</div>
        <div className="month_container">
            <motion.div  initial={{ scale: 1 }}
                         animate={{ scale: 1.2 }}
                         transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                         style={{position: 'absolute', top: '48px', right: '40px'}}
            >
                <Heart />
            </motion.div>

            {month.map(week => <div className="week_container">{week.map(day => <div style={{width: '28px', textAlign: 'center'}}>{day}</div>)}</div>)}
        </div>
        <Divider className="divider"/>
        <motion.div
            variants={titleVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 1 }}
            className="title">
            Место проведения
        </motion.div>
        <motion.div variants={textVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 1 }}
                    className="text">
            Ульяновская область, Чердаклинский район, село Архангельское, <br/>
            «Парк-отель Архангельская Слобода»
        </motion.div>
        <div
                    className="text">
            СБОР ГОСТЕЙ
        </div>
        <div
                    className="text" style={{fontWeight: 700, fontSize: '32px', textDecoration: 'underline', marginTop: '16px'}}
        >
            15:40
        </div>

        <motion.div
            variants={locationVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 1 }}>
            <Location style={{width: '100px', height: '120px', marginTop: '20px'}}/>
        </motion.div>

        <button className="button_location" onClick={handleClickLocation}>Как добраться?</button>

        <motion.div
            variants={busVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 1 }}
            style={{width: '80px', marginLeft: '0px'}}
        >
            <Bus style={{marginTop: '30px', width: '86px'}}/>
        </motion.div>



        <motion.div variants={textVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 1 }}
                    className="text">Не волнуйтесь о том, как добраться на наш праздник! <br/>
            Всех желающих будет ожидать автобус (место и время сбора сообщим дополнительно).
        </motion.div>

        <CountDown date={new Date('Sat, 6 Sep 2023 15:40:00')}/>

        <motion.div
            variants={titleVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 1 }}
            className="title">
            Дресс-код
        </motion.div>
        <motion.div variants={textVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 1 }}
                    className="text">На нашей свадьбе ограничений по дресс-коду нет. <br/> Для нас главное - Ваше присутствие и хорошее настроение!</motion.div>
        <Gift style={{marginTop: '20px'}}/>
        <motion.div variants={textVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 1 }} className="text">Мы очень ценим Вашу заботу, внимание и будем рады любому подарку! <br/> И не важно, в какой конверт Вы его упакуете :)</motion.div>
        <Divider className="divider"/>
        <motion.div  variants={titleVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 1 }}
              className="title">
            Анкета
        </motion.div>
        <motion.div variants={textVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 1 }} className="text" style={{fontWeight: 500}}>ВАШИ ОТВЕТЫ НА ВОПРОСЫ ПОМОГУТ НАМ <br/> ПРИ ОРГАНИЗАЦИИ ТОРЖЕСТВА</motion.div>
        <motion.div variants={textVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 1 }}
                    className="text" style={{fontWeight: 700}}>Будем ждать ответ до 06.08.2023:</motion.div>

        <form method="post" id="form" className="form" name="submit-to-google-sheet">
            <div className="form-text" htmlFor="name">Ваши имя и фамилия + Вашей пары/членов семьи и детей</div>
            <input className="form_input" name="name" id="name" type="text" placeholder="ФИО"/>

            <div className="form-text" htmlFor="presence">Планируете ли вы присутствовать на свадьбе?</div>
            <div className="form-text">
                 <label className="form-control">
                 <input name="presence" className="custom-radio" type="radio" value="yes"/>
                     Да, с удовольствием!
                 </label>
            </div>
            <div className="form-text">
                <label className="form-control" htmlFor="no">
                    <input name="presence" type="radio" value="no"/>
                    К сожалению, не смогу
                </label>
            </div>

            <button className="button_location" type="submit">Отправить</button>
        </form>
        <motion.div
            variants={locationVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 1 }}
            className="title" style={{marginBottom: '60px'}}>
            С любовью, <br/> Дмитрий и Мария
        </motion.div>


    </div>

        </div>

    );
};
