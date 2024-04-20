let params = getParams(window.location.href);

const LoadDestinationForm = () => {
    let xml = `
        <div class="form">
            <h1>${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])} Destination</h1>
            <div class="form-group">
                <label>Location</label>
                <input type="text" id="destination-location" class="form-control" />
            </div>
            <div class="form-group">
                <label>Category</label>
                <input type="text" id="destination-category" class="form-control" />
            </div>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="destination-name" class="form-control" />
            </div>
            <div class="form-group">
                <label for="name">Address</label>
                <input type="text" id="destination-address" class="form-control" />
            </div>
            <div class="form-group">
                <label for="name">Description</label>
                <input type="text" id="destination-description" class="form-control" />
            </div>
            <div class="form-group">
                <label for="price">Rate</label>
                <input type="text" id="destination-rate" class="form-control" />
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <input type="text" id="destination-price" class="form-control" />
            </div>
            <div id="near-hotel-container">
                <ul> 
                    <li> Image </li>
                    <li> <button class="btn-add-input" onclick="AddInputNearHotel()"> + </button> </li>
                </ul>
                <div id="list-near-hotel"> 
                    <ul id="tr-near-hotel-1">
                        <li> <input type="text" id="nearHotel" class="input-nearHotel" /> </li>
                        <li> <button class="btn-remove-input" onclick="RemoveInputNearHotel(1)"> - </button> </li>
                    </ul>
                </div>
            </div>
            <button class="btn-add" onclick="HandleAddDestination()"> ${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])} </button>
        </div>
    `
    document.getElementById("form-container").innerHTML = xml;
}

let nearHotelCount = 1;
const AddInputNearHotel = () => {
    let data = [];
    let listNearHotel = document.getElementsByClassName("input-nearHotel");
    for(let i = 0; i < listNearHotel.length; i++) {
        data.push(listNearHotel[i].value);
    }

    nearHotelCount++;
    let x = `
        <ul id="tr-near-hotel-${nearHotelCount}">
            <li> <input type="text" class="input-nearHotel"/> </li>
            <li> <button class="btn-remove-input" onclick="RemoveInputNearHotel(${nearHotelCount})"> - </button> </li>
        </ul>
    `
    document.getElementById("list-near-hotel").innerHTML += x;

    for(let i = 0; i < data.length; i++) {
        listNearHotel[i].value = data[i];
    }
}

const RemoveInputNearHotel = (id) => {
    document.getElementById("tr-near-hotel-"+id).remove();
}

const HandleAddDestination = async () => {
    let location = document.getElementById("destination-location").value;
    let category = document.getElementById("destination-category").value;
    let name = document.getElementById("destination-name").value;
    let address = document.getElementById("destination-address").value;
    let description = document.getElementById("destination-description").value;
    let rate = document.getElementById("destination-rate").value;
    let price = document.getElementById("destination-price").value;

    if(location == "" || category == "" || name == "" || address == "" || description == "" || rate == "" || price == "") {
        alert("Invalid data");
        return;
    }

    let listImageInput = document.getElementsByClassName("input-nearHotel");

    let images= [];

    for(let i = 0; i < listImageInput.length; i++) {
        if(listImageInput[i].value == "") {
            alert("Invalid data image at column " + i);
            return;
        }
        images.push(listImageInput[i].value);
    }

    let data = {
        location: location,
        category: category,
        name: name,
        address: address,
        description: description,
        rate: rate,
        price: price,
        images: images
    } 

    if(params.method=="add"){
        try {
            let result = await postMethods("/destinations/create", data)
            if(result.status == 200) alert("Add success");
            else alert(result.message);
        }
        catch(err) {
            alert("Something went wrong");
        }
    }
    else{
        try {
            let result = await putMethods("/destinations/update?id="+params.id, data)
            if(result.status == 200) alert("Update success");
            else alert(result.message);
        }
        catch(err) {
            alert("Something went wrong");
        }
    }
}  

