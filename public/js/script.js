// document.addEventListener("DOMContentLoaded", function(){
//    console.log('document ready');
//   });

//   window.addEventListener('scroll', function() {
//     // if (window.scrollY > 50) {
//     // //   document.getElementById('navbar_top').classList.add('fixed-top');
//     //   document.getElementById('navbar_top').classList.add('nav-scrolled');
//     //   // add padding top to show content behind navbar
//     // //   navbar_height = document.querySelector('.navbar').offsetHeight;
//     // //   document.body.style.paddingTop = navbar_height + 'px';
//     // } else {
//     //     document.getElementById('navbar_top').classList.remove('nav-scrolled');
//     //      // remove padding top from body
//     //     // document.body.style.paddingTop = '0';
//     //   } 
// });

// const slots= document.getElementById('slot-wrapper').childNodes;
// console.log(slots);

// ******   modal instance & variables *****////
let selectedSlot=[]
let slotsPerRow= 69;
let slotSize=20;
let marginBetweenSlot=0;
let margin=marginBetweenSlot;
let marginTop=100;
let marginleft=0;
const modal = document.getElementById("myModal");
const proceedModal = document.getElementById("proceedModal");
const modalSpan = document.getElementsByClassName("close")[0];
const proceedSpan = document.getElementsByClassName("proceedclose")[0];




// ///////////////*****check if  every element is equal in the array ********///////////
function isRow(_array)
{
   if(typeof _array !== 'undefined')    
  {
   return !!_array.reduce(function(a, b){ return (a === b) ? a : NaN; });
  }
  return false;
}

// ////***   check if row is adjucent or not / ascending order  ***/// */
const validRowStyle=(rowSlotNumber)=>{
  rowSlotNumber.sort(function(a, b){return a-b});
  const lowest= rowSlotNumber[0];
  const highest= rowSlotNumber[rowSlotNumber.length-1]
  if (highest-lowest=== rowSlotNumber.length-1) {
    return true;
  }else{return false}
}


//*******  check for valid column, the selected columns are adjucent or not.**** *////
const validColumnStyle=(slotNumber)=>{
  let uniqueSlotNumber = slotNumber;
  console.log(slotNumber);
  
  uniqueSlotNumber.sort(function(a, b){return a-b});
  const lowest= Number(uniqueSlotNumber[0]);
  const highest= Number(uniqueSlotNumber[uniqueSlotNumber.length-1]);
  
  let rowpos1= Math.ceil(lowest/slotsPerRow);
  let rowpos2= Math.ceil(highest/slotsPerRow);
  let rowDifference= (rowpos2 - rowpos1);
  const totalRow= (rowpos2 - rowpos1) +1;
  let slotPerRow= uniqueSlotNumber.length*1 / totalRow;
  const LHS= (rowDifference *slotsPerRow + lowest) + (slotPerRow-1);

  if (LHS === highest) {
    
    return true;
  }
  else{return false;}

}


//////// *****  getting coordinates of x & y by list of slotnumbers array*****  ////////
const getCoordinates= (slotNumber) =>{
  let left;
  if (Math.ceil(slotNumber[0]/slotsPerRow)===1) {
     left= ((slotNumber[0] -1 ) *20) +marginleft;
  }else{ 
     left= (( (slotNumber[0] - ((Math.ceil(slotNumber[0]/slotsPerRow)-1)*slotsPerRow))-1 ) *20) +marginleft;
  }
  const top= ((Math.ceil(slotNumber[0]/slotsPerRow) -1) * 20 ) +marginTop+ margin;
  return { left, top };

}

/////// ****** getting image height & width by list of slotnumbers array*******/////////
const getImageHightWidth= (slotNumber, orientation) =>{
  const slotLen= slotNumber.length;
  let width=slotSize;
  if (orientation === 'row') {
    const hight= slotSize;
    if (slotLen < 2) {
      width= (slotNumber.length * 20) ;
    }
    else if (slotLen == 2) {
      width= (slotNumber.length * slotSize) ;
    }else{
      width= (slotNumber.length * slotSize);
    }
    return { hight, width };
  }
  else if(orientation === 'column') {
    let hight=slotSize;
    
    const totalRow= (Math.ceil((slotNumber[slotLen-1]/slotsPerRow)) - Math.ceil((slotNumber[0]/slotsPerRow)) + 1);
    const slotPerRow= slotNumber.length / totalRow;
    if (slotPerRow <2) {
       width= (slotPerRow * slotSize);
    }
    else if (slotPerRow ==2) {
      width= (slotPerRow * slotSize);
   }else{
      width= (slotPerRow * slotSize) - margin*2;
    }
    if (totalRow <= 2) {
       hight= (totalRow*margin) + (totalRow * slotSize);
    }else{
       hight= (totalRow * slotSize) - margin*2;

    }
    return { hight, width}

  }
}



