document.addEventListener('click', function(e) {
    if (e.target.type === 'checkbox') {
        e.preventDefault()
        let data = JSON.stringify({status: e.target.checked})
        console.log(e.target)
        var request = new XMLHttpRequest();
        request.open('PUT', '/todos/' + e.target.name, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(data);
        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                console.log('great success')
                //e.target.checked = !e.target.checked
                // TODO: update the checkbox on our end
            } else {
                console.log('great unsuccess')
            }
        };
        request.onerror = function() {
            console.log('great unsuccess of the even worse kind!')
        };
    }
})



function changeCheckboxStatus(id, status) {
    let checkbox = ''
}