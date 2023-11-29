const filter = document.getElementById('filter');
filter.onchange = function(){
    const allTd = [];
    const allColonne = document.querySelectorAll(`.contact-email, .contact-whatsapp, .contact-sms`);
    allColonne.forEach(item =>allTd.push(item));
    allTd.map(item => item.hidden = false);
    if(this.value !== 'tout'){
        allTd.forEach(item => { if(!item.className.includes(this.value)) item.hidden = true} )
    }
}