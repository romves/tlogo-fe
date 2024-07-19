"use client";

import { tlogoByDusun } from "@/constant/tlogoByDusun";
import L, { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import type { GeoJsonObject } from "geojson";
import { getAllUmkm } from "@/services/umkm.service";
import { useEffect, useState } from "react";
import { UMKMAdmin } from "@/module/umkm/types";

const ICON = icon({
    iconUrl: "/icons/store.png",
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
        weight: 4,
    });
}

function resetHighlight(e: L.LeafletMouseEvent) {
    const feature = e.target.feature.properties;
    e.target.setStyle({
        color: colors[feature.id as keyof typeof colors],
        fillOpacity: 0.3,
        weight: 1,
    });
}

const Maps = () => {
    const [umkms, setUmkms] = useState<UMKMAdmin[]>();

    useEffect(() => {
        getAllUmkm().then((data) => {
            return setUmkms(data);
        });
    }, []);

    const position = [-8.12796, 112.2002401] as L.LatLngExpression;

    return (
        <div className="p-8 mx-auto">
            <MapContainer
                center={position}
                zoom={15}
                scrollWheelZoom={false}
                className=""
                style={{ height: "80vh" }}
            >
                <TileLayer
                    // url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    // attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
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
                            weight: 1,
                            className:
                                "transition-all duration-300 ease-in-out",
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
                            // click: (e) => {
                            //     console.log(e.target.feature.properties);

                            //     e.target.bindPopup(
                            //         e.target.feature.properties.Dusun
                            //     );
                            // },
                        });
                        console.log(feature);
                    }}
                />
                {umkms?.map((umkm) => {
                    // console.log(umkm);
                    return (
                        <Marker
                            key={umkm.id}
                            icon={ICON}
                            position={
                                umkm.koordinat_umkm as unknown as L.LatLngExpression
                            }
                        >
                            <Popup>
                                <div>
                                    <h2>{umkm.nama}</h2>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default Maps;
