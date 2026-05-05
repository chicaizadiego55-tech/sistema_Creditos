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
  let cmpCedula=recuperaraTexto("cedula");
  let cmpNombre=recuperaraTexto("nombre");
  let cmpApellido=recuperaraTexto("apellido");
  let cmpIngresos=recuperarFloat("ingresos");
  let cmpEgresos=recuperarFloat("egresos");
  console.log(cmpCedula)
  console.log(cmpNombre)
  console.log(cmpApellido)
  console.log(cmpIngresos)
  console.log(cmpEgresos)
}

function guardarCliente(){
  let cmpCedula   = recuperaraTexto("cedula");
  let cmpNombre   = recuperaraTexto("nombre");
  let cmpApellido = recuperaraTexto("apellido");
  let cmpIngresos = recuperarFloat("ingresos");
  let cmpEgresos  = recuperarFloat("egresos");

  let cliente = {
    cedula:   cmpCedula,
    nombre:   cmpNombre,
    apellido: cmpApellido,
    ingresos: cmpIngresos,
    egresos:  cmpEgresos
  };

  clientes.push(cliente);
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

function limpiar(){
  mostrarTextoEnCaja("cedula",   "");
  mostrarTextoEnCaja("nombre",   "");
  mostrarTextoEnCaja("apellido", "");
  mostrarTextoEnCaja("ingresos", "");
  mostrarTextoEnCaja("egresos",  "");
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

function buscarCliente(cedula){
  for(let i = 0; i < clientes.length; i++){
    if(clientes[i].cedula === cedula){
      return clientes[i];
    }
  }
  return null;
}