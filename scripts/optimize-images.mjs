import { mkdir, readdir, readFile, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const imagesDir = new URL('../src/assets/images/', import.meta.url);
const publicImagesDir = new URL('../public/images/', import.meta.url);

await mkdir(publicImagesDir, { recursive: true });

// The portrait feeds both the JSON-LD image and the social OG card, so grab it
// before the conversion loop renames the originals to .webp.
const portraitBuffer = await readFile(new URL('arshia.png', imagesDir));

let totalBefore = 0;
let totalAfter = 0;

for (const file of (await readdir(imagesDir)).filter((f) => f.toLowerCase().endsWith('.png'))) {
  const src = fileURLToPath(new URL(file, imagesDir));
  const out = fileURLToPath(new URL(`${file.slice(0, -4)}.webp`, imagesDir));
  const before = (await readFile(src)).length;
  const info = await sharp(src).webp({ quality: 82 }).toFile(out);
  totalBefore += before;
  totalAfter += info.size;
  if (info.size < before) {
    await unlink(src);
    console.log(`${file}: ${(before / 1024).toFixed(0)} KB -> ${file.slice(0, -4)}.webp ${(info.size / 1024).toFixed(0)} KB`);
  } else {
    // WebP did not help (rare); keep the original and drop the copy.
    await unlink(out);
    console.log(`${file}: kept PNG (webp was larger)`);
  }
}

// Self-hosted portrait for JSON-LD structured data.
await sharp(portraitBuffer)
  .resize({ width: 900, withoutEnlargement: true })
  .webp({ quality: 85 })
  .toFile(fileURLToPath(new URL('arshia-portrait.webp', publicImagesDir)));

// 1200x630 social preview card.
await sharp(portraitBuffer)
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 85 })
  .toFile(fileURLToPath(new URL('og-image.jpg', publicImagesDir)));

console.log(`\nTotal PNG payload: ${(totalBefore / 1048576).toFixed(1)} MB -> ${(totalAfter / 1048576).toFixed(1)} MB webp`);
console.log('public/images/arshia-portrait.webp + og-image.jpg generated');
