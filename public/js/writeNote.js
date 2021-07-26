let googleUser = null;

window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            console.log("logged in as ", user.displayName);
            googleUser = user;
        }
        else {
            console.log("not logged in")
        }
    });

    const createNoteBtn = document.querySelector("#createNote");
    createNoteBtn.addEventListener("click", () => {
        const noteTitle = document.querySelector("#noteTitle").value;
        const noteText = document.querySelector("#noteText").value;
        console.log(noteTitle, noteText);

        firebase.database().ref(`/users/${label}/${googleUser.uid}`).push({
            title: noteTitle,
            text: noteText
        }).then(() => {
            document.querySelector("#noteTitle").value = "";
            document.querySelector("#noteText").value = "";
        })
        .catch(error => {
            console.log("error writing new note: ", error);
        });
    });

    const labelSelect = document.querySelector("#select");
    labelSelect.addEventListener("change", () => {
        let labelIndex = selectElem.selectedIndex;
        label = labelSelect.options[labelIndex].value;
    })
    
}