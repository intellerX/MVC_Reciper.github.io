document.addEventListener("DOMContentLoaded", function () {
    MostrarEmpleados();

})

let _userPagoId = -1
const _modeloUser = {
    id: 0,
    nombre: "",
    edad: 10,
    dias: "",
    hora: "",
    fecha: "",
    celular: "",
    acudiente: "",
    clase: ""
}

const _modeloPago = {
    id: 0,
    descripcion: "",
    valor: 60000,
    metodo: "Efectivo",
    idEstudiante: 0,
    estudiante: "",
    acudiente: "",
    fecha: "",
}


function MostrarEmpleados() {

    var old_data = JSON.parse(localStorage.getItem('data'));
    var old_data_pago = JSON.parse(localStorage.getItem('dataPago'));

    if (old_data == null) {
        old_data = [];
        window.localStorage.setItem('data', '[]');
    }
    if (old_data_pago == null) {
        old_data_pago = [];
        window.localStorage.setItem('dataPago', '[]');
    }
    
    
    $("#tablaEmpleados tbody").html("");



    old_data.forEach((user) => {
        $("#tablaEmpleados tbody").append(
            $("<tr>").append(
                $("<td>").text(user.nombre),
                $("<td>").text(user.edad),
                $("<td>").text(user.dias),
                $("<td>").text(user.hora),

                $("<td>").text(user.fecha),
                $("<td>").text(user.celular),
                $("<td>").text(user.acudiente),
                $("<td>").text(user.clase),
                $("<td>").append(
                    $("<button>").addClass("btn btn-primary btn-sm boton-pago-empleado").text("Pago").data("dataEmpleado", user),
                    $("<button>").addClass("btn btn-danger btn-sm boton-eliminar-empleado").text("Eliminar").data("dataEmpleado", user),
                    $("<button>").addClass("btn btn-info btn-sm boton-historial-empleado").text("Historial").data("dataEmpleado", user),
                )
            )
        )

    })
}

function MostrarModal() {

    $("#txtNombreCompleto").val(_modeloUser.nombre);
    $("#txtEdad").val(_modeloUser.edad);
    $("#txtHora").val(new Date().toLocaleTimeString());
    $("#txtDias").val("Lunes y Miercoles");
    $("#txtFecha").val(getDate());
    $("#txtAcudiente").val("");
    $("#txtClase").val("Violin");
    $("#modalEmpleado").modal("show");


}

function MostrarModalPago() {
    $("#txtAcudientePago").val()

    $("#txtDescripcion").val("Mensualidad Violin");
    $("#txtValor").val("60000");
    $("#txtMetodo").val("Efectivo");
    $("#txtEstudiante").val(_modeloPago.nombre);
    $("#txtAcudientePago").val(_modeloPago.acudiente);
    $("#txtFechaPago").val(getDate());
    $("#modalPago").modal("show");

}

function MostrarModalHistorial(idEstudiante) {

    var historialEstudiante = JSON.parse(localStorage.getItem('dataPago'));

    historialEstudiante = historialEstudiante.filter(
        estudiante => estudiante.idEstudiante == idEstudiante
    );


    $("#modal-body").html("");

    historialEstudiante.forEach((historial) => {
        console.log(historial.id);

        document.getElementById("modal-historial").innerHTML +=
        `
            <br /> 
            <div class="card historial" >
                <div class="card-header">
                    ${historial.id} - ${historial.fecha}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${historial.descripcion}</h5>
                    <p class="card-text">
                        ${historial.estudiante} 
                        Valor: $ ${historial.valor}
                        Metodo: ${historial.metodo}
                    </p>
                    <a href="#" class="btn btn-primary">Imprimir</a>
                </div>
            </div >
        `   
    })

    

    $("#modalHistorial").modal("show");
}

