// ==UserScript==
// @name         Plati qickreplies
// @namespace    https://github.com/Lyrapuff
// @version      1.1
// @description  Adds some neat reply buttons on the conversation page
// @author       Lyrapuff
// @match        *my.digiseller.com/inside/purchases_inv_detail.asp?id_i=*&view=debate*
// @grant        none

// ==/UserScript==

(function() {
    'use strict';

    let textbox = document.getElementsByClassName('form-textarea')[0];

let container = document.getElementsByClassName('debates_content')[0].parentElement;
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.flexWrap = 'wrap';
container.style.justifyContent = 'start';
container.style.maxHeight = '636px';

let chat = container.children[0];

let typing = container.children[1];
typing.style.maxWidth = '640px';

let block = document.createElement('div');
block.style.display = 'flex';
block.style.flexDirection = 'column';
block.style.justifyContent = 'start';
block.style.height = '636px';

let replies = localStorage.getItem('replies') ?? [
    {
        "short": `Дай код`,
        "ru": `Пожалуйста, передайте код, полученный при покупке.`,
        "eng": `Please, send me the code you received after purchasing.`
    },
    {
        "short":  `Прими в друзья`,
        "ru": `Пожалуйста, примите заявку в друзья.`,
        "eng": `Please, accept the friend request.`
    },
    {
        "short": `Нужно время`,
        "ru": `Потребуется немного больше времени.`,
        "eng": `It'll take some more time.`
    },
    {
        "short": `Извитие`,
        "ru": `Извините за доставленные неудобства.`,
        "eng": `I'm sorry for this inconvenience.`
    },
    {
        "short": `Спасибо за покупку`,
        "ru": `Спасибо за покупку.\r\n Пожалуйста, оставьте отзыв.`,
        "eng": `Thanks for purchashing.\r\n Please, leave a review.`
    },

];

function setText(reply) {
    textbox.value = reply.ru + "\r\n\r\n" + reply.eng;
    textbox.dispatchEvent(new Event('input'));
}

replies.forEach(reply => {
    let replyElement = document.createElement('div');
    replyElement.style.cursor = 'pointer';
    replyElement.style.backgroundColor = '#f6f8f9';
    replyElement.style.border = '#cfd8dc 1px solid';
    replyElement.style.fontSize = '16px';
    replyElement.style.padding = '5px';
    replyElement.style.borderRadius = '3px';
    replyElement.style.fontFamily = 'Segoe UI';
    replyElement.style.marginTop = '5px';
    replyElement.style.width = '100%';
    replyElement.innerHTML = reply.short;
    replyElement.onclick = () => {
        setText(reply);
    };

    block.appendChild(replyElement);
});

container.appendChild(block);
})();
