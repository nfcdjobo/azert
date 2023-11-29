const divPaginate = document.querySelectorAll('div.paginate');
const spanStart = document.querySelectorAll('div.paginate span.start');
const spanPrewouis = document.querySelectorAll('div.paginate span.prewouis');
const spanPage = document.querySelectorAll('div.paginate span.page');
const spanNext = document.querySelectorAll('div.paginate span.next');
const spanEnd = document.querySelectorAll('div.paginate span.end');
let count = 0;

/**
 * 
 * @param {Array} list 
 * @param {Number} el 
 */
var pages = (list, el) => list.length % el ? Math.round(list.length/el) : list.length/el;

/**
 * 
 * @param {Array} tab 
 */
var getList = (tab, long) => {
    let listing = [];
    const finalList = [];
    tab.forEach(e => {
        const showPage = e.querySelector('span.page');
        if(e.closest('div.recentOrders')) listing = e.closest('div.recentOrders').querySelectorAll('tbody tr');
        else listing = e.closest('div.recentCustomers').querySelectorAll('table tr');
        finalList.push(listing);
        showPage.textContent = `1/${pages(listing, long)}`;
    });
    pagination([...spanStart, ...spanPrewouis, ...spanNext, ...spanEnd], long);
    return finalList;
}


/**
 * 
 * @param {Array} option 
 */
var pagination = (option, n) => {
    option.map(item => {
        item.onclick = function(){
           
            const npage = this.closest('div.paginate').querySelector('span.page');
            console.log(`count>=0 : ${count>=0}\n`, `count <=  myList(this).length-10 : ${count <=  myList(this).length-10}\n`, `n <= myList(this).length : ${n <= myList(this).length}\n`, `n >= 10 : ${n >= 10}`);
            console.log(`count : ${count}\n`, `n : ${n}\n`, `myList(this).length : ${myList(this).length}\n`, `myList(this).length - 10 : ${myList(this).length - 10}`);
            if(count>=0 && count <=  myList(this).length - 10 && n <= myList(this).length && n >= 10){
                if(this.className === 'start'){
                    count = 0;
                    n = 10;
                }else if(this.className === 'prewouis'){
                    // if(count>=0 && count <=  myList(this).length-10 && n <= myList(this).length && n >= 10){
                        // count -= 10;
                        count -= count - 10 < 0 ? 0 : 10;
                        n -= 10;
                    // }
                }else if(this.className === 'next'){
                    // if(count>=0 && count <=  myList(this).length-10 && n <= myList(this).length && n >= 10){
                        count += 10;
                        // n += 10;
                        n += n + 10 > myList(this).length ? myList(this).length - n : 10;
                    // }
                }else{
                    count = myList(this).length - 10;
                    n = myList(this).length;
                }
                const partition = myList(this).slice(count, n);
                
                disabling(this, count, n);
                [...myList(this)].map(el => el.hidden = true);
                [...partition].map(item => item.hidden = false);

            }
            
            
        }
    })
}

var disabling = (balise, start, end) => {
    if(start < 0){
        balise.style.pointerEvents = 'none';
        balise.closest('div.paginate').querySelector('span.prewouis').style.pointerEvents = 'none';
    }
    else if(start >= 0){
        balise.closest('div.paginate').querySelector('span.start').style.pointerEvents = 'visible';
        balise.closest('div.paginate').querySelector('span.prewouis').style.pointerEvents = 'visible';
    }
}

var myList = e => e.closest('div.recentOrders') ? [...e.closest('div.recentOrders').querySelectorAll('tbody tr')] : [...e.closest('div.recentCustomers').querySelectorAll('table tr')];

getList(divPaginate, 10);






