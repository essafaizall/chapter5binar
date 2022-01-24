function pilihanBot(){
    var bot  = Math.random();
    if (bot < 0.4) {
        return 'gunting'
    }
    else if (bot >= 0.4 && bot < 0.7) {
        return 'batu'
    }
    else{
        return 'kertas'
    }
}

function bandingkan(pemain, bot){
    if( pemain == bot ) {
        return 'DRAW';
    } else if( pemain == 'gunting' ) {
        return ( bot == 'kertas' ) ? 'WIN' : 'LOSE';
    } else if( pemain == 'batu' ) {
        return ( bot == 'kertas' ) ? 'LOSE' : 'WIN';
    } else if( pemain == 'kertas' ) {
        return ( bot== 'gunting' ) ? 'LOSE' : 'WIN';
    }
}

function guntingSatu(){
    
    const randomBot = pilihanBot();
    const pemain = "gunting"
    const hasilSuit = bandingkan(pemain, randomBot)
    console.log(randomBot)
    console.log(pemain)
    console.log(hasilSuit)
    //gantinGambar()
    document.querySelector(".versus").innerHTML = hasilSuit
    document.querySelector(".versus").style.backgroundColor = "white"
    document.querySelector(".versus").style.textColor = "Green"
    document.querySelector("."+String(randomBot)).style.backgroundColor = "White"
    document.querySelector(".gunting-1").disabled = true //TIDAK BEKERJA
    //document.getElementsByClassName(".gunting-1").disabled = true

}
function refreshPage(){
    window.location.reload();
} 
function batuSatu(){
    const randomBot = pilihanBot();
    const pemain = "batu"
    const hasilSuit = bandingkan(pemain, randomBot)
    console.log(randomBot)
    console.log(pemain)
    console.log(hasilSuit)
    
    document.querySelector(".versus").innerHTML = hasilSuit
    document.querySelector(".versus").style.backgroundColor = "white"
    document.querySelector(".versus").style.textColor = "Green"
    document.querySelector("."+String(randomBot)).style.backgroundColor = "White"
    document.querySelector(".batu-1").disabled = true //TIDAK BEKERJA
    //document.getElementsByClassName(".gunting-1").disabled = true
}

function kertasSatu(){
    const randomBot = pilihanBot();
    const pemain = "kertas"
    const hasilSuit = bandingkan(pemain, randomBot)
    console.log(randomBot)
    console.log(pemain)
    console.log(hasilSuit)
    document.querySelector(".versus").innerHTML = hasilSuit
    document.querySelector(".versus").style.backgroundColor = "white"
    document.querySelector(".versus").style.textColor = "Green"
    document.querySelector("."+String(randomBot)).style.backgroundColor = "White"
    document.querySelector(".kertas-1").disabled = true //TIDAK BEKERJA
    //document.getElementsByClassName(".gunting-1").disabled = true
}

// function gantinGambar(){
//     const kucing = document.querySelector('.gunting-1')
//     kucing.addEventListener("click", function(){
//         //document.querySelector(".gunting-2").style.backgroundImage = "url(img/gunting1.png)"
//         document.querySelector(".versus").innerHTML = "Win"
//     })
//     //kucing.setAttribute('src', 'img/gunting1.png')
// }
// const kucing = document.querySelector('.gunting-2')
// kucing.addEventListener("click", function(){
//         //document.querySelector(".gunting-2").style.backgroundImage = "url(img/gunting1.png)"
//         document.querySelector(".versus").innerHTML = "Win"
//     })
// const PemainGunting = document.querySelector('.gunting-1')
// PemainGunting.addEventListener('click', funtion(){

// function addimage() {
//     var img = new Image();
//     img.src = "https://www.google.com/images/srpr/logo4w.png"
//     img_home.appendChild(img);
// }


//})
// Ini saya bingung kenapa tidak bisa dipakai :()