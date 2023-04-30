const fs = require('fs');
const path = require('path');

const bsFileRegex = /\.bs$/;
const importRegex = /import\s+"pkg:\/(.*?)\.bs"/g;

const getFilesRecursively = (dirPath, files = []) => {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    entries.forEach(entry => {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            getFilesRecursively(fullPath, files);
        } else if (bsFileRegex.test(entry.name)) {
            files.push(fullPath);
        }
    });

    return files;
};

const findUnimportedFiles = (dirPath) => {
    const bsFiles = getFilesRecursively(dirPath);
    const importedFiles = new Set();

    bsFiles.forEach(file => {
        const fileContent = fs.readFileSync(file, 'utf-8');
        let match;
        while ((match = importRegex.exec(fileContent)) !== null) {
            importedFiles.add(path.join(dirPath, match[1] + '.bs'));
        }
    });

    const unimportedFiles = bsFiles.filter(file => !importedFiles.has(file) && !file.endsWith('.spec.bs'));

    console.log('Unimported .bs files:');
    unimportedFiles.forEach(file => console.log(file));
};

// Replace './project' with the path to your project directory
findUnimportedFiles('./src');
