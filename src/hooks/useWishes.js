import { useEffect, useState, useCallback } from "react";
import {
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    limit
} from "firebase/firestore";
import { db } from "@/lib/firebase"; // update path if needed

export default function useWishes({ limitCount = 50 } = {}) {
    const [wishes, setWishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Wishes Realtime
    useEffect(() => {
        const q = query(
            collection(db, "wishes"),
            orderBy("createdAt", "desc"),
            limit(limitCount)
        );

        const unsub = onSnapshot(
            q,
            (snap) => {
                const arr = snap.docs.map((d) => ({
                    id: d.id,
                    ...d.data(),
                }));

                setWishes(arr);
                setLoading(false);
            },
            (err) => {
                setError(err.message);
                setLoading(false);
            }
        );

        return () => unsub();
    }, [limitCount]);

    // Add new wish
    const addWish = useCallback(async (wish) => {
        if (!wish.name?.trim() || !wish.message?.trim()) {
            throw new Error("Name and message are required");
        }

        const docRef = await addDoc(collection(db, "wishes"), {
            name: wish.name.trim(),
            message: wish.message.trim(),
            moderated: false,
            createdAt: serverTimestamp(),
        });

        return docRef.id;
    }, []);

    return { wishes, loading, error, addWish };
}
