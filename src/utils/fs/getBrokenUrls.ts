import fs from 'fs/promises';

const filePath = './src/constants/brokenUrls.json';
export const getBrokenUrls = async (): Promise<string[]> => JSON.parse(await fs.readFile(filePath, { encoding: 'utf-8' }));