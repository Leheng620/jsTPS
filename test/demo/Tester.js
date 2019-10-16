'use strict'


class Tester{
    constructor(){
        this.textArea = document.getElementById('text_area');
        this.input = document.getElementById("prompt");
        this.printStatus();
        let a = [ "one()",
        "two()",
        "three()",
        "four()",
        "five()",
        "submit()"];
        for(let i = 1; i <= 6; i++){
            let d = document.getElementById("b"+i);
            d.setAttribute("onclick","window.tester."+[a[i-1]]);
        }

    }

    one(){
        this.textArea.innerHTML += "1\n";
        this.textArea.innerHTML += "add amount: ";
        this.input.classList.remove("visible");
        for(let i = 0; i< 4; i++){ //disable other button
            let d = document.getElementById("b"+i+2);
            d.setAttribute("disabled",true);
        }
    }

    two(){
        this.textArea.innerHTML += "2\n\n";
        window.jtps.undoTransaction();
    }

    three(){
        this.textArea.innerHTML += "3\n\n";
        window.jtps.doTransaction();
    }

    four(){
        this.textArea.innerHTML += "4\n\n";
        window.jtps.clearAllTransactions();
    }

    five(){
        this.textArea.innerHTML += "5\n\n";
        window.jtps.clearAllTransactions();
        window.num.setNum(0);
    }

    printStatus(){
        let text = "Current jTPS: \n" + window.jtps.toString() + "\n";
        text += "num is " + window.num.getNum() + "\n";
        text += "- Enter option: ";
        this.textArea.innerHTML += text;
    }

    submit(){
        let textField = document.getElementById("input");
        let text = textField.innerHTML;
        let n = Number(text);
        if (isNaN(n))
        {
            alert("please enter a number");
        }else{
            let transaction = new AddToNum_Transaction(window.num, n);
            window.jtps.addTransaction(transaction);
            this.textArea.innerHTML += "" + n + "\n";
        }
    }
}