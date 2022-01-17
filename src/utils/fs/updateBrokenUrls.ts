import fs from 'fs/promises';
import { getBrokenUrls } from './getBrokenUrls';

const filePath = './src/constants/brokenUrls.json';
export const updateBrokenUrls = async (urls: string[]) => {
    const brokenUrls = await getBrokenUrls();

    urls.forEach(url => !brokenUrls.includes(url) && brokenUrls.push(url));

    await fs.writeFile(filePath, JSON.stringify(brokenUrls));
};
