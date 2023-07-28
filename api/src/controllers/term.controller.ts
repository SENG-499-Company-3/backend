import { ITerm } from '../interfaces/Term';

const TermModel = require('../models/term.model');

//Term controller
export class TermController {

    //get list of terms
    async list(): Promise<ITerm[]> {
        try {
            const terms: ITerm[] = await TermModel.find().catch((err) => err);
            return terms;
        } catch(err) {
            throw new Error('Error whlile retrieving the terms list.');
        }
    }

}
