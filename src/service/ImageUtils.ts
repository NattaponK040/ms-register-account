import https from "https";
import fs from "fs";

export function downloadImage(path: string, url: string) {
    try {
        const file = fs.createWriteStream(path);
        const request = https.get(url, (res) => {
            res.pipe(file);
            file.on("finish", () => {
                file.close();
                console.log("Download finished");

            })
        });
        return true
    } catch (err) {
        return false;
    }
}

export async function ReadImage(path: string) {
    try {
        console.log(path)
        return await fs.readFileSync(path);
    } catch (e) {
        console.log('Error:', e.stack);
        return null
    }
}

export function DeleteFile(path: string) {
    try {
        fs.unlinkSync(path)
        //file removed
    } catch (err) {
        console.error(err)
    }
}