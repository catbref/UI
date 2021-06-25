const fs = require('fs')

const corePackageFilePath = './qortal-ui-core/package.json';
const corePackageFile = fs.readFileSync(corePackageFilePath, 'utf8');
const corePackage = JSON.parse(corePackageFile);

const pluginsPackageFilePath = './qortal-ui-plugins/package.json';
const pluginsPackageFile = fs.readFileSync(pluginsPackageFilePath, 'utf8');
const pluginsPackage = JSON.parse(pluginsPackageFile);

const cryptoPackageFilePath = './qortal-ui-crypto/package.json';
const cryptoPackageFile = fs.readFileSync(cryptoPackageFilePath, 'utf8');
const cryptoPackage = JSON.parse(cryptoPackageFile);

const uiPackageFilePath = 'package.json';
const uiPackageFile = fs.readFileSync(uiPackageFilePath, 'utf8');
const uiPackage = JSON.parse(uiPackageFile);


uiPackage.dependencies = {
    ...uiPackage.dependencies,
    "qortal-ui-core": corePackage.version,
    "qortal-ui-plugins": pluginsPackage.version,
    "qortal-ui-crypto": cryptoPackage.version
}

console.log(uiPackage.dependencies);

fs.writeFileSync(uiPackageFilePath, JSON.stringify(uiPackage, null, 2));
console.log('Package.Json updated');