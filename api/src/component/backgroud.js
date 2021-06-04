//class名から取得
const bts = document.getElementsByClassName('back-change-button');

[...bts].forEach(bt=>{
  bt.addEventListener('click',(e)=>{

    const backgroundImage = bt.style.backgroundImage;      
    console.log(backgroundImage);
    document.body.style.backgroundImage = backgroundImage;
  });
});