// admin
const LoadAdminForm = () => {
    let xml = `
        <div class="form">
            <h1>${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])} Admin</h1>
            <div class="form-group">
                <label for="name"> Name </label>
                <input type="text" id="admin-name" class="form-control" />
            </div>
            <div class="form-group">
                <label for="email"> Email </label>
                <input type="text" id="admin-email" class="form-control" />
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <input type="text" id="admin-image" class="form-control" />
            </div>
            <div class="form-group">
                <label for="password"> Password </label>
                <input type="text" id="admin-password" class="form-control" />
            </div>
            
            <button class="btn-add" onclick="HandleAddAdmin()">${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])}</button>
        </div>
    `
    document.getElementById("form-container").innerHTML = xml;
}
const HandleAddAdmin = async () => {
    let name = document.getElementById("admin-name").value;
    let email = document.getElementById("admin-email").value;
    let image = document.getElementById("admin-image").value;
    let password = document.getElementById("admin-password").value;

    if(name == "" || email == "" || password == "") {
        alert("Invalid data");
        return;
    }

    if(params.method=="add"){
        let data = {
            userName: name,
            email: email,
            image: image,
            password: password
        }

        try {
            let result = await postMethods("/admins/create", data)
            if(result.status == 200) alert("Add success");
            else alert(result.message);
        }
        catch(err) {
            alert("Something went wrong");
        }
    }

    else{
        let data = {
            userName: name,
            email: email,
            image: image,
            password: password
        } 
        try {
            let result = await putMethods("/admins/update?id="+params.id, data)
            if(result.status == 200) alert("Update success");
            else alert(result.message);
        }
        catch(err) {
            alert("Something went wrong");
        }
    }
}  

// client
const LoadClientForm = () => {
    let xml = `
        <div class="form">
            <h1>${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])} Client</h1>
            <div class="form-group">
                <label for="name"> Name </label>
                <input type="text" id="admin-name" class="form-control" />
            </div>
            <div class="form-group">
                <label for="email"> Email </label>
                <input type="text" id="admin-email" class="form-control" />
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <input type="text" id="admin-image" class="form-control" />
            </div>
            <div class="form-group">
                <label for="password"> Password </label>
                <input type="text" id="admin-password" class="form-control" />
            </div>
            <div class="form-group">
                <label for="password"> Active </label>
                <input type="text" id="admin-active" class="form-control" />
            </div>

            <button class="btn-add" onclick="HandleAddClient()">${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])}</button>
        </div>
    `
    document.getElementById("form-container").innerHTML = xml;
}
const HandleAddClient = async () => {
    let name = document.getElementById("admin-name").value;
    let email = document.getElementById("admin-email").value;
    let image = document.getElementById("admin-image").value;
    let password = document.getElementById("admin-password").value;
    let active = document.getElementById("admin-active").value;

    if(name == "" || email == "" || password == "" || active == "") {
        alert("Invalid data");
        return;
    }
    if(isNan(active)) {
        alert("Active must be a number");
        return;
    }
    if(Number(active) != 0 && Number(active) != 1) {
        alert("Active must be 0 or 1");
        return;
    }
    let data = {
        userName: name,
        email: email,
        image: image,
        password: password,
        active: active
    }

    if(params.method=="add"){
        try {
            let result = await postMethods("/clients/create", data)
            if(result.status == 200) alert("Add success");
            else alert(result.message);
        }
        catch(err) {
            alert("Something went wrong");
        }
    }

    else{
        try {
            let result = await putMethods("/clients/update?id="+params.id, data)
            if(result.status == 200) alert("Update success");
            else alert(result.message);
        }
        catch(err) {
            alert("Something went wrong");
        }
    }
}  

// blog

