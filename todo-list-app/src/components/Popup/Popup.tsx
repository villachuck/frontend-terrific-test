import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import './Popup.css';
import "react-datepicker/dist/react-datepicker.css";


interface PopupProps {
    type: string;
    show: boolean;
    onClose: () => void;
    callback: () => void;
}

interface Categories {
    id: string;
    name: string;
}

const Popup: React.FC<PopupProps> = ({ type, show, onClose, callback }) => {
    const popUpTitle = type == 'todoList' ? 'New To-Do List' : 'Update To-Do List';
    const openPopUp = show ? 'popup-visible' : 'popup-hidden';
    //const [visibility, setVisibility] = useState<string>(openPopUp);
    const [categoryList, setCategoryList] = useState<Categories[]>([]);
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [nameList, setNameList] = useState<string>('');
    const { userId } = useParams<{ userId: string }>();

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/categories');
                if(!response.ok) {
                    throw new Error('Something went wrong');
                }
    
                const data = await response.json();
                setCategoryList(data);              
            }
            catch(err) {
                console.log(err);
            }        
        };

        getCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameList(e.target.value);
    };

    const userToken = localStorage.getItem('authToken');

    const newList = () => {
        const dataNewList = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${userToken}` 
            },
            body: JSON.stringify({
                list_name: nameList,
                active: true,
                category: selectedValue,
                status: 'pending',
                created_at: new Date(),
                scheduled: startDate,
                updated_at: new Date(),
                user_id: userId
            })
        };

        fetch('http://localhost:3000/api/lists/new', dataNewList)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            callback();
            onClose();                        
        });
    };    
    

    return (
        <div className={`popup-background ${openPopUp}`}>
            <div className="popup-container">
                <div className="popup-header">
                    {popUpTitle}
                    <div className="close-popup" onClick={onClose}>
                        <img src="/close-icon.png" alt="close icon" />
                    </div>
                </div>
                <div className="popup-body">
                    {type == 'todoList'
                        ?
                        <div className="todo-fields">
                            <div className="name-section">
                                <label>Name</label>
                                <input type="text" className="input-name"
                                value={nameList} onChange={handleNameChange} />
                            </div>

                            <div className="category-section">
                                <label>Category</label>
                                <select id="categories"
                                    value={selectedValue}
                                    onChange={handleChange}>
                                        <option value="" disabled>Select a category</option>
                                        {categoryList.map((l) => (
                                        <option key={l.id} value={l.name}>
                                            {l.name}
                                        </option>
                                        ))}                                        
                                </select>
                            </div>
                            <div className="date-section">
                                <label>Date</label>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} 
                                    dateFormat={'dd/MM/yyyy'}/>
                            </div>
                        </div>
                        :
                        <div className="task-fields">
                            
                        </div>
                    }                
                </div>
                <div className="popup-footer">
                    <button type="button" className="btn-create-element" onClick={newList}>Create</button>
                </div>
            </div>
        </div>
    )
}

export default Popup;
