'use strict'
/**
 * AddToNum_Transaction.js
 * 
 * This class is a transaction that can be executed and undone. It
 * can be stored in the jTPS transaction stack and must be constructed
 * with all the data necessary to perform both do and undo.
 * 
 */
class AddToNum_Transaction extends jTPS_Transaction {
    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param {Num} initNum
     * @param {Number} initAmountToAdd 
     */
    constructor(num, initAmountToAdd){
        // THIS IS THE OBJECT IT WILL MANIPULATE
        super(); 
        this.num = num;   //Num num
        
        // AMOUNT TO ADD/REMOVE FOR NUM
        this.amountToAdd = initAmountToAdd;
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction() {
        let oldNum = this.num.getNum();
        let newNum = oldNum + this.amountToAdd;
        this.num.setNum(newNum);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction() {
        let oldNum = this.num.getNum();
        let newNum = oldNum - this.amountToAdd;
        this.num.setNum(newNum);
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString() {
        return "Add " + this.amountToAdd;
    }
}