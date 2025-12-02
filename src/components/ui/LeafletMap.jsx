import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconn from "@/assets/images/marker-icon.png";
import markerShadow from "@/assets/images/marker-shadow.png";
// Fix default marker icon in Vite
const markerIcon = new L.Icon({
    iconUrl: {markerIconn},
    shadowUrl: {markerShadow},
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default function LeafletMap() {
    const position = [30.081596, 31.319648];


    return (
        <div className="w-full h-[350px] rounded-xl overflow-hidden border border-black/20 shadow-md">
            <MapContainer
                center={position}
                zoom={16}
                scrollWheelZoom={false}
                className="w-full h-full"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="© OpenStreetMap"
                />

                <Marker position={position}>
                    <Popup>
                        Military Factories Club <br />
                        Analia, Al-Golf, Nasr City
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
