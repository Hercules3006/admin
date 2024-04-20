let data = null;
getMethods('/locations/list').then((res) => {
    data = res;
    console.log(data);
    LoadLocation();
});

const LoadLocation = () => {
    let x = "";
    data.forEach(des => {
        x += locationXml(des);
    });
    document.getElementById("location-list").innerHTML += x;
}

const locationXml = (des) => {
    return `
        <ul class="tr location-card" id="location-card-${des._id}">
            <li class="td"> ${des._id} </li>
            <li class="td"> ${des.name} </li>
            <li class="td"> ${des.image} </li>
            <li class="td edit"> 
                <a href="form.html?type=location&method=edit&id=${des._id}" class="btn-edit"> <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg> </a>
            </li>
            <li class="td delete"> 
                <button class="btn-delete" onclick="handleDeleteLocation('${des._id}')"> <svg stroke='currentColor' fill='currentColor' stroke-width='0' viewBox='0 0 24 24' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'><path fill='none' d='M0 0h24v24H0V0z'></path><path d='M14.12 10.47 12 12.59l-2.13-2.12-1.41 1.41L10.59 14l-2.12 2.12 1.41 1.41L12 15.41l2.12 2.12 1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z'></path></svg>  </button>
            </li>
        </ul>
    `
}

const handleDeleteLocation = async (id) => {
    try{
        let result = await deleteMethods("/locations/delete?id="+id);
        if(result.status == 200) {
            document.getElementById("location-card-"+id).remove();
            alert("Delete success");
        }
        else {
            alert("Delete fail");
        }
    }
    catch(err) {
        alert("Something wrong!")
    }
}
