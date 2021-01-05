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

    const req = await fetch('http://localhost:3000/', options);

});



