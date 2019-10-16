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
        this.textArea.innerHTML += "1<br>";
        this.textArea.innerHTML += "add amount: ";
        this.input.classList.remove("visible");
        for(let i = 0; i< 5; i++){ //disable other button
            let d = document.getElementById("b"+(i+1));
            d.setAttribute("disabled",true);
        }
        document.getElementById("b6").removeAttribute("disabled");
    }

    two(){
        this.textArea.innerHTML += "2<br><br>";
        window.jtps.undoTransaction();
        window.tester.printStatus();
    }

    three(){
        this.textArea.innerHTML += "3<br><br>";
        window.jtps.doTransaction();
        window.tester.printStatus();
    }

    four(){
        this.textArea.innerHTML += "4<br><br>";
        window.jtps.clearAllTransactions();
        window.tester.printStatus();
    }

    five(){
        this.textArea.innerHTML += "5<br><br>";
        window.jtps.clearAllTransactions();
        window.num.setNum(0);
        window.tester.printStatus();
    }

    printStatus(){
        let text = "Current jTPS: <br>" + window.jtps.toString() + "<br>";
        text += "num is " + window.num.getNum() + "<br><br>";
        text += "- Enter option: ";
        this.textArea.innerHTML += text;
    }

    submit(){
        document.getElementById("b6").setAttribute("disabled",true);
        let textField = document.getElementById("input");
        let text = textField.value;
        textField.value = "";
        let n = Number(text);
        if (isNaN(n))
        {
            n=0;
        }else{
            let transaction = new AddToNum_Transaction(window.num, n);
            window.jtps.addTransaction(transaction);
            this.textArea.innerHTML += "" + n + "<br>";
        }
        for(let i = 0; i< 5; i++){ //enable other buttons
            let d = document.getElementById("b"+(i+1));
            d.removeAttribute("disabled");
        }
        window.tester.printStatus();
    }
}