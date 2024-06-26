        // Create a "close" button and append it to each list item
        var myNodelist = document.getElementsByTagName("LI");
        var i;
        for (i = 0; i < myNodelist.length; i++) {
            var span = document.createElement("SPAN");
            var txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            myNodelist[i].appendChild(span);
        }

        // Click on a close button to hide the current list item
        var close = document.getElementsByClassName("close");
        var i;
        for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
        }

        // Create a new list item when clicking on the "Add" button
        function newElement() {
        var li = document.createElement("li");
        var nameInput = document.getElementById("itemname").value;
        var priceInput = document.getElementById("itemprice").value;
        var descInput = document.getElementById("itemdesc").value;
        var t = document.createTextNode(nameInput + ", $" + priceInput + ", " + descInput); //displays name price & description
        li.appendChild(t);
        if (nameInput === '' || priceInput === '' || descInput === '') {
            alert("You must fill out all of the fields!");
        } else {
            document.getElementById("itemUL").appendChild(li);
            document.getElementById("itemdesc").value = "";
            document.getElementById("itemprice").value = "0.00";
        }
        document.getElementById("itemname").value = "";
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        for (i = 0; i < close.length; i++) {
            close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
            }
        }
        }