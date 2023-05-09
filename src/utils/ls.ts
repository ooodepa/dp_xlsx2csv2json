import * as fs from 'fs';

export default function ls(path = './') {
  try {
    const files = fs.readdirSync(path);
    return files;
  } catch (error) {
    console.error(error);
    return [];
  }
}
