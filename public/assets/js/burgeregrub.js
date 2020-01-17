$(document).ready(function () {
    $('.change-devour').on('click', (event) => {
        const burgeregrubId = $(this).attr('data-id');
        const newdevoured = $(this).attr('data-newdevoured');
        const bugeregrub = {
            id: burgeregrubId,
            devoured: newdevoured
        };

        $.ajax('/api/burgeregrub', {
            method: 'PUT',
            body: bugeregrub
        }).then(res => {
            alert('yay! view the console');
            console.log(res);
        }).catch(err => {
            alert('oops :/');
            console.error(err);
        });
    });
});