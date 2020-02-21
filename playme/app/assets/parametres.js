function tab(x){
let activeTab = document.querySelector('.div.show') , divs = document.querySelectorAll('.div');
if (activeTab) activeTab.classList.remove('show');
divs[x].classList.add('show');
}



function init(){
  get("SELECT * FROM parametres",function(d){
for (var i = 0; i < d.length; i++) {
  document.querySelector('['+d[i].cle+']').value = d[i].valeur;

}
  })
}


init();



function sauvegarder(par){
  let options = par.split('-') , cle , val , query =[];
for (var i = 0; i < options.length; i++) {
  cle = options[i];
  val  = document.querySelector('['+options[i]+']').value ;
get("UPDATE parametres SET valeur='"+val+"' WHERE cle='"+cle+"'",function(e){


});

}
}

function reset() {
  var mdp = document.getElementById('mdp').value ,
  rc = document.getElementById('rc').checked;
  if (mdp == '01230123') {
    get("DELETE FROM poste " ,function(r){
      console.log('r',r);
if (rc) get("DELETE FROM client",function(rr){console.log('rr',rr);});
      })
//


  } else {
// mot de passe incorrect
  }
  document.getElementById('mdp').value = "";
  document.getElementById('mdp').focus();
}