const LoadBlogForm = () => {
    let xml = `
        <div class="form">
            <h1>${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])} Blog</h1>
            <div class="form-group">
                <label for="name"> Author Id </label>
                <input type="text" id="blog-authorId" class="form-control" />
            </div>

            <div class="form-group">
                <label for="name"> Title </label>
                <input type="text" id="blog-title" class="form-control" />
            </div>

            <div class="form-group">
                <label for="content"> Content </label>
                <input type="text" id="blog-content" class="form-control" />
            </div>

            <div class="form-group">
                <label for="image"> Image </label>
                <input type="text" id="blog-image" class="form-control" />
            </div>

            <div id="reactions-container">
                <ul> 
                    <li> Reactions </li>
                    <li> <button class="btn-add-input" onclick="AddInputReactions()"> + </button> </li>
                </ul>
                <div id="list-reactions">
                    <ul id="tr-reactions-1">
                        <li> <input type="text" id="blog-reactions" class="input-reactions" placeholder="User Id"/> </li>
                        <li> <button class="btn-remove-input" onclick="RemoveInputReactions(1)"> - </button> </li>
                    </ul>
                </div>
            </div>
            
            <button class="btn-add" onclick="HandleAddBlog()">${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])}</button>
        </div>
    `
    document.getElementById("form-container").innerHTML = xml;
}

let reactionsCount = 1;
const AddInputReactions = () => {
    let data = [];
    let listReactions = document.getElementsByClassName("form-control");
    for(let i = 0; i < listReactions.length; i++) {
        data.push(listReactions[i].value);
    }

    reactionsCount++;
    let x = `
        <ul id="tr-reactions-${reactionsCount}">
            <li> <input type="text" id="blog-reactions" class="input-reactions" placeholder="User Id"/> </li>
            <li> <button class="btn-remove-input" onclick="RemoveInputReactions(${reactionsCount})"> - </button> </li>
        </ul>
    `
    document.getElementById("list-reactions").innerHTML += x;

    for(let i = 0; i < data.length; i++) {
        listReactions[i].value = data[i];
    }
}

const RemoveInputReactions = (id) => {
    document.getElementById("tr-reactions-"+id).remove();
}

const HandleAddBlog = async () => {
    let title = document.getElementById("blog-title").value;
    let content = document.getElementById("blog-content").value;
    let image = document.getElementById("blog-image").value;

    if(title == "" || content == "" || image == "") {
        alert("Invalid data");
        return;
    }

    let listReactions = document.getElementsByClassName("input-reactions"); 

    let reactions = [];
    for(let i = 0; i < listReactions.length; i++) {
        if(listReactions[i].value == "") {
            alert("Invalid data reactions at column " + i);
            return;
        }
        reactions.push(listReactions[i].value);
    }

    if(params.method=="add"){
        let authorId = document.getElementById("blog-authorId").value;
        if(authorId == "") {
            alert("Invalid data");
            return;
        }

        let data = {
            authorId: authorId,
            title: title,
            content: content,
            image: image,
            reactions: reactions
        }

        try {
            const res = await postMethods("/blogs/create", data);
            if(res.status == 200) {
                alert("Add success");
                return;
            }
            else {
                alert(res.message);
            }
        }
        catch(err) {
            alert("Something went wrong");
        }
    }
    else{

        let data = {
            title: title,
            content: content,
            image: image,
            reactions: reactions
        }

        try {
            const res = await putMethods("/blogs/update?id="+ params["id"], data);
            if(res.status == 200) {
                alert("Edit success");
                return;
            }
            else {
                alert(res.message);
            }
        }
        catch(err) {
            alert("Something went wrong");
        }
    }

}

// comment

const LoadCommentForm = () => {
    let xml = `
        <div class="form">
            <h1>${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])} Comment</h1>
            <div class="form-group">
                <label for="name"> Author Id </label>
                <input type="text" id="comment-authorId" class="form-control" />
            </div>

            <div class="form-group">
                <label for="name"> Blog Id </label>
                <input type="text" id="comment-blogId" class="form-control" />
            </div>

            <div class="form-group">
                <label for="name"> Reply Id </label>
                <input type="text" id="comment-replyId" class="form-control" />
            </div>

            <div class="form-group">
                <label for="content"> Content </label>
                <input type="text" id="comment-content" class="form-control" />
            </div>

            <div id="reactions-container">
                <ul> 
                    <li> Reactions </li>
                    <li> <button class="btn-add-input" onclick="AddInputReactions()"> + </button> </li>
                </ul>
                <div id="list-reactions">
                    <ul id="tr-reactions-1">
                        <li> <input type="text" id="blog-reactions" class="input-reactions" placeholder="User Id"/> </li>
                        <li> <button class="btn-remove-input" onclick="RemoveInputReactions(1)"> - </button> </li>
                    </ul>
                </div>
            </div>
            
            <button class="btn-add" onclick="HandleAddComment()"> ${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])} </button>
        </div>
    `
    document.getElementById("form-container").innerHTML = xml;
}

