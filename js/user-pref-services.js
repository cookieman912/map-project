'use strict'
const PREFKEY= 'preferences';
var gUserdata;
function initData(){
   var userdata= _loadUserPreferances();
    if(!userdata){
        console.log('in condition');
        userdata={
            bgc:'white',
            textColor: 'black'

        }
    }
   gUserdata=userdata; 
 0
}




function changeBackgroundColor(){
    let backgroundColor=document.getElementById("background-color");
    document.querySelector('body').style.backgroundColor=backgroundColor.value
    gUserdata.bgc=backgroundColor.value;
    _saveUserPreferances();
}

function changeTextColor(){
    let textColor=document.getElementById("text-color");
    console.log(textColor.value);
    document.querySelector('body').style.color=textColor.value
    gUserdata.textColor=textColor.value;
    _saveUserPreferances();
}



function  _saveUserPreferances(){
    saveToStorage(PREFKEY,gUserdata)
}
function _loadUserPreferances(){
   return loadFromStorage(PREFKEY   ) 
}
