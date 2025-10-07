import { useEffect, useRef, useState } from "react";
import css from "./AppointmentModal.module.css";

const TimeSelect = ({ field, form }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState(field.value || "00:00");
    const timeOptions = [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
    ];
    
    const dropdownRef = useRef(null);
    
    const handleTimeSelect = (time) => {
        setSelectedTime(time);
        setIsOpen(false);
        form.setValue(field.name, time);
    };
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    return (
        <div className={css.timeContainer} ref={dropdownRef}>
            <div className={css.timeSelect} onClick={() => setIsOpen(!isOpen)}>
                {selectedTime}
                <img src="/icons/clock.svg" alt="clock" />
            </div>
            
            {isOpen && (
                <div className={css.timeOptions}>
                    <p>Meeting time</p>
                    <div className={css.timeList}>
                        {timeOptions.map((time) => (
                            <li key={time} onClick={() => handleTimeSelect(time)}>
                                {time}
                            </li>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimeSelect;