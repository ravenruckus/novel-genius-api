import { useState } from 'react';
import { db } from '@/lib/firebase/clientApp';
import { collection, addDoc } from "firebase/firestore"; 

const AddItem = () => {
    const [value, setValue] = useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "items"), {
                name: value
            });
            console.log("Document written with ID: ", docRef.id);
            setValue(''); // Clear the form
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Add a new item"
            />
            <button type="submit">Add Item</button>
        </form>
    );
};

export default AddItem;

// https://mydevpa.ge/blog/how-to-setup-firebase-firestore-with-nextjs-14