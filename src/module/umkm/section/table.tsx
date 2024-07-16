import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { UMKMAdmin } from "@/module/umkm/types";
import { Fragment } from "react";

export default function TableSection({ umkm: data }: { umkm: UMKMAdmin[] }) {
    const umkm = data.map(({ deskripsi, foto, ...rest }) => rest);

    return (
        <div className="bg-white rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        {Object.keys(umkm[0]).map((key, i) => (
                            <TableHead key={i}>{key}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {umkm.map((item, i) => (
                        <Fragment key={item.id}>
                            <TableRow className="text-nowrap">
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{item.nama}</TableCell>
                                <TableCell>{item.alamat}</TableCell>
                                <TableCell>{item.nama_pemilik}</TableCell>
                                <TableCell>{item.nomor_hp}</TableCell>
                                <TableCell>{item.rentang_harga}</TableCell>
                                <TableCell>{item.kelengkapan_surat}</TableCell>
                                <TableCell>{item.kategori}</TableCell>
                            </TableRow>
                        </Fragment>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
