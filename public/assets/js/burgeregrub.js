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
        });
    });
    $('.delete-burgeregrub').on('click', (event) => {
        const burgeregrubId = $(this).attr('data-id');

        $.ajax('/api/burgeregrub', {
            method: 'DELETE',
        }).then(res => {
            alert('DELETED! view the console');
            console.log(res);
        });
    });
});