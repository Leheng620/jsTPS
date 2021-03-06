'use strict'
/**
 * Num.js
 *
 * This class serves as the data class that our transactions will manipulate.
 * It's just an integer wrapper class.
 *
 */
class Num {

    // THE NUMBER THIS CLASS MANAGES
    constructor(){
        this.num = 0;
    }
    

    /**
     * Mutator method for the num instance variable.
     *
     * @param initNum The value to set num to.
     */
    setNum(initNum) {
        this.num = initNum;
    }

    /**
     * Accessor method for num.
     *
     * @return The num instance variable value.
     */
    getNum() {
        return this.num;
    }

    andMask(mask) {
        this.num = this.num & mask;
    }

    orMask(mask) {
        this.num = this.num | mask;
    }
}