const frame = document.querySelector("section");
const lists = frame.querySelectorAll("article");
const deg = 45; // 각각의 article 요소가 회전할 각도
                 // 360(도) % 8(개)  = 45(도)
const len = lists.length-1; // 0번 부터 시작
const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");
const audio = frame.querySelectorAll("audio");

let num = 0;
let i = 0;
let active = 0;

function activation(index, lists){
    for(let el of lists){
        el.classList.remove("on");
    }
    lists[index].classList.add("on");
}

 for(let el of lists){
    let pic = el.querySelector(".pic");
    el.style.transform = `rotate(${deg*i}deg) translateY(-100vh)`; // 따옴표가 아닌 백틱(``) 사용하기!!!
    pic.style.backgroundImage = `url(./img/album${i+1}.png)`;
    i++;

    // 각 article 요소의 안쪽 재생, 정지, 처음부터 재생 버튼 변수에 저장
    let play =el.querySelector(".play");
    let pause = el.querySelector(".pause");
    let load = el.querySelector(".load");

    play.addEventListener("click", e=>{
        let isActive = e.currentTarget.closest("article").classList.contains("on");
        if(isActive){
            //play 버튼부터 .pic 요소까지 탐색한 뒤 클래스 on 추가
            e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
            //play 버튼부터 audio 요소까지 탐색한 뒤 음악 재생
            e.currentTarget.closest("article").querySelector("audio").play();
        }
    });

    // pause
    pause.addEventListener("click", e=>{
        let isActive = e.currentTarget.closest("article").classList.contains("on");
        if(isActive){
            //pause 버튼부터 .pic 요소까지 탐색한 뒤 클래스 on 제거
            e.currentTarget.closest("article").querySelector(".pic").classList.remove("on");
            //pause 버튼부터 audio 요소까지 탐색한 뒤 음악 정지
            e.currentTarget.closest("article").querySelector("audio").pause();
        }
    });

    //load
    load.addEventListener("click", e=>{
        let isActive = e.currentTarget.closest("article").classList.contains("on");
        if(isActive){
            //load 버튼부터 .pic 요소까지 탐색한 뒤 클래스 on 추가
            e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
            //load 버튼부터 audio 요소까지 탐색한 뒤 음악 다시 로드하고 재생
            e.currentTarget.closest("article").querySelector("audio").load();
            e.currentTarget.closest("article").querySelector("audio").play();
        }
    });
}

function initMusic(){
    for(let el of audio){
        el.pause();
        el.load();
        el.parentElement.previousElementSibling.classList.remove("on");
    }
}

prev.addEventListener("click", ()=>{
    initMusic();
    num++;
    frame.style.transform = `rotate(${deg * num}deg)`;

    //현재 패널의 순번이 0이면 다시 마지막 패널의 순번으로 변경하고
    // 그렇지 않으면 현재 패널 순번에서 1씩 감소시켜서 activation 함수 호출
    (active == 0) ? active = len : active--;
    activation(active, lists);
});

next.addEventListener("click", ()=>{
    initMusic();
    num--;
    frame.style.transform = `rotate(${deg * num}deg)`;

    //현재 패널의 순번이 마지막 순번이면 다시 처음 패널의 순번으로 변경하고
    //그렇지 않으면 현재 패널 순번에서 1씩 증가시켜서 activation 함수 호출
    (active == len) ? active = 0 : active++;
    activation(active, lists);
});