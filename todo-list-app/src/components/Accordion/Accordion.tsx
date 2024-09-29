import React, { useState, useEffect } from "react";
import './Accordion.css'

interface IdListProps {
    list_id: string;
    newOptionVisibility: boolean;
    hideComponentForAdding: () => void;
}

interface Details {
    id: string;
    completed_task: boolean;
    item_description: string;
}

const Accordion: React.FC<IdListProps> = ({ list_id, newOptionVisibility, hideComponentForAdding }) => {
    const [detailsList, setDetailsList] = useState<Details[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [description, setDescription] = useState<string>('');
    const [hasAtLeastOne, setHasAtLeastOne] = useState<boolean>(false);

    const getListDetails = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/details/' + list_id);

            if(!response.ok) {
                throw new Error('Something went wrong');
            }
            const data = await response.json();
            console.log(data);
            setDetailsList(data);
            setLoading(false);
        }
        catch(error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        getListDetails();
    }, [list_id]);
    
    const handleNewTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const newDetail = () => {
        const dataNewDetail = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({                
                created_at: new Date(),
                active: true,
                completed_task: false,
                item_description: description,
                todolist_id: list_id,                
                updated_at: new Date()
            })
        };

        fetch('http://localhost:3000/api/details/new', dataNewDetail)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            getListDetails();
            setDescription('');
            hideComponentForAdding();            
        });
    };

    const markDetailAsCompleted = (id: string) => {
        const dataNewDetail = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                completed_task: true,
                updated_at: new Date(),
            })
        };

        fetch(`http://localhost:3000/api/details/update/${id}`, dataNewDetail)
        .then(response => response.json())
        .then(data => {            
            getListDetails();
            setDescription('');
            hideComponentForAdding();            
        });
    };

    const deleteDetail = (id: string) => {
        const dataNewDetail = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                active: false,
                updated_at: new Date(),
            })
        };

        fetch(`http://localhost:3000/api/details/update/${id}`, dataNewDetail)
        .then(response => response.json())
        .then(data => {
            getListDetails();
            setDescription('');           
        });
    };

    if (loading) return <p>Loading info...</p>;

    return (
        <div className={`accordion-container ${newOptionVisibility || detailsList.length > 0  ? 'accordion-show' : 'accordion-hide'}`}>
            
            <div className='accordion-body'>
                {newOptionVisibility &&  (
                    <div className="add-new-detail" >
                        <div className="detail-input-block">
                            <label>Task description</label>
                            <input type="text" value={description} onChange={handleNewTask} />
                        </div>
                        <div className="detail-options-new">
                            <span onClick={newDetail}>
                                <img src="/check-icon.png" alt="check icon" />
                            </span>    
                        </div>                 
                        <div className="detail-options-new">
                            <span onClick={hideComponentForAdding}>
                                <img src="/discard-icon.png" alt="trash icon" />
                            </span>    
                        </div>                 
                    </div>
                )}
                <ul>
                    {
                        detailsList.map(info => (
                            <li key={info.id}>
                                <div className="details-container">
                                    <div className={`detail-text ${info.completed_task ? 'set-style-through' : 'remove-style-through'}`} >
                                        <input type="checkbox" onChange={() => markDetailAsCompleted(info.id)} disabled={info.completed_task}/> <span>{info.item_description}</span>
                                    </div>
                                    <div className="detail-options">
                                        <span onClick={() => deleteDetail(info.id)}>
                                            <img src="/trash-icon-black.png" alt="trash icon" />
                                        </span>    
                                    </div>                                
                                </div>
                            </li>                        
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Accordion;
