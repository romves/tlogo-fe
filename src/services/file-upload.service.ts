import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createId } from "@paralleldrive/cuid2";

function uploadMultipleFoto(data: { foto: File[] }) {
    const promises = data.foto.map((file) => {
        return fetch("/api/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ file }),
        }).then((res) => res.json());
    });

    return Promise.all(promises);
}

async function uploadImagesLogic(fotos: any) {
    const supabase = createClientComponentClient({
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });

    const uploadedImages = await Promise.all(
        fotos.map(async (foto: File) => {
            const { data: image, error } = await supabase.storage
                .from("umkm_image")
                .upload(`umkm_image/${foto.name}`, foto); // Use unique path for each image
            if (error) {
                throw new Error(error.message);
            }

            // Retrieve the public URL of the uploaded image
            const { data } = supabase.storage
                .from("umkm_image")
                .getPublicUrl(`umkm_image/${createId()}-${foto.name}`);

            if (!data) {
                throw new Error(
                    "Failed to get public URL of the uploaded image"
                );
            }

            return data.publicUrl;
        })
    );

    return uploadedImages;
}

export { uploadMultipleFoto, uploadImagesLogic };
