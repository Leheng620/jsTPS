'use strict'
class OrMask_Transaction extends jTPS_Transaction {

    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param {Num} initNum
     * @param {Number} initNum
     * @param {Number} initNum
     */
    constructor(initNum, initIntNum, initMask) {
        super(); 
        // KEEP THESE FOR LATER
        this.num = initNum;
        this.intNum = initIntNum;
        this.mask = initMask;
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction() {
        this.num.orMask(this.mask);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction() {
        this.num.setNum(this.intNum);
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString() {
        return "Or Mask " + this.mask;
    }
}