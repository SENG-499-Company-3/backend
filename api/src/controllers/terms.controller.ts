import { ITerms } from '../interfaces/Term';

const TermModel = require('../models/term.model');

//Term controller
export class TermController {

    //get list of terms
    async list(): Promise<void> {
        try {
            const terms: ITerms[] = await TermModel.find().catch((err) => err);
            return terms;
        } catch(err) {
            throw new Error('Error whlile retrieving the terms list.');
        }
    }

    //Add new term
    async add(term: ITerms): Promise<void>{
        const s = 
    }
}
