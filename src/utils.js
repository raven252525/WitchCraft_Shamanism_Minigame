// contains some functions to for streamlineability

// when function is used, it makes the text box be displayed, otherwise not
export function displayDialogue(text, onDisplayEnd) {
    const dialougeUI = document.getElementById("textbox-container");
    const dialouge = document.getElementById("dialogue");

    dialougeUI.style.display = "block";

    //enables text scrolling
    let index = 0;
    let currentText = "";
    const intervalRef = setInterval(() => {
        if (index < text.length) {
            currentText += text[index];
            dialogue.innerHTML = currentText;
            index++;
            return;
        }
       
        clearInterval(intervalRef);
    }, 5)
    
    // to cancel out of the dialogue after its done
    const closeBtn = document.getElementById("close")

    function onCloseBtnClick() {
        onDisplayEnd();
        dialougeUI.style.display = "none";
        dialouge.innerHTML = "";
        clearInterval(intervalRef);
        closeBtn.removeEventListener("click", onCloseBtnClick);
    }
    
    closeBtn.addEventListener("click", onCloseBtnClick);
}

export function setCamScale(k) {
    const resizeFactor = k.width() / k.height();
    
    // adjust the camera zoom
    k.camScale(2);
}