const HandleAddComment = async () => {
    let content = document.getElementById("comment-content").value;

    if(content == "") {
        alert("Invalid data");
        return;
    }

    let listReactions = document.getElementsByClassName("input-reactions"); 

    let reactions = [];
    for(let i = 0; i < listReactions.length; i++) {
        if(listReactions[i].value == "") {
            alert("Invalid data reactions at column " + i);
            return;
        }
        reactions.push(listReactions[i].value);
    }

    if(params.method=="add"){
        let authorId = document.getElementById("comment-authorId").value;
        let blogId = document.getElementById("comment-blogId").value;
        let replyId = document.getElementById("comment-replyId").value;
        if(authorId == "" || blogId == "" ) {
            alert("Invalid data");
            return;
        }

        let data = {
            authorId: authorId,
            blogId: blogId,
            replyId: replyId,
            content: content,
            reactions: reactions
        }

        try {
            const res = await postMethods("/comments/create", data);
            if(res.status == 200) {
                alert("Add success");
                return;
            }
            else {
                alert(res.message);
            }
        }
        catch(err) {
            alert("Something went wrong");
        }
    }
    else{

        let data = {
            content: content,
            reactions: reactions
        }

        try {
            const res = await putMethods("/comments/update?id="+ params["id"], data);
            if(res.status == 200) {
                alert("Edit success");
                return;
            }
            else {
                alert(res.message);
            }
        }
        catch(err) {
            alert("Something went wrong");
        }
    }

}


// order
const LoadOrderForm = () => {
    let xml = `
        <div class="form">
            <h1>${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])} Order</h1>
            <div class="form-group">
                <label> Id Destination </label>
                <input type="text" id="order-destination" class="form-control" />
            </div>
            <div class="form-group">
                <label> Id Client </label>
                <input type="text" id="order-client" class="form-control" />
            </div>
            <div class="form-group">
                <label> Quantity </label>
                <input type="number" id="order-quantity" class="form-control" />
            </div>
            <div class="form-group">
                <label> Note </label>
                <input type="text" id="order-note" class="form-control" />
            </div>
            <div class="form-group">
                <label> Status </label>
                <input type="text" id="order-status" class="form-control" />
            </div>
            <div class="form-group">
                <label> Start Date </label>
                <input type="datetime-local" id="order-startDate" class="form-control" />
            </div>
            <div class="form-group">
                <label> End Date </label>
                <input type="datetime-local" id="order-endDate" class="form-control" />
            </div>
            <button class="btn-add" onclick="HandleAddOrder()">${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])}</button>
        </div>
    `
    document.getElementById("form-container").innerHTML = xml;
}

const HandleAddOrder = async () => {
    let destination = document.getElementById("order-destination").value;
    let client = document.getElementById("order-client").value;
    let quantity = document.getElementById("order-quantity").value;
    let note = document.getElementById("order-note").value;
    let status = document.getElementById("order-status").value;
    let startDate = document.getElementById("order-startDate").value;
    let endDate = document.getElementById("order-endDate").value;

    console.log( startDate, endDate);

    if(destination == "" || client == "" || quantity == "" || status == "" || startDate == "" || endDate == "") {
        alert("Invalid data");
        return;
    }
    if(isNaN(quantity)){
        alert("Quantity must be a number");
        return;
    }
    if(Number(quantity) < 0) {
        alert("Quantity must be greater than 0");
        return;
    }
    if(isNaN(status)){
        alert("Status must be a number");
        return;
    }
    if(Number(status) != 0 && Number(status) != 1) {
        alert("Active must be 0 or 1");
        return;
    }
    let data = {
        idDestination: destination, 
        idClient: client,
        quantity: quantity,
        note: note,
        status: status,
        startDate: startDate,
        endDate: endDate
    }

    if(params.method=="add"){
        try {
            let result = await postMethods("/orders/create", data)
            if(result.status == 200) alert("Add success");
            else alert(result.message);
        }
        catch(err) {
            alert("Something went wrong");
        }
    }

    else{
        try {
            let result = await putMethods("/orders/update?id="+params.id, data)
            if(result.status == 200) alert("Update success");
            else alert(result.message);
        }
        catch(err) {
            alert("Something went wrong");
        }
    }
}  

