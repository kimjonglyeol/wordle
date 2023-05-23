// let 수정이 가능한 변수
const 정답 = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:38%; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    // console.log("엔터키!!");
    let 맞은_갯수 = 0;
    // if (index !== 5) return;
    for (let i = 0; i < 5; i++) {
      // console.log("i는 이겁니다", i);
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      // console.log(block.innerText);
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
      // console.log("입력한_글자:", 입력한_글자, "정답_글자:", 정답_글자);
    }

    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    // console.log("키가 눌렸습니다!! event =>", event);
    // console.log(event.key, event.keyCode);
    // if (index === 5) return;
    // console.log("키가 입력!!", event.key);
    // toUpperCase() : 대문자 변환
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );
    // console.log(event.key, event.keyCode);
    // 함수를 쪼갤수록 가독성이 올라감
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    }
    //  else if (event.key === "Enter") handleEnterKey();
    // else if (index === 5) return;
    else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }

    // if (index === 5)
    // if (65 <= keyCode && keyCode <= 90) {
    // && = 두가지 경우의 수를 모두 만족하길 원할 때
    // thisBlock.innerText = key;
    // 아래 세가지 표현이 같은 표현이라 볼 수 있음
    // index = index + 1;
    // index++;
    // index += 1;
    // }
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timerDiv = document.querySelector("#timer");
      timerDiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
    // console.log(timer);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

// javascipt = camel 표기법
// python = 스네이크 표기법

appStart();
