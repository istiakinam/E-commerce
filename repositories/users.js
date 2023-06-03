import fs from 'fs';
import { get } from 'http';
import crypto from 'crypto'
import util from 'util'

const scrypt = util.promisify(crypto.scrypt);

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

    async create(attrs) {
        attrs.id = this.randomId();

        const randomBytes = crypto.randomBytes(8);
        const salt = randomBytes.toString('hex');
        const buf = await scrypt(attrs.password, salt, 64)

        const records = await this.getAll()
        
        //adding the new user with hashed pass into the db
        const record = ({
            ...attrs,
            password: `${buf.toString('hex')}.${salt}`
        })

        records.push(record)

        await this.writeAll(records)
        return record; 
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

    async delete(id) {
        const records = await this.getAll();
        console.log(records);
        const filteredRecords = records.filter(record => record.id !== id);
        await this.writeAll(filteredRecords);
    }

    async update(id, attrs) {
        const records = await this.getAll();
        const record = records.find(record => record.id === id);

        if(!record) {
            throw new Error(`Record with id ${id} not found`);
        }

        //record = { email: 'hello@gmail.com' }
        //attrs = { pass: '***' }
        Object.assign(record, attrs); //copies attrs to record
        //record = { email: 'hello@gmail.com', pass: '***' }
        await this.writeAll(records);
    }

    async getOneBy(filters) {
        const records = await this.getAll();

        for (let record of records) {
            let found = true;

            for(let key in filters) {
                if (record[key] !== filters[key]) {
                    found = false; 
                }
            }
            if(found) {
                return record; 
            }  
        }
    }
}

// const test = async () => {
//     const repo = new UsersRepository('users.json')

//     const user = await repo.getOneBy({ id: 'iainam' })

//     console.log(user)
// }

// test();

export default new UsersRepository('users.json');