// location
const LoadLocationForm = () => {
    let xml = `
        <div class="form">
            <h1>${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])} Location</h1>
            <div class="form-group" style=${params["method"]=="edit"?"display:none":""}>
                <label> Id </label>
                <input type="text" id="location-id" class="form-control" />
            </div>
            <div class="form-group">
                <label> Name </label>
                <input type="text" id="location-name" class="form-control" />
            </div>
    
            <div class="form-group">
                <label> Image </label>
                <input type="text" id="location-image" class="form-control" />
            </div>
            <button class="btn-add" onclick="HandleAddLocation()">${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])}</button>
        </div>
    `
    document.getElementById("form-container").innerHTML = xml;
}

const HandleAddLocation = async () => {
    let name = document.getElementById("location-name").value;
    let image = document.getElementById("location-image").value;
    
    if(name == "" || image == "") {
        alert("Invalid data");
        return;
    }

    if(params.method=="add"){
        try {
            let id = document.getElementById("location-id").value;
            if(id == "") {
                alert("Invalid data");
                return;
            }
            let data = {
                _id: id,
                name: name,
                image: image
            }
            let result = await postMethods("/locations/create", data)
            if(result.status == 200) alert("Add success");
            else alert(result.message);
        }
        catch(err) {
            alert("Something went wrong");
        }
    }

    else{
        try {
            let data = {
                name: name,
                image: image
            }
            let result = await putMethods("/locations/update?id="+params.id, data)
            if(result.status == 200) alert("Update success");
            else alert(result.message);
        }
        catch(err) {
            alert("Something went wrong");
        }
    }
}  
// category
const LoadCategoryForm = () => {
    let xml = `
        <div class="form">
            <h1>${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])} Category</h1>
            <div class="form-group" style=${params["method"]=="edit"?"display:none":""}>
                <label> Id </label>
                <input type="text" id="category-id" class="form-control" />
            </div>
            <div class="form-group">
                <label> Name </label>
                <input type="text" id="category-name" class="form-control" />
            </div>
            <button class="btn-add" onclick="HandleAddCategory()">${params["method"][0].toUpperCase() + params["method"].slice(1,params["method".length])}</button>
        </div>
    `
    document.getElementById("form-container").innerHTML = xml;
}

const HandleAddCategory = async () => {
    let name = document.getElementById("category-name").value;
    
    if(name == "") {
        alert("Invalid data");
        return;
    }

    if(params.method=="add"){
        try {
            let id = document.getElementById("category-id").value;
            if(id == "") {
                alert("Invalid data");
                return;
            }
            let data = {
                _id: id,
                name: name,
            }
            let result = await postMethods("/categories/create", data)
            if(result.status == 200) alert("Add success");
            else alert(result.message);
        }
        catch(err) {
            alert("Something went wrong");
        }
    }

    else{
        try {
            let data = {
                name: name,
            }
            let result = await putMethods("/categories/update?id="+params.id, data)
            if(result.status == 200) alert("Update success");
            else alert(result.message);
        }
        catch(err) {
            alert("Something went wrong");
        }
    }
}  


