const fs = require('fs');
const { get } = require('http');
const crypto = require('crypto')

class UsersRepository {
    constructor(filename) {
        if(!filename) {
            throw new Error("Creating a repository requires a filename")
        }

        this.filename = filename;
        try {
            fs.accessSync(this.filename);
        } catch (err){
            fs.writeFileSync(this.filename, '[]')
        }
    }

    async getAll() {
        // return the contents of the file after JSON parsing
        return JSON.parse(
            await fs.promises.readFile(this.filename, { 
                encoding: 'utf-8' 
            })
        )
    }

    async create(attr) {
        attr.id = this.randomId();

        const records = await this.getAll()
        
        //adding the new user
        records.push(attr)

        await this.writeAll(records)
    }

    async writeAll(records) {
        //write the updated 'records' array back to the this.filename
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2))
    }

    randomId() {
        return crypto.randomBytes(4).toString('hex')
    }

    async getOne(id) {
        const records = await this.getAll();
        return records.find(record => record.id === id);
    }
}

const test = async () => {
    const repo = new UsersRepository('users.json');
    
    const user = await repo.getOne('b331c0');

    console.log(user);
}

test();