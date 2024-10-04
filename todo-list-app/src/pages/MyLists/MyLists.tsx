import React, { useState, useEffect } from "react";
import { useUser } from '../../context/UserContext';
import './MyLists.css';

 interface  AllListProps {
    id: number;
    created_at: Date | null;
    active: boolean;
    category: string;
    list_name: string;
    scheduled: Date | null;
    status: string;
    updated_at: Date | null;
 }

const MyLists: React.FC = () => {
    const { userId } = useUser();
    const [listOfLists, setListOfLists] = useState<AllListProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const allLists = async() => {
            try {
                const response = await fetch(`http://localhost:3000/api/lists/${userId}`);
                if(!response.ok) {
                    throw new Error('Something went wrong');
                }
    
                const data = await response.json();
                setListOfLists(data);
                setLoading(false);                
            }
            catch(err) {
                console.log(err);
                setLoading(false);
            }
        };
        
        allLists();
    }, []);

    return(
        <>
        <div className="body-section">
            <p>My Lists Page</p>
        </div>            
        </>        
    )
}

export default MyLists;
