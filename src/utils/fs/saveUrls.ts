import fs from 'fs/promises';
export const saveUrls = async (urls: string[]) => {
    const path = './output/urls.json';
    await fs.writeFile(path, JSON.stringify(urls));
};