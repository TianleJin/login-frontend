export class User {
    private _firstName: string;
    private _lastName: string;
    private _phone: string;
    private _userName: string;
    
    constructor(data : any) {
        this._firstName = data.firstName;
        this._lastName = data.lastName;
        this._phone = data.phone;
        this._userName = data.userName;
    }

    get firstName() { return this._firstName };
    get lastName() { return this._lastName };
    get phone() { return this._phone };
    get userName() { return this._userName };
    set firstName(name: string) { this._firstName = name };
    set lastName(name: string) { this._lastName = name };
    set phone(number: string) { this._phone = number };
} 