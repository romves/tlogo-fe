"use client";

import { tlogoByDusun } from "@/constant/tlogoByDusun";
import L, { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
    GeoJSON,
    MapContainer,
    TileLayer
} from "react-leaflet";

import type { GeoJsonObject } from "geojson";

const ICON = icon({
    iconUrl: "/icons/marker.svg",
    iconSize: [28, 28],
    iconAnchor: [32 / 2, 32 / 2],
});

const colors = {
    1: "#FFB200",
    2: "#EB5B00",
    3: "#E4003A",
};

function highlightFeature(e: L.LeafletMouseEvent) {
    const feature = e.target.feature.properties;
    e.target.setStyle({
        color: colors[feature.id as keyof typeof colors],
        fillOpacity: 0.6,
        weight: 3,
    });
}

function resetHighlight(e: L.LeafletMouseEvent) {
    const feature = e.target.feature.properties;
    e.target.setStyle({
        color: colors[feature.id as keyof typeof colors],
        fillOpacity: 0.3,
        weight: 2,
    });
}

const Maps = () => {
    const position = [-8.12796, 112.2002401] as L.LatLngExpression;

    return (
        <div className="p-8 mx-auto">
            <MapContainer
                center={position}
                zoom={15}
                scrollWheelZoom={false}
                className="w-[80vw]"
                style={{ height: "80vh" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON
                    data={tlogoByDusun as GeoJsonObject}
                    style={(props) => {
                        return {
                            color: colors[
                                props?.properties.id as keyof typeof colors
                            ],
                            fillOpacity: 0.3,
                            weight: 2,
                        };
                    }}
                    onEachFeature={(feature, layer) => {
                        layer.bindTooltip(feature.properties.Dusun, {
                            permanent: true,
                            direction: "center",
                        });

                        layer.on({
                            mouseover: highlightFeature,
                            mouseout: resetHighlight,
                            click: (e) => {
                                console.log(e.target.feature.properties);

                                e.target.bindPopup(
                                    e.target.feature.properties.Dusun
                                );
                            },
                        });
                        console.log(feature);
                    }}
                />
                {/* <Marker position={position} icon={ICON}>
                </Marker> */}
            </MapContainer>
        </div>
    );
};

export default Maps;