function CargarDatosModalHistorial() {
    var old_data_pago = JSON.parse(localStorage.getItem('dataPago'));

    if (old_data_pago == null)
        window.localStorage.setItem('dataPago', '[]');
    

    $("#modalHistorial tbody").html("");



    old_data_pago.forEach((user) => {
        $("#modalHistorial tbody").append(
            $("<tr>").append(
                $("<td>").text(user.nombre),
                $("<td>").text(user.edad),
                $("<td>").text(user.dias),
                $("<td>").text(user.hora),

                $("<td>").text(user.fecha),
                $("<td>").text(user.celular),
                $("<td>").text(user.acudiente),
                $("<td>").text(user.clase),
                $("<td>").append(
                    $("<button>").addClass("btn btn-primary btn-sm boton-pago-empleado").text("Pago").data("dataEmpleado", user),
                    $("<button>").addClass("btn btn-danger btn-sm boton-eliminar-empleado").text("Eliminar").data("dataEmpleado", user),
                    $("<button>").addClass("btn btn-info btn-sm boton-historial-empleado").text("Historial").data("dataEmpleado", user),
                )
            )
        )

    })

}

$(document).on("click", ".boton-nuevo-empleado", function () {
    _modeloUser.id = 0;
    _modeloUser.nombre = null;
    _modeloUser.idDepartamento = 0;
    _modeloUser.sueldo = 0;
    _modeloUser.fechaContrato = "";

    MostrarModal();

})

$(document).on("click", ".boton-pago-empleado", function () {

    _user = $(this).data("dataEmpleado");
    _userPagoId = _user.id;
    _modeloPago.acudiente = _user.acudiente;
    _modeloPago.nombre = _user.nombre;    

    MostrarModalPago();

})

$(document).on("click", ".boton-historial-empleado", function () {

    const _user = $(this).data("dataEmpleado");

    MostrarModalHistorial(_user.id);

})


$(document).on("click", ".boton-eliminar-empleado", function () {

    const _user = $(this).data("dataEmpleado");

    Swal.fire({
        title: "Esta seguro?",
        text: `Eliminar empleado "${_user.nombre}"`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "No, volver"
    }).then((result) => {
        if (result.isConfirmed) {

            var old_data = JSON.parse(localStorage.getItem('data'));

            const index = old_data.findIndex((usr) => usr.id == _user.id);
            if (index > -1) {
                old_data.splice(index, 1);
            }            

            window.localStorage.setItem('data', JSON.stringify(old_data));

            Swal.fire("Listo!", "Empleado fue elminado", "success");
            MostrarEmpleados();
        }

    })
        
    
})



$(document).on("click", ".boton-guardar-cambios-empleado", function () {

    var old_data = JSON.parse(localStorage.getItem('data'));

    if (old_data == null)
        window.localStorage.setItem('data', '[]');

    const modelo = {
        id: old_data.length,
        nombre: $("#txtNombreCompleto").val(),
        edad: $("#txtEdad").val(),
        dias: $("#txtDias").val(),
        hora: $("#txtHora").val(),
        fecha: $("#txtFecha").val(),
        celular: $("#txtCelular").val(),
        acudiente: $("#txtAcudiente").val(),
        clase: $("#txtClase").val()

    }

    if (modelo.nombre == null || modelo.nombre.trim() === "") {
        Swal.fire("Nombre Incompleto", "No debe ser nulo", "error")
    }
    old_data.push(modelo);

    window.localStorage.setItem('data', JSON.stringify(old_data));

    //$("#modalEmpleado").modal("hide");
    Swal.fire("Listo!", "Empleado fue creado", "success");

    window.location.reload();
})

$(document).on("click", ".boton-guardar-cambios-pago", function () {

    var old_data_pago = JSON.parse(localStorage.getItem('dataPago'));

    if (old_data_pago == null)
        window.localStorage.setItem('dataPago', '[]');

    const modeloPago = {

        id: old_data_pago.length,
        descripcion: $("#txtDescripcion").val(),
        valor: $("#txtValor").val(),
        metodo: $("#txtMetodo").val(),
        idEstudiante: _userPagoId,
        estudiante: $("#txtEstudiante").val(),
        acudiente: $("#txtAcudiente").val(),
        fecha: $("#txtFechaPago").val(),

    }

    if (modeloPago.descripcion == null || modeloPago.descripcion.trim() === "") {
        Swal.fire("Valor Incompleto", "No debe ser nulo", "error")
    }
    old_data_pago.push(modeloPago);

    window.localStorage.setItem('dataPago', JSON.stringify(old_data_pago));

    $("#modalPago").modal("hide");
    Swal.fire("Listo!", "Pago creado", "success");

    
})


function getDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;

    return formattedToday;
}
