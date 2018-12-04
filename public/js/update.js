document.addEventListener('click', function(e) {
    if (e.target.type === 'checkbox') {
        e.preventDefault()
        let data = JSON.stringify({status: e.target.checked})

        var request = new XMLHttpRequest();
        request.open('PUT', '/todos/' + e.target.name, true);
        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                // Success!
                console.log('great success')
                // TODO: update the checkbox on our end
            } else {
                console.log('great unsuccess')
                // We reached our target server, but it returned an error
            }
        };
        request.onerror = function() {
            console.log('great unsuccess of the even worse kind!')
            // There was a connection error of some sort
        };
        request.send(data);
    }
})