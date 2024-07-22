import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function POST(req: Request) {
    const supabase = createClientComponentClient();
    const body = await req.formData();
    const fotos = body.getAll("foto") as File[];

    if (!Array.isArray(fotos) || !fotos.every(foto => foto instanceof File)) {
        return new Response(JSON.stringify({ error: "Invalid fotos input" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const uploadedImages = await Promise.all(
        fotos.map(async (foto: File) => {
            const { data: image, error } = await supabase.storage
                .from("umkm_image")
                .upload(`umkm_image/${foto.name}`, foto); // Use unique path for each image
            if (error) {
                throw new Error(error.message);
            }

            // Retrieve the public URL of the uploaded image
            const { data} = supabase.storage
                .from("umkm_image")
                .getPublicUrl(`umkm_image/${foto.name}`);

            if (!data) {
                throw new Error("Failed to get public URL of the uploaded image");
            }

            return data.publicUrl;
        })
    );

    return new Response(JSON.stringify({ images: uploadedImages }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
