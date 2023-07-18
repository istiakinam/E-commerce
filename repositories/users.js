import { get } from 'http';
import crypto from 'crypto'
import util from 'util'
import Repository from './repository.js'

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository{

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

    async comparePasswords(saved, supplied) {
        //saved -> pass saved in db: 'hashed.salt'
        const [hashed, salt] = saved.split('.')
        const hashedSuppliedBuf = await scrypt(supplied, salt, 64)

        return hashed === hashedSuppliedBuf.toString('hex');
    }
}
export default new UsersRepository('users.json');