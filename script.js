
const search_bar = document.querySelector(".search_bar");
const searchBtn = document.querySelector(".searchBtn");
const container = document.querySelector(".container");

async function getInfo(word) {
    if(word.length == 0){
        alert("Add a Word");
        return;
    }
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/`+`${word}`);
        const info = await response.json();
        addWord(info);
    }
    catch(error) {
        alert("No Match Found");
        return;
    }
}

 const addWord = (info) => {

    const phonetic = (info[0].phonetic === undefined)?info[0].phonetics[1].text:info[0].phonetic;

    const pronounce = document.createElement("div");
    pronounce.classList.add("pronounce");
    pronounce.innerHTML = `<button class="sound"><i class="fa-solid fa-volume-high" style="color: #fff; font-size: 15px";></i></button>
    <h2 class="word">${info[0].word}</h2>
    <h2 class="word">${phonetic}</h2>`;

    const meaning = document.createElement("div");
    meaning.classList.add("meaning");
    meaning.innerHTML = `<div class="nva">
    <h3 class="head">${info[0].meanings[0].partOfSpeech}</h3>
    <div class="content">
        ${info[0].meanings[0].definitions[0].definition}
        <br>
        <span class="example">Example : ${info[0].meanings[0].definitions[0].example}</span>
    </div>
    </div>`;

    container.appendChild(pronounce);
    container.appendChild(meaning);

    const sound = document.querySelector(".sound");

    sound.addEventListener("click", () => {

        let url = undefined;

        for(let i=0;i<info[0].phonetics.length;i++){
            if(info[0].phonetics[i].audio !== ""){
                url = info[0].phonetics[i].audio;
                break;
            }
        }
        playAudio(`${url}`)
    })

}

function playAudio(url){
    new Audio(url).play();
}

searchBtn.addEventListener("click", (e) => {
    if(container.hasChildNodes()){
        while(container.hasChildNodes()){
            container.removeChild(container.firstChild);
        }
    }
    const word = search_bar.value;
    getInfo(word);
})


