/* Share Service modified from:
https://www.gajotres.net/ionic-2-sharing-data-between-pagescomponents/2/
*/

import { Injectable } from '@angular/core';

@Injectable()
export class ShareService {

    firstName: string;
    lastName: string;

    constructor() {
        this.firstName = 'Blank';
        this.lastName = 'Name';
    }

    setUserName(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getName() {
        return this.firstName + ' ' + this.lastName;
    }
}
