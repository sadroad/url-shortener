"use server"
// @ts-ignore
import md5 from "md5";
import { urls } from "@/lib/drizzle/schema"
import { db } from "@/lib/drizzle/client";
export async function createShortUrl(_: any, formData: FormData) {
    const url = formData.get("url");
    if (!url || typeof url !== "string"  ) {
      return {message: "Invalid URL", error: true, url: ""};
    }
    const hash = md5(url);
    const shortUrl = await db.query.urls.findFirst({
      where: (urls, {eq}) => eq(urls.id, hash)
    });
    if (!!shortUrl) {
      return {message: "", error: false, url: shortUrl.id};
    }
    await db.insert(urls).values({id: hash, url: url});
    return {message: "", error: false, url: hash};
  }