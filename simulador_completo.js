let clientes = [];
  let creditos = [];
 
  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;
 
 
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios
 
function ocultarSecciones(){
  let seccion1=document.getElementById("clientes");
  let listaClases1=seccion1.classList //obtiene la lista de las clases del elemento
  console.log (listaClases1);
  listaClases1.remove("activa");
 
  let seccion2=document.getElementById("parametros");
  let listaClases2=seccion2.classList //obtiene la lista de las clases del elemento
  console.log (listaClases2);
  listaClases2.remove("activa");

   let seccion3 = document.getElementById("credito");
  let listaClases3 = seccion3.classList;
  listaClases3.remove("activa");

  let seccion4 = document.getElementById("listaCreditos");
let listaClases4 = seccion4.classList;
listaClases4.remove("activa");

}
 
function mostrarSeccion(id){
  ocultarSecciones()
  let seccion1=document.getElementById(id);
  let listaClases1=seccion1.classList //obtiene la lista de las clases del elemento
  listaClases1.add("activa")
  console.log(listaClases1)
}
 
function guardarTasa(){
  let cmpTasa=recuperarInt("tasaInteres");
  if (cmpTasa>=10 && cmpTasa<=20){
    mostrarTexto("mensajeTasa","Tasa configurada correctamente: "+cmpTasa+" %")
    tasaInteres=cmpTasa;
  }else{
    mostrarTexto("mensajeTasa","Tasa debe estar entre 10% y 20%")
 
  }
}
 


function guardarCliente(){
  let cmpCedula   = recuperaraTexto("cedula");
  let cmpNombre   = recuperaraTexto("nombre");
  let cmpApellido = recuperaraTexto("apellido");
  let cmpIngresos = recuperarFloat("ingresos");
  let cmpEgresos  = recuperarFloat("egresos");

  // validación campos obligatorios
  if(cmpCedula == "" || cmpNombre == "" || cmpApellido == "" || 
     isNaN(cmpIngresos) || isNaN(cmpEgresos)){
    alert("Por favor completa todos los campos obligatorios (*)");
    return;
  }
  if(cmpCedula.length < 10){
    alert("La cédula debe tener 10 dígitos");
    return;
  }

  let clienteExistente = buscarCliente(cmpCedula);

  if(clienteExistente == null){
    let cliente = {
      cedula:   cmpCedula,
      nombre:   cmpNombre,
      apellido: cmpApellido,
      ingresos: cmpIngresos,
      egresos:  cmpEgresos
    };
    clientes.push(cliente);
  } else {
    clienteExistente.nombre   = cmpNombre;
    clienteExistente.apellido = cmpApellido;
    clienteExistente.ingresos = cmpIngresos;
    clienteExistente.egresos  = cmpEgresos;
  }

  limpiar();
  pintarClientes();
}

function pintarClientes(){
  let tabla = document.getElementById("tablaClientes");
  tabla.innerHTML = "";

  for(let i = 0; i < clientes.length; i++){
    let c = clientes[i];
    tabla.innerHTML += "<tr>" +
      "<td>" + c.cedula + "</td>" +
      "<td>" + c.nombre + "</td>" +
      "<td>" + c.apellido + "</td>" +
      "<td>" + c.ingresos + "</td>" +
      "<td>" + c.egresos + "</td>" +
      "<td>" +
        "<button onclick=\"seleccionarCliente('" + c.cedula + "')\">Actualizar</button>" +
      "</td>" +
    "</tr>";
  }
}

function ejecutarBusqueda(){
    let valorCedula=recuperaraTexto("txtCedulaBusqueda");
    let cliente=buscarCliente(valorCedula);
    
    if (cliente==null) {
        alert("cliente no encontrado")
    } else {
        mostrarTextoEnCaja("txtCedula",cliente.cedula);
        mostrarTextoEnCaja("txtNombre",cliente.nombre);
        mostrarTextoEnCaja("txtEdad",cliente.edad);
    }

}
function buscarCliente(cedula) {

    let elementoCliente;
    let clienteEncontrado = null;

    for (let i = 0; i < clientes.length; i++) {

        elementoCliente = clientes[i];

       
        if (elementoCliente.cedula == cedula) {

            clienteEncontrado = elementoCliente;
            break;
        }
    }

    return clienteEncontrado;
}

function seleccionarCliente(cedula){
  let cliente = buscarCliente(cedula);
  clienteSeleccionado = cliente;

  mostrarTextoEnCaja("cedula",   cliente.cedula);
  mostrarTextoEnCaja("nombre",   cliente.nombre);
  mostrarTextoEnCaja("apellido", cliente.apellido);
  mostrarTextoEnCaja("ingresos", cliente.ingresos);
  mostrarTextoEnCaja("egresos",  cliente.egresos);
}

function limpiar(){
  mostrarTextoEnCaja("cedula",   "");
  mostrarTextoEnCaja("nombre",   "");
  mostrarTextoEnCaja("apellido", "");
  mostrarTextoEnCaja("ingresos", "");
  mostrarTextoEnCaja("egresos",  "");
  clienteSeleccionado = null;
}

