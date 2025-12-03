// src/hooks/useImages.js
import { useEffect, useState, useCallback } from "react";
import {
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase"; // adjust path if needed




export default function useImages({ limitCount = 50 } = {}) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [uploading, setUploading] = useState(false);

    // realtime listener for images collection
    useEffect(() => {
        setLoading(true);
        const q = query(
            collection(db, "images"),
            orderBy("createdAt", "desc"),
            limit(limitCount)
        );

        const unsub = onSnapshot(
            q,
            (snap) => {
                const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
                setImages(arr);
                setLoading(false);
                setError(null); // Clear errors on success
            },
            (err) => {
                console.error("Error fetching images:", err);
                setError(`Failed to load images: ${err.message || String(err)}`);
                setLoading(false);
            }
        );

        return () => unsub();
    }, [limitCount]);

    const uploadImage = useCallback(async (file, options = {}) => {
        const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        if (!CLOUD_NAME || !UPLOAD_PRESET) {
            throw new Error("Cloudinary cloud name or upload preset is missing in env");
        }
        if (!file) throw new Error("No file provided");

        // File validation
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (!allowedTypes.includes(file.type)) {
            throw new Error(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
        }
        if (file.size > maxSize) {
            throw new Error(`File too large. Max size: ${maxSize / (1024 * 1024)}MB`);
        }

        const { onProgress, folder } = options;
        setUploading(true);

        try {
            // Build cloudinary url
            const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

            // Use FormData
            const fd = new FormData();
            fd.append("file", file);
            fd.append("upload_preset", UPLOAD_PRESET);
            if (folder) fd.append("folder", folder);

            // Use XMLHttpRequest if progress callback requested, otherwise use fetch
            const uploadResult = await new Promise((resolve, reject) => {
                if (typeof onProgress === "function") {
                    const xhr = new XMLHttpRequest();
                    xhr.open("POST", url);

                    xhr.upload.onprogress = (event) => {
                        if (event.lengthComputable) {
                            const pct = Math.round((event.loaded / event.total) * 100);
                            try { onProgress(pct); } catch (e) { /* swallow */ }
                        }
                    };

                    xhr.onload = () => {
                        try {
                            const res = JSON.parse(xhr.responseText);
                            if (xhr.status >= 200 && xhr.status < 300) resolve(res);
                            else reject(res);
                        } catch (e) {
                            reject(e);
                        }
                    };

                    xhr.onerror = () => reject(new Error("Network error during upload"));
                    xhr.send(fd);
                } else {
                    // simple fetch
                    fetch(url, { method: "POST", body: fd })
                        .then(async (res) => {
                            const data = await res.json();
                            if (!res.ok) throw data;
                            resolve(data);
                        })
                        .catch(reject);
                }
            });

            // uploadResult contains secure_url, public_id, etc.
            const doc = {
                fileName: file.name,
                mimeType: file.type,
                size: file.size,
                url: uploadResult.secure_url || uploadResult.url,
                public_id: uploadResult.public_id,
                createdAt: serverTimestamp(),
            };

            const docRef = await addDoc(collection(db, "images"), doc);
            return { id: docRef.id, ...doc };
        } finally {
            setUploading(false);
        }
    }, []);

    

    return {
        images,
        loading,
        error,
        uploading,
        uploadImage,
    };
}
