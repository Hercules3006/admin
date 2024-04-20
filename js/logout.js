const LogOut = () => {
    let user = localStorage.getItem('user');
    if (user!=null) {
        user = JSON.parse(user);
        postMethods("/admins/logout", {id:user._id})
        localStorage.removeItem("user");
    }
    window.location.href = "index.html";
}
