import {useEffect, useState} from "react";
import "./CountDown.scss";

export const CountDown = ({date}) => {
    const [finishTime] = useState(date.getTime());
    const [[diffDays, diffH, diffM, diffS], setDiff] = useState([0, 0, 0, 0]);
    const [tick, setTick] = useState(false);
    const [isTimeout, setIsTimeout] = useState(false);
    const [timerId, setTimerID] = useState(0);

    useEffect(() => {
        // @ts-ignore
        const diff = (finishTime - new Date()) / 1000;
        if (diff < 0) {
            setIsTimeout(true);
            return;
        }
        setDiff([
            Math.floor(diff / 86400), // дни
            Math.floor((diff / 3600) % 24),
            Math.floor((diff / 60) % 60),
            Math.floor(diff % 60)
        ]);
    }, [tick, finishTime]);

    useEffect(() => {
        if (isTimeout) clearInterval(timerId);
    }, [isTimeout, timerId]);

    useEffect(() => {
        const timerID = setInterval(() => {
            setTick(!tick);
        }, 1000);
        setTimerID(timerID);
        return () => clearInterval(timerID);
    }, [tick]);

    return (
            <div className="container_timer">
                <div className="count_title">
                    До нашей свадьбы осталось:
                </div>
                <div className="count_container">
                    <div className="count_item">
                        <div className="count_value">{diffDays}</div>
                        <div>дней</div>
                    </div>
                    <div className="count_item">
                        <div className="count_value">{diffH.toString()}</div>
                        <div>часов</div>
                    </div>
                    <div className="count_item">
                        <div className="count_value">{diffM.toString()}</div>
                        <div>минут</div>
                    </div>
                    <div className="count_item">
                        <div className="count_value">{diffS.toString()}</div>
                        <div>секунд</div>
                    </div>
            </div>

        </div>
    );
};