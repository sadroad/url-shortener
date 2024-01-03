import {redirect, RedirectType} from "next/navigation";
import {db} from "@/lib/drizzle/client";

export const runtime = "edge";

export async function GET(_: Request, {params}: {params: {slug: string}}) { 
    const slug = params.slug;
    const url = await db.query.urls.findFirst({
        where: (urls, {eq}) => eq(urls.id, slug)
    });
    if (!url) {
        redirect("/", RedirectType.replace);
    }
    redirect(url.url, RedirectType.replace);
}