if(params.type == "destination") {
    LoadDestinationForm();
    if(params.method == "edit") {
        getMethods("/destinations/getById?id="+params.id).then((res) => {
            document.getElementById("destination-location").value = res.location;
            document.getElementById("destination-category").value = res.category;
            document.getElementById("destination-name").value = res.name;
            document.getElementById("destination-address").value = res.address;
            document.getElementById("destination-description").value = res.description;
            document.getElementById("destination-rate").value = res.rate;
            document.getElementById("destination-price").value = res.price;
            for(let i = 1; i < res.images.length; i++)  AddInputNearHotel();
            res.images.forEach((image, index) => {
                document.getElementsByClassName("input-nearHotel")[index].value = image
            });
        });
    }
}

if(params.type == "admin") {
    LoadAdminForm();
    if(params.method == "edit") {
        getMethods("/admins/getById?id="+params["id"]).then((res) => {
            document.getElementById("admin-name").value = res.userName;
            document.getElementById("admin-email").value = res.email;
            document.getElementById("admin-image").value = res.image;
            document.getElementById("admin-password").value = res.password;
        });
    }
}

if(params.type == "client") {
    LoadClientForm();
    if(params.method == "edit") {
        getMethods("/clients/getById?id="+params["id"]).then((res) => {
            document.getElementById("admin-name").value = res.userName;
            document.getElementById("admin-email").value = res.email;
            document.getElementById("admin-image").value = res.image;
            document.getElementById("admin-password").value = res.password;
            document.getElementById("admin-active").value = res.active;
        });
    }
}

if(params.type == "blog") {
    LoadBlogForm();
    if(params.method == "edit") {
        getMethods("/blogs/getById?id="+params["id"]).then((res) => {  
            document.getElementsByClassName("form-group")[0].style.display = "none";
            document.getElementById("blog-title").value = res.title;
            document.getElementById("blog-content").value = res.content;
            document.getElementById("blog-image").value = res.image;
            for(let i = 1; i < res.reactions.length; i++)  AddInputReactions();
            res.reactions.forEach((reaction, index) => {
                document.getElementsByClassName("input-reactions")[index].value = reaction;
            });
        });
    }
}

if(params.type == "comment") {
    LoadCommentForm();
    if(params.method == "edit") {
        getMethods("/comments/getById?id="+params["id"]).then((res) => {  
            document.getElementsByClassName("form-group")[0].style.display = "none";
            document.getElementsByClassName("form-group")[1].style.display = "none";
            document.getElementsByClassName("form-group")[2].style.display = "none";

            document.getElementById("comment-content").value = res.content;
            for(let i = 1; i < res.reactions.length; i++)  AddInputReactions();
            res.reactions.forEach((reaction, index) => {
                document.getElementsByClassName("input-reactions")[index].value = reaction;
            });
        });
    }
}   

if(params.type == "order") {
    LoadOrderForm();
    if(params.method == "edit") {
        getMethods("/orders/getById?id="+params["id"]).then((res) => {
            document.getElementById("order-destination").value = res.idDestination;
            document.getElementById("order-client").value = res.idClient;
            document.getElementById("order-quantity").value = res.quantity;
            document.getElementById("order-note").value = res.note;
            document.getElementById("order-status").value = res.status;
            document.getElementById("order-startDate").value = convertTime(res.startDate);
            document.getElementById("order-endDate").value = convertTime(res.endDate);
        });
    }
}

if(params.type == "location") {
    LoadLocationForm();
    if(params.method == "edit") {
        console.log(params["id"]);
        getMethods("/locations/getById?id="+params["id"]).then((res) => {
            document.getElementById("location-name").value = res.name;
            document.getElementById("location-image").value = res.image;
        });
    }
}

if(params.type == "category") {
    LoadCategoryForm();
    if(params.method == "edit") {
        getMethods("/categories/getById?id="+params["id"]).then((res) => {
            console.log(res);
            document.getElementById("category-name").value = res.name;
        });
    }
}

const convertTime = (time) => {
    let date = new Date(time);
    let y = date.getFullYear();
    let m = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let mi = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return y + "-" + m + "-" + d + "T" + h + ":" + mi;    
}