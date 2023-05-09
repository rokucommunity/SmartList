/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

console.log('ensuring dependencies are in sync');
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
for (const [packageName, expectedVersion] of Object.entries(dependencies)) {
    const packageJsonPath = path.join('./node_modules', packageName, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));
        const installedVersion = packageJson.version;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if (expectedVersion.includes('file:')) {
            console.warn(`WARNING -USING LOCAL PACKAGES IN THIS BUILD ${packageName} is at ${installedVersion}.`);
        } else if (!expectedVersion.includes('^') && !expectedVersion.includes(installedVersion)) {
            console.warn(`WARNING! Detected out of date dependency ${packageName} is at ${installedVersion}. Expected version ${expectedVersion}. Running npm install.`);
            execSync(`npm install --no-save ${packageName}@${expectedVersion}`);
            break;
        }
    } else {
        console.warn(`WARNING! Detected missing dependency ${packageName}. Expected version ${expectedVersion}. Running npm install.`);
        execSync(`npm install --no-save ${packageName}@${expectedVersion}`);
    }
}
