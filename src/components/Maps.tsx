"use client";

import L, { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { tlogoByRt } from "@/constant/tlogoByRt";
import { UMKMAdmin } from "@/module/umkm/types";
import { getUMKMMaps } from "@/services/umkm.service";
import type { GeoJsonObject } from "geojson";
import { useEffect, useState } from "react";
import { tlogoByRw } from "@/constant/tlogoByRw";
import { tlogoByDusun } from "@/constant/tlogoByDusun";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

const ICON = icon({
    iconUrl: "/icons/store.png",
    iconSize: [28, 28],
    iconAnchor: [32 / 2, 32 / 2],
});

const MYLOC_ICON = icon({
    iconUrl: "/icons/myloc.svg",
    iconSize: [28, 28],
    iconAnchor: [32 / 2, 32 / 2],
});

const colors = {
    1: "#FFB200", // Amber
    2: "#EB5B00", // Burnt Orange
    3: "#E4003A", // Red
    4: "#8F00FF", // Violet
    5: "#0077BE", // Ocean Blue
    6: "#00A86B", // Jade Green
    7: "#FC6C85", // Wild Watermelon
    8: "#4B0082", // Indigo
    9: "#FFD700", // Gold
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
    const searchParams = new URLSearchParams(window.location.search);
    const [umkms, setUmkms] = useState<UMKMAdmin[]>();
    const [geolocation, setGeolocation] = useState<GeolocationPosition>();

    useEffect(() => {
        getUMKMMaps().then((data) => {
            return setUmkms(data);
        });

        navigator.geolocation.getCurrentPosition((position) => {
            setGeolocation(position);
        });
    }, []);

    const position = [-8.12796, 112.2002401] as L.LatLngExpression;

    return (
        <div className="p-8 mx-auto space-y-4">
            <div className="flex justify-center space-x-3">
                {Object.keys(mapList).map((key) => {
                    return (
                        <Button
                            disabled={key == searchParams.get("map")}
                            variant="primary"
                            key={key}
                            className={`p-2 border border-gray-200 rounded-md`}
                            onClick={() => {
                                // router.push(`/peta-wilayah?map=${key}`);
                                window.location.assign(
                                    `/peta-wilayah?map=${key}`
                                );
                            }}
                        >
                            {key}
                        </Button>
                    );
                })}
            </div>
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
                {}
                <GeoJSON
                    data={
                        mapList[
                            (searchParams.get("map") as keyof typeof mapList) ??
                                "Peta Dusun"
                        ].data as GeoJsonObject
                    }
                    style={(props) => {
                        return {
                            color: colors[
                                props?.properties.id as keyof typeof colors
                            ],
                            fillOpacity: 0.3,
                            weight: 1,
                            className:
                                `transition-all duration-300 ease-in-out`,
                        };
                    }}
                    onEachFeature={(feature, layer) => {
                        layer.bindTooltip(feature.properties.nama, {
                            permanent: false,
                            direction: "center",
                        });

                        layer.on({
                            mouseover: highlightFeature,
                            mouseout: resetHighlight,
                            mousedown: (e) => {
                                const feature = e.target.feature.properties;
                                window.location.assign(
                                    `/peta-wilayah?map=${feature.nama}`
                                );
                            }
                        });
                    }}
                />
                {searchParams.get("map") == "Peta UMKM" &&
                    umkms?.map((umkm) => {
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
                                        <Link href={`/umkm/${umkm.id}`}>
                                            Lihat Detail
                                        </Link>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                {geolocation && (
                    <Marker
                        position={[
                            geolocation.coords.latitude,
                            geolocation.coords.longitude,
                        ]}
                        icon={MYLOC_ICON}
                    >
                        <Popup>
                            <div>
                                <h2>Posisi Anda</h2>
                            </div>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default Maps;

const mapList = {
    "Peta Dusun": {
        data: tlogoByDusun,
    },
    "Peta RW": {
        data: tlogoByRw,
    },
    "Peta RT": {
        data: tlogoByRt,
    },
    "Peta UMKM": {
        data: tlogoByDusun,
    },
};
