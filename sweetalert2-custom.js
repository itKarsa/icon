const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success ml-3',
        cancelButton: 'btn btn-default',
        footer: '<a href="#">Why do I have this issue?</a>'
    },
    buttonsStyling: false
});

const swalDelete = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-danger ml-3',
        cancelButton: 'btn btn-default'
    },
    buttonsStyling: false
});


const error500 = () => swalWithBootstrapButtons.fire(
    "Terjadi Kesalahan",
    "Silahkan Hubungi Tim IT",
    "error"
);

const error = (title, message) => swalWithBootstrapButtons.fire(
    title,
    message,
    "error"
);


function handleResponse(code, response, callback) {
    let title = response.title ?? response.responseJSON?.error?.title ?? "Terjadi Kesalahan";
    let message = response.message ?? response.responseJSON?.error?.message ?? "Silahkan Hubungi Tim IT";

    const successCodes = [200, 201];
    const errorCodes = [401, 404, 409, 422, 500];

    const alertConfig = {};

    successCodes.forEach(code => {
        alertConfig[code] = { icon: 'success', title, message };
    });

    errorCodes.forEach(code => {
        alertConfig[code] = { icon: 'error', title, message };
    });


    const config = alertConfig[code];

    swalWithBootstrapButtons.fire(
        config.title,
        config.message,
        config.icon
    ).then(callback);
}
