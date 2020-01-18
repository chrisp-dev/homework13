$(document).ready(function () {
    $('.change-devour').on('click', function (event) {
        const burgeregrubId = $(this).attr('data-id');
        const newdevoured = $(this).attr('data-newdevoured');
        const burgeregrub = {
            id: burgeregrubId,
            devoured: newdevoured
        };
        console.log('burgeregrubid: ', burgeregrubId);
        $.ajax('/api/burgeregrub/' + burgeregrubId, {
            method: 'PUT',
            data: burgeregrub
        }).then(res => {
            location.reload();
        });
    });

    $('.delete-burgeregrub').on('click', function (event) {
        const burgeregrubId = $(this).attr('data-id');

        $.ajax('/api/burgeregrub/' + burgeregrubId, {
            method: 'DELETE',
        }).then(res => {
            console.log('DELETED burgeregrub ' + burgeregrubId);
            location.reload();
        });
    });
});