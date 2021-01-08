const posInput = document.getElementById('pos');
const descInput = document.getElementById('desc');
const btn = document.getElementById('sub-btn');
const form = document.getElementById('form-container');


form.addEventListener('submit', async e=>{
    //e.preventDefault();

    //send a psot request to the server
    const data = {
        pos: posInput.value,
        desc: descInput.value,
        date: Date.now()
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const req = await fetch('http://25.111.155.221:3000/', options);

});


async function removeItem(e){

    const req = await fetch(`http://25.111.155.221:3000/${e}`, {
        method: 'PUT'
    });

}



