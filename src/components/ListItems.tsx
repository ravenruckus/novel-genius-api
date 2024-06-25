"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase/clientApp"
import { collection, getDocs } from "firebase/firestore"
import DeleteItem from "@/components/DeleteItem";

interface Item {
    id: string;
    name: string;
    // Add other properties as needed
  }

const ListItems = () => {
    const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "items"))
      const fetchedItems: Item[] = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Item[]; // Cast the result to Item[] to match the state type
      setItems(fetchedItems);    }

    fetchItems()
  }, [])

  return (
    <div className="border w-96 text-center p-4">
      <h2>List of Items</h2>
      <ul>
        {items.map((item: any) => (
          <li key={item.id} className="border-t-2 p-2">
            <p>{item.name}</p>
            <DeleteItem id={item.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListItems

// https://mydevpa.ge/blog/how-to-setup-firebase-firestore-with-nextjs-14
