const fs = require('fs');
const { get } = require('http');

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

    async create(attributes) {
        const records = await this.getAll()
        
        //adding the new user
        records.push(attributes)

        //write the updated 'records' array back to the this.filename
        await fs.promises.writeFile(this.filename, JSON.stringify(records))
    }
}

const test = async () => {
    const repo = new UsersRepository('users.json');
    
    await repo.create( { email: 'istiak@gmail.com', password: 'abla' })

    const users = await repo.getAll();
    console.log(users);
}

test();