function buscarClienteCredito(){
  let cedula = recuperaraTexto("buscarCedulaCredito");
  let cliente = buscarCliente(cedula);
  let datosClienteCredito = document.getElementById("datosClienteCredito");

  if(cliente == null){
    datosClienteCredito.innerHTML = "<p>Cliente no encontrado</p>";
    clienteSeleccionado = null;
  } else {
    clienteSeleccionado = cliente;
    datosClienteCredito.innerHTML =
      "<p>Cédula: "   + cliente.cedula   + "</p>" +
      "<p>Nombre: "   + cliente.nombre   + "</p>" +
      "<p>Apellido: " + cliente.apellido + "</p>" +
      "<p>Ingresos: " + cliente.ingresos + "</p>" +
      "<p>Egresos: "  + cliente.egresos  + "</p>";
  }
}

function calcularCredito(){
  let monto  = recuperarFloat("montoCredito");
  let plazo  = recuperarInt("plazoCredito");

  // validación
  if(clienteSeleccionado == null){
    alert("Primero busca un cliente");
    return;
  }
  if(isNaN(monto) || monto <= 0){
    alert("Ingresa un monto válido");
    return;
  }
  if(isNaN(plazo) || plazo <= 0){
    alert("Ingresa un plazo válido");
    return;
  }

  // resto de la lógica original intacta...
  let resultadoCredito    = document.getElementById("resultadoCredito");
  let btnSolicitarCredito = document.getElementById("btnSolicitarCredito");

  let capacidadPago = clienteSeleccionado.ingresos - clienteSeleccionado.egresos;
  let tasaMensual   = (tasaInteres / 100) / 12;
  let cuota         = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));
  let totalPagar    = cuota * plazo;

  cuota      = parseFloat(cuota.toFixed(2));
  totalPagar = parseFloat(totalPagar.toFixed(2));

  cuotaCalculada = cuota;
  montoCalculado = monto;
  plazoCalculado = plazo;

  resultadoCredito.innerHTML =
    "<p>Capacidad de pago: " + capacidadPago + "</p>" +
    "<p>Total a pagar: "     + totalPagar    + "</p>" +
    "<p>Cuota mensual: "     + cuota         + "</p>";

  if(cuota <= capacidadPago){
    creditoAprobado = true;
    resultadoCredito.innerHTML  += "<p>RESULTADO: APROBADO</p>";
    resultadoCredito.className   = "aprobado";
    btnSolicitarCredito.disabled = false;
  } else {
    creditoAprobado = false;
    resultadoCredito.innerHTML  += "<p>RESULTADO: RECHAZADO</p>";
    resultadoCredito.className   = "rechazado";
    btnSolicitarCredito.disabled = true;
  }
}

function solicitarCredito(){
  if(creditoAprobado && clienteSeleccionado != null){
    let credito = {
      cedula:   clienteSeleccionado.cedula,
      nombre:   clienteSeleccionado.nombre,
      apellido: clienteSeleccionado.apellido,
      monto:    montoCalculado,
      tasa:     tasaInteres,
      plazo:    plazoCalculado,
      cuota:    cuotaCalculada
    };
    creditos.push(credito);
  }
}

// PASO 2: función asignarCredito llamada desde el botón
function asignarCredito(){
  let credito = {
    cedula:   clienteSeleccionado.cedula,
    nombre:   clienteSeleccionado.nombre,
    apellido: clienteSeleccionado.apellido,
    monto:    montoCalculado,
    tasa:     tasaInteres,
    plazo:    plazoCalculado,
    cuota:    cuotaCalculada
  };
  creditos.push(credito);
  alert("Crédito asignado correctamente");
}

// PASO 4: buscar créditos por cédula
function buscarCreditos(cedula){
  let resultado = [];
  for(let i = 0; i < creditos.length; i++){
    if(creditos[i].cedula == cedula){
      resultado.push(creditos[i]);
    }
  }
  return resultado;
}

// PASO 5: pintar créditos en la tabla
function pintarCreditos(lista){
  let tabla = document.getElementById("tablaCreditos");
  tabla.innerHTML = "";

  for(let i = 0; i < lista.length; i++){
    let c = lista[i];
    tabla.innerHTML += "<tr>" +
      "<td>" + c.cedula   + "</td>" +
      "<td>" + c.nombre   + "</td>" +
      "<td>" + c.apellido + "</td>" +
      "<td>" + c.monto    + "</td>" +
      "<td>" + c.tasa     + "%</td>" +
      "<td>" + c.plazo    + " meses</td>" +
      "<td>" + c.cuota    + "</td>" +
    "</tr>";
  }
}

// PASO 6: buscar créditos de un cliente desde el input
function buscarCreditosCliente(){
  let cedula    = recuperaraTexto("buscarCedulaListado");
  let resultado = buscarCreditos(cedula);
  pintarCreditos(resultado);
}