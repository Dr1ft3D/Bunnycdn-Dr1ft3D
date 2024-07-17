import axios from 'axios';
import fs from 'fs';
import path from 'path';

interface BunnyCDNConfig {
    accessKey: string;
    storageZoneName: string;
    region?: string;
}

class BunnyCDN {
    private accessKey: string;
    private storageZoneName: string;
    private baseURL: string;

    constructor(config: BunnyCDNConfig) {
        this.accessKey = config.accessKey;
        this.storageZoneName = config.storageZoneName;
        this.baseURL = `https://${config.region || 'ny'}.storage.bunnycdn.com/${config.storageZoneName}/`;
    }

    async upload(filePath: string, remotePath: string): Promise<void> {
        const fullPath = path.resolve(filePath);
        const fileData = fs.readFileSync(fullPath);
        const url = `${this.baseURL}${remotePath}`;

        try {
            await axios.put(url, fileData, {
                headers: {
                    'AccessKey': this.accessKey,
                    'Content-Type': 'application/octet-stream',
                },
            });
            console.log('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async download(remotePath: string, localPath: string): Promise<void> {
        const url = `${this.baseURL}${remotePath}`;
        const fullPath = path.resolve(localPath);

        try {
            const response = await axios.get(url, {
                headers: {
                    'AccessKey': this.accessKey,
                },
                responseType: 'stream',
            });

            const writer = fs.createWriteStream(fullPath);
            response.data.pipe(writer);

            return new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });
        } catch (error) {
            console.error('Error downloading file:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async list(directory: string = ''): Promise<any[]> {
        const url = `${this.baseURL}${directory}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    'AccessKey': this.accessKey,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error listing directory:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async delete(remotePath: string): Promise<void> {
        const url = `${this.baseURL}${remotePath}`;

        try {
            await axios.delete(url, {
                headers: {
                    'AccessKey': this.accessKey,
                },
            });
            console.log('File deleted successfully');
        } catch (error) {
            console.error('Error deleting file:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    // Additional functionalities

    async getBilling(): Promise<any> {
        const url = `https://bunnycdn.com/api/billing`;

        try {
            const response = await axios.get(url, {
                headers: {
                    'AccessKey': this.accessKey,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching billing information:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async getStatistics(): Promise<any> {
        const url = `https://bunnycdn.com/api/statistics`;

        try {
            const response = await axios.get(url, {
                headers: {
                    'AccessKey': this.accessKey,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching statistics:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async purgeCache(url: string): Promise<void> {
        const apiURL = `https://bunnycdn.com/api/purge`;

        try {
            await axios.post(apiURL, { url }, {
                headers: {
                    'AccessKey': this.accessKey,
                },
            });
            console.log('Cache purged successfully');
        } catch (error) {
            console.error('Error purging cache:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async manageCollection(action: string, collectionId: string = '', data: any = {}): Promise<any> {
        const baseURL = `https://bunnycdn.com/api/collections`;
        let url = baseURL;
        let method = 'get';

        if (action === 'create') {
            method = 'post';
        } else if (action === 'update') {
            url = `${baseURL}/${collectionId}`;
            method = 'patch';
        } else if (action === 'delete') {
            url = `${baseURL}/${collectionId}`;
            method = 'delete';
        } else if (action === 'get') {
            url = `${baseURL}/${collectionId}`;
        } else if (action === 'list') {
            url = baseURL;
        }

        try {
            const response = await axios({
                method,
                url,
                headers: {
                    'AccessKey': this.accessKey,
                },
                data,
            });
            return response.data;
        } catch (error) {
            console.error(`Error during ${action} collection:`, error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async manageVideo(action: string, videoId: string = '', data: any = {}): Promise<any> {
        const baseURL = `https://bunnycdn.com/api/videos`;
        let url = baseURL;
        let method = 'get';

        if (action === 'create') {
            method = 'post';
        } else if (action === 'update') {
            url = `${baseURL}/${videoId}`;
            method = 'patch';
        } else if (action === 'delete') {
            url = `${baseURL}/${videoId}`;
            method = 'delete';
        } else if (action === 'get') {
            url = `${baseURL}/${videoId}`;
        } else if (action === 'list') {
            url = baseURL;
        } else if (action === 'reencode') {
            url = `${baseURL}/${videoId}/reencode`;
            method = 'post';
        } else if (action === 'setThumbnail') {
            url = `${baseURL}/${videoId}/thumbnail`;
            method = 'post';
        } else if (action === 'fetch') {
            url = `${baseURL}/fetch`;
            method = 'post';
        } else if (action === 'addCaption') {
            url = `${baseURL}/${videoId}/caption`;
            method = 'post';
        } else if (action === 'deleteCaption') {
            url = `${baseURL}/${videoId}/caption/${data.captionId}`;
            method = 'delete';
        }

        try {
            const response = await axios({
                method,
                url,
                headers: {
                    'AccessKey': this.accessKey,
                },
                data,
            });
            return response.data;
        } catch (error) {
            console.error(`Error during ${action} video:`, error.response ? error.response.data : error.message);
            throw error;
        }
    }
}

export default BunnyCDN;