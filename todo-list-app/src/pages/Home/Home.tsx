import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Accordion from '../../components/Accordion/Accordion';
import './Home.css'
import Popup from '../../components/Popup/Popup';

interface List {
    id: string;
    categroy: string;
    list_name: string;
    status: string;
}

const Home: React.FC = () => {
    const currentDate = new Date().toDateString(); 
    const [today, setSelectedDate] = useState(currentDate);
    const [list, setLists] = useState<List[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 
    const [isPopUpVisible, setIsPopUpVisible] = useState(false); 
    const [taksType, setTaskType] = useState<string>("todoList");
    const [selectedList, setSelectedList] = useState<string | null>(null);
    const { userId } = useParams<{ userId: string }>();

    const getLists = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/lists/${userId}/${today}`);
            if(!response.ok) {
                throw new Error('Something went wrong');
            }

            const data = await response.json();
            console.log(data);
            setLists(data);
            setLoading(false);                
        }
        catch(err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {       
        getLists();
    }, []);

    const openPopUp = () => setIsPopUpVisible(true);

    const closePopUp = () => setIsPopUpVisible(false);

    const toggleInputDetail = (id: string) => {
        setSelectedList(selectedList === id ? null : id);
    } 

    const toggleBackInputDetails = () => setSelectedList(null);

    const deleteList = (id: string) => {
        const listToDelete = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                active: false,
                updated_at: new Date().toDateString()
            })
        };

        fetch(`http://localhost:3000/api/lists/update/${id}`, listToDelete)
        .then(response => response.json())
        .then(data => {
            getLists();          
        });        
    }

    const listCompleted = (id: string) => {
        const listToUpdate = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                status: 'completed',
                updated_at: new Date().toDateString()
            })
        };

        fetch(`http://localhost:3000/api/lists/update/${id}`, listToUpdate)
        .then(response => response.json())
        .then(data => {
            getLists();          
        });        
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div className='body-app'>
            <div className='title-container'>
                <h1>{today}</h1>
                <button type='button' className='new-todo-list' onClick={openPopUp}>
                    <img src='/new-list-icon.png' alt='create new list icon' /> New To-Do List
                </button>
            </div>            
            <div className='container-body-list'>
                {list.length > 0 ? 
                <ul>
                    {
                        list.map((item) => (
                            <li key={item.id}>
                                <div className='accordion-element'>
                                    <div className={`list-header ${item.status === 'pending' ? 'active-color' : 'completed-color'}`}>
                                        <div className='list-name'>Name: {item.list_name}</div>
                                        <div className='list-actions'>
                                            {item.status === 'pending' &&
                                            <div className='action-container'>
                                                <span className='action-button' onClick={() => toggleInputDetail(item.id)}>
                                                    <img src='/add-icon.png' />
                                                    <p>Add task</p>
                                                </span>
                                            </div>
                                            }                                             
                                            <div className='action-container'>
                                                <span className='action-button'>
                                                    <img src='/edit-icon-black.png' />
                                                    <p>Edit</p>
                                                </span>
                                            </div>
                                            <div className='action-container'>
                                                <span className='action-button' onClick={() => deleteList(item.id)}>
                                                    <img src='/trash-icon-black.png' />
                                                    <p>Delete</p>
                                                </span>
                                            </div>
                                            {item.status === 'pending' ?
                                            <>
                                            <div className='action-container'>
                                                <span className='action-button'>
                                                    <input type='checkbox' onClick={() => listCompleted(item.id)}/>
                                                    <p>Mark as completed</p>
                                                </span>
                                            </div>                                                                                                                                                                  
                                            </>:
                                            <>
                                            <div className='action-container'>
                                                <span className='completed-list'>
                                                    <p>Completed</p>
                                                </span>
                                            </div>
                                            </>
                                            }
                                            <div className='action-container'>
                                                <span className='action-button'>
                                                    <img src='/toggle-down-icon.png' />
                                                </span>
                                            </div>                                                                                                                                                                   
                                        </div>
                                    </div>
                                    <Accordion 
                                        list_id={item.id} 
                                        newOptionVisibility={selectedList === item.id}
                                        hideComponentForAdding={toggleBackInputDetails} 
                                        />
                                </div>
                            </li>
                        ))
                    }
                </ul>
                :
                <p>There's no lists for today. Hit the button to create a new To-Do List.</p>
                }
            </div>
            <Popup type={taksType} show={isPopUpVisible} onClose={closePopUp} callback={getLists}/>
        </div>        
    )
}

export default Home;
