'use strict'



class Unit_test{
    
    /**
     * This JUnit test is for testing the adding of transactions.
     */
    testAdd() {
        try{
            let Assert = new assert();
            // WE'LL JUST USE A SIMPLE NUM FOR TESTING
            let tps = new jTPS();
            let num = new Num();
            Assert.assertEquals(0, num.getNum());
            
            // ADD 5 TRANSACTION
            tps.addTransaction(new AddToNum_Transaction(num, 5));
            Assert.assertEquals(5, num.getNum());
            Assert.assertEquals(1, tps.getSize());
            Assert.assertEquals(0, tps.getRedoSize());
            Assert.assertEquals(1, tps.getUndoSize());
            
            // ADD 10 TRANSACTION
            tps.addTransaction(new AddToNum_Transaction(num, 10));
            Assert.assertEquals(15, num.getNum());
            Assert.assertEquals(2, tps.getSize());
            Assert.assertEquals(0, tps.getRedoSize());
            Assert.assertEquals(2, tps.getUndoSize());
            
            // ADD 15 TRANSACTION
            tps.addTransaction(new AddToNum_Transaction(num, 20));
            Assert.assertEquals(35, num.getNum());
            Assert.assertEquals(3, tps.getSize());
            Assert.assertEquals(0, tps.getRedoSize());
            Assert.assertEquals(3, tps.getUndoSize());

            let d = document.getElementById("testAdd");
            d.innerHTML = "Passed";
            d.classList.remove("red");
            d.classList.add("green");
        }catch (e){
            let d = document.getElementById("testAdd");
            d.innerHTML = "Failed";
            d.classList.remove("green");
            d.classList.add("red");
        }
    }
        
    
    /**
     * 
     */
    testAndMask() {
        try{
            let Assert = new assert();
            // WE'LL JUST USE A SIMPLE NUM FOR TESTING
            let tps = new jTPS();
            let num = new Num();
            Assert.assertEquals(0, num.getNum());
            
            // ADD 5 TRANSACTION
            tps.addTransaction(new AddToNum_Transaction(num, 12));
            tps.addTransaction(new AndMask_Transaction(num, num.getNum(), 4));
            Assert.assertEquals(4, num.getNum());
            Assert.assertEquals(2, tps.getSize());
            
            tps.undoTransaction();
            Assert.assertEquals(12, num.getNum());
            Assert.assertEquals(2, tps.getSize());
            Assert.assertEquals(1, tps.getRedoSize());
            Assert.assertEquals(1, tps.getUndoSize());

            let d = document.getElementById("testAndMask");
            d.innerHTML = "Passed";
            d.classList.remove("red");
            d.classList.add("green");
        }catch (e){
            let d = document.getElementById("testAndMask");
            d.innerHTML = "Failed";
            d.classList.remove("green");
            d.classList.add("red");
        }
        

    }
    
    testOrMask() {
        try{
            let Assert = new assert();
            // WE'LL JUST USE A SIMPLE NUM FOR TESTING
            let tps = new jTPS();
            let num = new Num();
            Assert.assertEquals(0, num.getNum());
            
            // ADD 5 TRANSACTION
            tps.addTransaction(new AddToNum_Transaction(num, 12));
            tps.addTransaction(new OrMask_Transaction(num, num.getNum(), 5));
            Assert.assertEquals(13, num.getNum());
            Assert.assertEquals(2, tps.getSize());
            
            tps.undoTransaction();
            Assert.assertEquals(12, num.getNum());
            Assert.assertEquals(2, tps.getSize());
            Assert.assertEquals(1, tps.getRedoSize());
            Assert.assertEquals(1, tps.getUndoSize());

            let d = document.getElementById("testOrMask");
            d.innerHTML = "Passed";
            d.classList.remove("red");
            d.classList.add("green");
        }catch (e){
            let d = document.getElementById("testOrMask");
            d.innerHTML = "Failed";
            d.classList.remove("green");
            d.classList.add("red");
        }
    }

