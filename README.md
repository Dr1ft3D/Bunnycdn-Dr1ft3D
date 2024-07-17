# BunnyCDN SDK

A Node.js SDK for interacting with BunnyCDN. This SDK allows you to upload, download, list, and delete files from BunnyCDN, as well as manage collections and videos.


You can install the package via npm:

```bash
npm install bunnycdn-dr1ft3d
```

## Usage

### Initialization - JavaScript
```javascript
const BunnyCDN = require('bunnycdn-dr1ft3d');

const bunnyCdn = new BunnyCDN({
    accessKey: 'your-access-key',
    storageZoneName: 'your-storage-zone-name',
    region: 'ny' // optional, default is 'ny'
});
```
### Initialization - TypeScript
```typescript
import BunnyCDN from 'bunnycdn-dr1ft3d';

const bunnyCdn = new BunnyCDN({
    accessKey: 'your-access-key',
    storageZoneName: 'your-storage-zone-name',
    region: 'ny' // optional, default is 'ny'
});
```
### Upload a file
```javascript
bunnyCdn.upload('path/to/local/file.txt', 'remote/path/file.txt')
    .then(() => {
        console.log('File uploaded successfully');
    })
    .catch((error) => {
        console.error('Error uploading file:', error);
    });
```
### Download a file
```javascript
bunnyCdn.download('remote/path/file.txt', 'path/to/local/file.txt')
    .then(() => {
        console.log('File downloaded successfully');
    })
    .catch((error) => {
        console.error('Error downloading file:', error);
    });
```
### List files in a directory
```javascript
bunnyCdn.list('remote/path/')
    .then((files) => {
        console.log('Files:', files);
    })
    .catch((error) => {
        console.error('Error listing files:', error);
    });
```
### Delete a file
```javascript
bunnyCdn.delete('remote/path/file.txt')
    .then(() => {
        console.log('File deleted successfully');
    })
    .catch((error) => {
        console.error('Error deleting file:', error);
    });
```

### Billing Information
```javascript
bunnyCdn.getBilling()
    .then((billingInfo) => {
        console.log('Billing Info:', billingInfo);
    })
    .catch((error) => {
        console.error('Error fetching billing information:', error);
    });
```
### CDN Statistics
```javascript
bunnyCdn.getStatistics()
    .then((stats) => {
        console.log('CDN Statistics:', stats);
    })
    .catch((error) => {
        console.error('Error fetching statistics:', error);
    });
```
### Purge Cache
```javascript
bunnyCdn.purgeCache('https://example.b-cdn.net/path/to/file.txt')
    .then(() => {
        console.log('Cache purged successfully');
    })
    .catch((error) => {
        console.error('Error purging cache:', error);
    });
```
### Manage Collections
```javascript
bunnyCdn.manageCollection('create', '', { name: 'New Collection' })
    .then((collection) => {
        console.log('Collection created:', collection);
    })
    .catch((error) => {
        console.error('Error creating collection:', error);
    });
```
### Manage Videos
```javascript
bunnyCdn.manageVideo('create', '', { title: 'New Video' })
    .then((video) => {
        console.log('Video created:', video);
    })
    .catch((error) => {
        console.error('Error creating video:', error);
    });
```
## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update readme as appropriate.

## License

This `README.md` file provides detailed information on how to use your BunnyCDN SDK in both JavaScript and TypeScript, including initialization, file operations, and more.



#### MIT License

Copyright (c) [2024] [Dr1ft3D]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
