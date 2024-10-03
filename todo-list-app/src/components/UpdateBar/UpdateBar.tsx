import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import './UpdateBar.css';

interface UpdateBarProps {
    id: string | null;
    show: boolean;
    onClose: () => void;
    reload: () => void;
}

interface ListDetails {
    id: string;
    active: boolean;
    category: string;
    list_name: string;
    scheduled: Date | null;
    status: string;
}

interface CategoriesFor {
    id: string;
    name: string;
}

const UpdateBar: React.FC<UpdateBarProps> = ({ id, show, onClose, reload }) => {
    const openPopUp = show ? 'popup-visible' : 'popup-hidden';
    const [categoryList, setCategoryList] = useState<CategoriesFor[]>([]);
    const [detailsList, setDetailsList] = useState<ListDetails>({
        id: '',
        active: true,
        category: '',
        list_name: '',
        scheduled: new Date(),
        status: ''
    });
    const [statusValue, setStatusValue] = useState<string | ''>('');

    const getListInfo = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/listById/${id}`);
            if(!response.ok) {
                throw new Error('Something went wrong');
            }

            const data = await response.json();
            setDetailsList({
                id: data.data[0].id,
                active: true,
                category: data.data[0].category,
                list_name: data.data[0].list_name,
                scheduled: data.data[0].scheduled,
                status: data.data[0].status
            }); 
            setStatusValue(data.data[0].status);                          
        }
        catch(err) {
            console.log(err);
        }        
    };

    useEffect(() => {

        if(id) {
            getListInfo();
        }
    }, []);    

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
    
    const getChanges = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setDetailsList({
            ...detailsList,
            [name]: value,
        });
    }

    const handleDateChange = (date: Date | null) => {
        setDetailsList({
            ...detailsList,
          scheduled: date,
        });
    };

    const changeStatus = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setStatusValue(e.target.value);

        setDetailsList({
            ...detailsList,
          status: e.target.value,
        });
    };

    const saveChanges = async() => {     
        const dataNewDetail = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(detailsList)
        };

        fetch(`http://localhost:3000/api/lists/update/${id}`, dataNewDetail)
        .then(response => response.json())
        .then(data => {            
            onClose();
            reload();                     
        });        
    }

    return (
        <>
        <div className={`popup-background ${openPopUp}`}>
            <div className="popup-container">
                <div className="popup-header">
                    Update To-Do List
                    <div className="close-popup" onClick={onClose}>
                        <img src="/close-icon.png" alt="close icon" />
                    </div>
                </div>
                <div className="popup-body">
                    <div className="todo-fields">
                        <div className="name-section">
                            <label>Name</label>
                            <input type="text" className="input-name" name="list_name"
                            value={detailsList.list_name} onChange={getChanges} />
                        </div>
                        <div className="category-section">
                            <label>Category</label>
                            <select id="categories"
                                value={detailsList.category}
                                name="category"
                                onChange={getChanges}>
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
                            <DatePicker selected={detailsList.scheduled} onChange={handleDateChange}
                                dateFormat={'dd/MM/yyyy'}/>
                        </div>
                        <div className="status-section">
                        <label>Status</label>
                            <select id="status"
                                value={statusValue}
                                name="status"
                                onChange={changeStatus}>
                                    <option value="" disabled>Change status</option>
                                    <option value="pending">pending</option>                                       
                                    <option value="completed">completed</option>                                       
                            </select>
                        </div>
                        <div className="popup-footer">
                            <button type="button" className="btn-create-element" onClick={saveChanges}>Update</button>
                        </div>                
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default UpdateBar;
