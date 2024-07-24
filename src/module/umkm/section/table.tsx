import { Button, buttonVariants } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { UMKMAdmin } from "@/module/umkm/types";
import { Settings } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

export default function TableSection({
    umkm: data,
    meta,
}: {
    umkm: UMKMAdmin[];
    meta: Meta;
}) {
    if (!data || data.length === 0) {
        return (
            <div className="bg-white rounded-lg p-4 text-center text-neutral-400">
                No UMKM data available.
            </div>
        );
    }

    const umkm = data.map(({ foto, ...rest }) => rest);

    return (
        <div className="bg-white rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        {/* {Object.keys(umkm[0])
                            .filter(
                                (item) =>
                                    ![
                                        "sheet_timestamp",
                                        "koordinat_umkm",
                                        "alamat",
                                        "rentang_harga",
                                        "kelengkapan_surat",
                                        'volume'
                                    ].includes(item)
                            )
                            .map((key, i) => (
                                <TableHead key={i}>{key}</TableHead>
                            ))} */}

                        <TableHead className="w-1">No</TableHead>
                        <TableHead>Nama UMKM</TableHead>
                        {/* <TableHead>Pemilik UMKM</TableHead> */}
                        <TableHead className="w-1">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {umkm.map((item, i) => (
                        <Fragment key={item.id}>
                            <TableRow className="text-nowrap">
                                <TableCell>
                                    {i + (meta.page - 1) * meta.perPage + 1}
                                </TableCell>
                                <TableCell>{item.nama}</TableCell>
                                {/* <TableCell>{item.alamat}</TableCell> */}
                                {/* <TableCell>{item.nama_pemilik}</TableCell> */}
                                {/* <TableCell>{item.nomor_hp}</TableCell> */}
                                {/* <TableCell>{item.rentang_harga}</TableCell>
                                <TableCell>{item.kelengkapan_surat}</TableCell>
                                <TableCell>{item.produk}</TableCell>
                                <TableCell>{item.volume}</TableCell> */}
                                <TableCell className="space-x-2">
                                    <Link
                                        href={`/admin/umkm/${item.id}`}
                                        className={buttonVariants({
                                            variant: "primary",
                                        })}
                                    >
                                        {/* <Settings /> */}
                                        Detail
                                    </Link>
                                    {/* <Button variant="info" size="icon"></Button> */}
                                </TableCell>
                            </TableRow>
                        </Fragment>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
