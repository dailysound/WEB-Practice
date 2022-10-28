const frame = document.querySelector("section");
const lists = frame.querySelectorAll("article");
const deg = 45; // 각각의 article 요소가 회전할 각도
                 // 360(도) % 8(개)  = 45(도)
const len = lists.length-1; // 0번 부터 시작

let i = 0;

 for(let el of lists){
     el.style.transform = `rotate(${deg*i}deg) translateY(-100vh)`; // 따옴표가 아닌 백틱(``) 사용하기!!!
     i++;
}