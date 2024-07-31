import { hash, compare } from 'bcrypt'

export class Hash {

    private saltRounds = 8

    async hashPassword(password: string): Promise<string> {
        return hash(password, this.saltRounds)
    }

    async comparePassword(password: string, databasePassword: string): Promise<boolean> {
        return compare(password, databasePassword)
    }
}