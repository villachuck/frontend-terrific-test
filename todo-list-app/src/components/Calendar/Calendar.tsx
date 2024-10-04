import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import './Calendar.css';

interface List {
    id: string;
    category: string;
    list_name: string;
    status: string;
}

const Calendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(true);
    const [scheduledList, setScheduledList] = useState<List[]>([]);
    const [sizeDiv, setSizeDiv] = useState<string>('');
    const [sizeDiv2, setSizeDiv2] = useState<string>('');
    const userId = localStorage.getItem('user_id');
    const navigate = useNavigate();

    const convertDate = async (date: Date | null) => {        
        if (!date) return "";
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
        const day = date.getDate().toString().padStart(2, "0");
        setSelectedDate(`${year}-${month}-${day}`);
        localStorage.setItem('filter_date', `${year}-${month}-${day}`);

        const getSchedule = async (selection: string) => {
            try {
                const response = await fetch(`http://localhost:3000/api/lists/${userId}/${selection}`);
                if(!response.ok) {
                    throw new Error('Something went wrong');
                }
    
                const data = await response.json();         
                setSizeDiv('w-60');
                setSizeDiv2('w-40');
                setScheduledList(data);
            }
            catch(err) {
                console.log(err);
            }
        };
        
        await getSchedule(`${year}-${month}-${day}`);        
    }

    const newFilterDate = () => {
        navigate('/home');
    }

    return (
        <>
        <div className="calendar-home">
            <div className="calendar-container">
                <div className={`calendar ${sizeDiv}`}>
                    <DatePicker                        
                        onChange={(date: Date | null) => convertDate(date)}
                        open={isOpen}
                        onClickOutside={() => setIsOpen(true)}
                        shouldCloseOnSelect={false}
                        inline
                    />
                </div>
                <div className={`scheduled-lists ${sizeDiv2}`}>
                    <h2>{selectedDate}</h2>
                    <p>There's {scheduledList.length > 0 ? scheduledList.length : 'no'} To-Do List for today.</p>
                    <button type="button" className="btn-details" onClick={newFilterDate}>{scheduledList.length > 0 ? 'Show me more' : 'Create a To-Do List'}</button>
                </div>
            </div>
        </div>        
        </>
    )
}

export default Calendar;