    /**
     * This JUnit test is for testing the undoing of transactions.
     */
    testUndo() {
        try{
            let Assert = new assert();
            // WE'LL JUST USE A SIMPLE NUM FOR TESTING
            let tps = new jTPS();
            let num = new Num();
            Assert.assertEquals(num.getNum(), 0);
            Assert.assertFalse(tps.hasTransactionToUndo());
            Assert.assertFalse(tps.hasTransactionToRedo());
            
            // ADD 3 TRANSACTIONS (5, 10, and 15)
            tps.addTransaction(new AddToNum_Transaction(num, 5));
            tps.addTransaction(new AddToNum_Transaction(num, 10));
            tps.addTransaction(new AddToNum_Transaction(num, 20));
            Assert.assertTrue(tps.hasTransactionToUndo());
            Assert.assertFalse(tps.hasTransactionToRedo());
            Assert.assertEquals(35, num.getNum());
            Assert.assertTrue(tps.hasTransactionToUndo());
            Assert.assertEquals(3, tps.getSize());
            Assert.assertEquals(0, tps.getRedoSize());
            Assert.assertEquals(3, tps.getUndoSize());
            
            // UNDO A TRANSACTION
            tps.undoTransaction();
            Assert.assertTrue(tps.hasTransactionToUndo());
            Assert.assertTrue(tps.hasTransactionToRedo());
            Assert.assertEquals(15, num.getNum());
            Assert.assertEquals(3, tps.getSize());
            Assert.assertEquals(1, tps.getRedoSize());
            Assert.assertEquals(2, tps.getUndoSize());
            
            // UNDO ANOTHER
            tps.undoTransaction();
            Assert.assertTrue(tps.hasTransactionToUndo());
            Assert.assertTrue(tps.hasTransactionToRedo());
            Assert.assertEquals(5, num.getNum());
            Assert.assertEquals(3, tps.getSize());
            Assert.assertEquals(2, tps.getRedoSize());
            Assert.assertEquals(1, tps.getUndoSize());
            
            // AND ANOTHER
            tps.undoTransaction();
            Assert.assertFalse(tps.hasTransactionToUndo());
            Assert.assertTrue(tps.hasTransactionToRedo());
            Assert.assertEquals(0, num.getNum());
            Assert.assertEquals(3, tps.getSize());
            Assert.assertEquals(3, tps.getRedoSize());
            Assert.assertEquals(0, tps.getUndoSize());
            
            // WE HAVE NO MORE TO UNDO SO THIS SHOULD DO NOTHING
            tps.undoTransaction();
            Assert.assertFalse(tps.hasTransactionToUndo());
            Assert.assertTrue(tps.hasTransactionToRedo());
            Assert.assertEquals(0, num.getNum());
            Assert.assertEquals(3, tps.getSize());
            Assert.assertEquals(3, tps.getRedoSize());
            Assert.assertEquals(0, tps.getUndoSize());

            let d = document.getElementById("testUndo");
            d.innerHTML = "Passed";
            d.classList.remove("red");
            d.classList.add("green");
        }catch (e){
            let d = document.getElementById("testUndo");
            d.innerHTML = "Failed";
            d.classList.remove("green");
            d.classList.add("red");
        }
        
    }
    
    /**
     * This JUnit test is for testing the redoing of transactions.
     */
    testRedo() {
        try{
            let Assert = new assert();
            // WE'LL JUST USE A SIMPLE NUM FOR TESTING
            let tps = new jTPS();
            let num = new Num();
            Assert.assertEquals(num.getNum(), 0);
            
            // ADD 3 TRANSACTIONS (5, 10, and 15)
            tps.addTransaction(new AddToNum_Transaction(num, 5));
            tps.addTransaction(new AddToNum_Transaction(num, 10));
            tps.addTransaction(new AddToNum_Transaction(num, 20));
            Assert.assertTrue(tps.hasTransactionToUndo());
            Assert.assertFalse(tps.hasTransactionToRedo());
            Assert.assertEquals(35, num.getNum());
            Assert.assertEquals(3, tps.getSize());
            Assert.assertEquals(0, tps.getRedoSize());
            Assert.assertEquals(3, tps.getUndoSize());
            
            // UNDO A TRANSACTION AND THEN REDO IT
            tps.undoTransaction();
            tps.doTransaction();
            Assert.assertTrue(tps.hasTransactionToUndo());
            Assert.assertFalse(tps.hasTransactionToRedo());
            Assert.assertEquals(35, num.getNum());
            Assert.assertEquals(3, tps.getSize());
            Assert.assertEquals(0, tps.getRedoSize());
            Assert.assertEquals(3, tps.getUndoSize());
            
            // UNDO TWO TRANSACTIONS AND THEN REDO THEM
            tps.undoTransaction();
            tps.undoTransaction();
            tps.doTransaction();
            tps.doTransaction();
            Assert.assertTrue(tps.hasTransactionToUndo());
            Assert.assertFalse(tps.hasTransactionToRedo());
            Assert.assertEquals(35, num.getNum());
            Assert.assertEquals(3, tps.getSize());
            Assert.assertEquals(0, tps.getRedoSize());
            Assert.assertEquals(3, tps.getUndoSize());
            
            // UNDO ALL THREE TRANSACTIONS AND REDO THEM
            tps.undoTransaction();
            tps.undoTransaction();
            tps.undoTransaction();
            tps.doTransaction();
            tps.doTransaction();
            tps.doTransaction();
            Assert.assertTrue(tps.hasTransactionToUndo());
            Assert.assertFalse(tps.hasTransactionToRedo());
            Assert.assertEquals(35, num.getNum());
            Assert.assertEquals(3, tps.getSize());
            Assert.assertEquals(0, tps.getRedoSize());
            Assert.assertEquals(3, tps.getUndoSize());
            
            // UNDO THREE TRANSACTIONS AND REDO TWO
            tps.undoTransaction();
            tps.undoTransaction();
            tps.undoTransaction();
            tps.doTransaction();
            tps.doTransaction();
            Assert.assertTrue(tps.hasTransactionToUndo());
            Assert.assertTrue(tps.hasTransactionToRedo());
            Assert.assertEquals(15, num.getNum());
            Assert.assertEquals(3, tps.getSize());
            Assert.assertEquals(1, tps.getRedoSize());
            Assert.assertEquals(2, tps.getUndoSize());
            
            // UNDO ALL THREE TRANSACTIONS AND REDO FOUR, WHICH
            // SHOULD NOT PRODUCE AN ERROR BUT THE LAST
            // REDO SHOULD DO NOTHING
            tps.undoTransaction();
            tps.undoTransaction();
            tps.undoTransaction();
            tps.doTransaction();
            tps.doTransaction();
            tps.doTransaction();
            tps.doTransaction();
            Assert.assertTrue(tps.hasTransactionToUndo());
            Assert.assertFalse(tps.hasTransactionToRedo());
            Assert.assertEquals(35, num.getNum());
            Assert.assertEquals(3, tps.getSize());
            Assert.assertEquals(0, tps.getRedoSize());
            Assert.assertEquals(3, tps.getUndoSize());

            let d = document.getElementById("testRedo");
            d.innerHTML = "Passed";
            d.classList.remove("red");
            d.classList.add("green");
        }catch (e){
            let d = document.getElementById("testRedo");
            d.innerHTML = "Failed";
            d.classList.remove("green");
            d.classList.add("red");
        }
        
    }    