// *****  getting event data array of selected slots*****///
const getSlotInfo=(data) => {
  // console.log(data);
  const offsetTopArray= data.map(el => el.offsetTop);
 const slotNumber= data.map(el => el.slot);
 let uniqueSlotNumber = slotNumber.filter((x, i, a) => a.indexOf(x) == i);
  uniqueSlotNumber.sort(function(a, b){return a-b});
  if (isRow(offsetTopArray)) {
    if (validRowStyle(uniqueSlotNumber)) {
      console.log('valid row', selectedSlot);
      const coordinates = getCoordinates(uniqueSlotNumber);
      const imageSize= getImageHightWidth(uniqueSlotNumber,'row')
      console.log('coordinate : ', coordinates, 'imagesize : ', imageSize);
      // showing proceed modal
      document.getElementsByClassName('proceedbtn')[0].setAttribute('imghight', imageSize.hight);
      document.getElementsByClassName('proceedbtn')[0].setAttribute('imgwidth', imageSize.width);
      document.getElementsByClassName('proceedbtn')[0].setAttribute('x', coordinates.left);
      document.getElementsByClassName('proceedbtn')[0].setAttribute('y', coordinates.top);
      document.getElementsByClassName('proceedbtn')[0].setAttribute('slot', uniqueSlotNumber);
      
      
      document.getElementById('proceed-modal-msg').innerText=`You Have Selected ${uniqueSlotNumber.length} slots (${uniqueSlotNumber})`;
      document.getElementById('img-size').innerText=`Your Image size should be- 'Hight:${imageSize.hight}px & width:${imageSize.width}px' for the best result!`;
      proceedModal.style.display = 'block';

    } else {
      data.map(el => el.style.removeProperty('background-color'))
      selectedSlot=[];
      // alert('Your selected row(s) is invalid. Please select adjucent row/column.');
      // document.getElementById('exampleModal').modal('show');
      modal.style.display = "block";
    }
  }else{
    if (validColumnStyle(uniqueSlotNumber)) {
      const coordinates = getCoordinates(uniqueSlotNumber);
      const imageSize= getImageHightWidth(uniqueSlotNumber, 'column');
      console.log('coordinate : ', coordinates, 'imagesize : ', imageSize);
       // showing proceed modal
       document.getElementsByClassName('proceedbtn')[0].setAttribute('imghight', imageSize.hight);
       document.getElementsByClassName('proceedbtn')[0].setAttribute('imgwidth', imageSize.width);
       document.getElementsByClassName('proceedbtn')[0].setAttribute('x', coordinates.left);
       document.getElementsByClassName('proceedbtn')[0].setAttribute('y', coordinates.top);
       document.getElementsByClassName('proceedbtn')[0].setAttribute('slot', uniqueSlotNumber);
       
       
       document.getElementById('proceed-modal-msg').innerText=`You Have Selected ${uniqueSlotNumber.length} slots (${uniqueSlotNumber})`;
       document.getElementById('img-size').innerText=`Your Image size should be- 'Hight:${imageSize.hight}px & width:${imageSize.width}px' for the best result!`;
       proceedModal.style.display = 'block';
    }else{
      data.map(el => el.style.removeProperty('background-color'))
      selectedSlot=[];
      document.getElementById('modal-msg').innerText='Your selected slot(s) are invalid. Please select adjacent row/column.';
      modal.style.display = "block";
    }
  }
  
}



window.onload = async function(){

  let takeslot=false;
  for (let i = 0; i < 101; i++) {
    const slotrow= document.createElement("div");
    slotrow.classList.add('slot-row');
    for (let j = 1; j <= 69; j++) {
      const slot = i*69+j;

      const slotdiv=await document.createElement('div');
  slotdiv.classList.add('slot');
  // slotdiv.classList.add('darkslot');
  slotdiv.setAttribute('id', 'slot');
  slotdiv.setAttribute('slot', slot);
await slotrow.appendChild(slotdiv);
  await document.getElementById('slot-wrapper').appendChild(slotrow);


  
  slotdiv.addEventListener('dblclick', async (e) =>{
    takeslot = false;
    await selectedSlot.pop();
    await selectedSlot.pop();
     if (selectedSlot[selectedSlot.length-1].offsetLeft== e.target.offsetLeft && selectedSlot[selectedSlot.length-1].offsetTop== e.target.offsetTop) {
    
      alert('Please click outside of the slot box to confirm selection!')
    }
    // console.log(selectedSlot[selectedSlot.length-1]);
    else{
      e.target.style.removeProperty('background-color');
     
      alert('Please click outside of the slot box to confirm selection')
    
    }
  })

  slotdiv.addEventListener('click', (e) =>{
    takeslot = true;
    slotdiv.style.setProperty("background-color","orange");
    // this.classList.add('bg-orange')
    selectedSlot.push(e.target);
    
  })
      
    }  // inner loop end
    



    

  // slotdiv.addEventListener('mouseenter', (e) =>{
  //   if(!takeslot) return;
  //   console.log('mouseover',e.target);
  //   slotdiv.style.backgroundColor='orange';
  // })

  // slotdiv.addEventListener('mousedown', (e) =>{
  //   console.log('mousedown',e.target);
  // })


  

  }
  
  //1st loop end
  
  
  window.addEventListener('dblclick', () =>{
    takeslot = false;
    
    if (selectedSlot.length>0) {
      getSlotInfo(selectedSlot);
    } else {
      return;
    }
//     var img = document.createElement('img');
//             img.src = 
// 'https://media.geeksforgeeks.org/wp-content/uploads/20190529122828/bs21.png';
// document.getElementById('slot-wrapper').appendChild(img);
  })

  modalSpan.onclick = function() {
    modal.style.display = "none";
  }

  proceedSpan.onclick = function() {
    proceedModal.style.display = "none";

    selectedSlot.map((slot) => slot.style.removeProperty('background-color'));

    selectedSlot=[];
  }




  document.getElementsByClassName('preloader')[0].style.display = "none";
}



