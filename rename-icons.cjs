const fs = require('fs');
const path = require('path');


const ICONS_DIR = path.join(__dirname, 'src/shared/assets/icons/svg');


const toPascalCase = (str) => {
    return str
        .replace(/[(){}\[\],.]+/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-_]/g, '')
        .split(/[-_]/)
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
};

fs.readdir(ICONS_DIR, (err, files) => {
    if (err) {
        console.error('❌ error reading folder:', err);
        return;
    }

    files.forEach((file) => {
        const ext = path.extname(file);
        if (ext !== '.svg') return;

        const oldPath = path.join(ICONS_DIR, file);
        const baseName = path.basename(file, ext);
        const newName = `${toPascalCase(baseName)}${ext}`;
        const newPath = path.join(ICONS_DIR, newName);

        if (oldPath !== newPath) {
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.error(`❌ error while renaming ${file}:`, err);
                } else {
                    console.log(`✅ ${file} → ${newName}`);
                }
            });
        }
    });
});