    /**
     * This JUnit test is for testing clearing of transactions.
     */
    testClear() {
        try{
            let Assert = new assert();
            // WE'LL JUST USE A SIMPLE NUM FOR TESTING
            let tps = new jTPS();
            let num = new Num();
            Assert.assertEquals(num.getNum(), 0);
            
            // ADD 3 TRANSACTIONS (5, 10, and 15)
            tps.addTransaction(new AddToNum_Transaction(num, 5));
            tps.addTransaction(new AddToNum_Transaction(num, 10));
            tps.addTransaction(new AddToNum_Transaction(num, 20));
            Assert.assertEquals(35, num.getNum());
            Assert.assertEquals(3, tps.getSize());
            Assert.assertEquals(0, tps.getRedoSize());
            Assert.assertEquals(3, tps.getUndoSize());
                    
            // CLEAR ALL THE TRANSACTIONS
            tps.clearAllTransactions();
            Assert.assertEquals(35, num.getNum());
            Assert.assertEquals(0, tps.getSize());
            Assert.assertEquals(0, tps.getRedoSize());
            Assert.assertEquals(0, tps.getUndoSize());
            
            // ADD 3 TRANSACTIONS (5, 10, and 15)
            tps.addTransaction(new AddToNum_Transaction(num, 5));
            tps.addTransaction(new AddToNum_Transaction(num, 10));
            tps.addTransaction(new AddToNum_Transaction(num, 20));
            Assert.assertEquals(70, num.getNum());
            Assert.assertEquals(3, tps.getSize());
            Assert.assertEquals(0, tps.getRedoSize());
            Assert.assertEquals(3, tps.getUndoSize());
                    
            // CLEAR THEM ALL OUT AGAIN
            tps.clearAllTransactions();
            Assert.assertEquals(70, num.getNum());
            Assert.assertEquals(0, tps.getSize());
            Assert.assertEquals(0, tps.getRedoSize());
            Assert.assertEquals(0, tps.getUndoSize());
            
            // ADD 3 TRANSACTIONS (5, 10, and 15)
            tps.addTransaction(new AddToNum_Transaction(num, 5));
            tps.addTransaction(new AddToNum_Transaction(num, 10));
            tps.addTransaction(new AddToNum_Transaction(num, 20));
            Assert.assertEquals(105, num.getNum());
            Assert.assertEquals(3, tps.getSize());
            Assert.assertEquals(0, tps.getRedoSize());
            Assert.assertEquals(3, tps.getUndoSize());

            let d = document.getElementById("testClear");
            d.innerHTML = "Passed";
            d.classList.remove("red");
            d.classList.add("green");
        }
        catch (e){
            let d = document.getElementById("testClear");

            d.innerHTML = "Failed";
            d.classList.remove("green");
            d.classList.add("red");
        }
    }
}

class assert{
    constructor(){}
    assertEquals(a, b){
        if(a!==b){
            throw 'gg';
        }
    }

    assertTrue(a){
        if(!a){
            throw 'gg';
        }
    }

    assertFalse(a){
        if(a){
            throw 'gg';
        }
    }
}