"use strict";
document.addEventListener("DOMContentLoaded", iniciarPagina);
function iniciarPagina() {
    window.onbeforeunload = function () {
        return "¿Desea recargar la página web?";
    }
    //Botón para abrir y cerrar el botón hamburguesa del menu
    document.querySelector(".btn_menu").addEventListener("click", toggleMenu);

    function toggleMenu() {
        document.querySelector(".navigation").classList.toggle("show");//Le agrega  y le saca la clase show
    }

    document.querySelectorAll(".route").forEach(i => i.addEventListener("click", toggleMenu));
    let id = "home";
    seleccionar(id);
    document.title = id;
    cargar_contenido(id);
    window.history.pushState({ id }, `${id}`, `/030-C1 Bascuñan Karen Jazmín/${id}`);

    function seleccionar(id) {
        document.querySelectorAll(".route").forEach(i => i.parentElement.classList.remove('selected'));
        document.querySelector("#" + id).parentElement.classList.add('selected');
    }
    function mostrar_pagina(t, container) {
        container.innerHTML = t;
        if (!!document.getElementById("ofertas")) {
            pagina_tabla();
        }
        if (!!document.getElementById("anterior") && !!document.getElementById("siguiente")) {
            pagina_home();
        }
        if (!!document.getElementById("captcha")) {
            pagina_captcha();
        }
        if (!!document.getElementById("map")) {
            pagina_mapa();
        }

    }
    async function cargar_contenido(id) {
        let container = document.querySelector("#content");
        container.innerHTML = "<h1>Loading...</h1>";
        try {
            let response = await fetch(`${id}.html`);
            if (response.ok) {
                let content = await response.text();
                mostrar_pagina(content, container);
            }
            else {
                container.innerHTML = "Error";
            }
        }
        catch (error) {
            console.log("ERROR! " + error);
            container.innerHTML = "Error"
        }
    }


    function push(event) {
        event.preventDefault();
        let id = event.target.id;
        seleccionar(id);
        document.title = id;
        cargar_contenido(id);
        window.history.pushState({ id }, `${id}`, `/030-C1 Bascuñan Karen Jazmín/${id}`);
    }
    window.onload = () => {
        window["home"].addEventListener("click", function (event) {
            push(event);
        });
        window["destino"].addEventListener("click", function (event) {
            push(event)
        });
        window["administrador"].addEventListener("click", function (event) {
            push(event);
        });
        window["oferta"].addEventListener("click", function (event) {
            push(event);
        });
        window["tipos_de_viajes"].addEventListener("click", function (event) {
            push(event)
        });
        window["nosotross"].addEventListener("click", function (event) {
            push(event);
        });
        window["turnos"].addEventListener("click", function (event) {
            push(event);
        });
        window["contactos"].addEventListener("click", function (event) {
            push(event);
        });
    };

    window.addEventListener("popstate", event => {
        let stateId = event.state.id;
        seleccionar(stateId);
        cargar_contenido(stateId);
    });
    /*|¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯|*/
    /*|                  GALERÍA                 |*/
    /*|                    DE                    |*/
    /*|                 IMÁGENES                 |*/
    /*|__________________________________________|*/
    function pagina_home() {
        let array_imagenes = ["imagen0.jpg", "imagen1.jpg", "imagen2.jpg", "imagen3.jpg", "imagen4.jpg", "imagen5.jpg"];//arreglo que contiene todas las imagenes
        let contador_imagenes = 0;
        document.getElementById('siguiente').addEventListener('click', cambiar_siguiente);
        document.getElementById('anterior').addEventListener('click', cambiar_anterior);
        function cambiar_siguiente() {
            contador_imagenes++;
            let imagen = document.getElementById("imag");
            if (contador_imagenes > 5)
                contador_imagenes = 0;
            imagen.src = "images/" + array_imagenes[contador_imagenes];
        }
        function cambiar_anterior() {
            contador_imagenes--;
            let imagen = document.getElementById("imag");
            if (contador_imagenes < 0)
                contador_imagenes = 5;
            imagen.src = "images/" + array_imagenes[contador_imagenes];
        }
    }


    /*|¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯|*/
    /*|                                          |*/
    /*|                  CAPTCHA                 |*/
    /*|                                          |*/
    /*|__________________________________________|*/
    function pagina_captcha() {

        form_captcha();
        function form_captcha() {
            limpiar_imput()
            function limpiar_imput() {
                let form = document.getElementById('form');
                form.reset();
            }

            function escribeMensaje(mensaje) {
                let contenedor = document.getElementById('Mensajes');
                contenedor.innerHTML = mensaje;
            }
            function textoAleatorio(largo) {
                let letras = ['a', 'b', 'c', 'x', 'y', 'w', 'ñ', 'T', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '?', '-', '_', '&', '%', '$', '#'];
                let texto = '';
                for (let i = 1; i <= largo; i++) {
                    let index = Math.floor(Math.random() * (letras.length - 0) + 0);//Genera numero aleatorio
                    let letra = letras[index];
                    texto = texto + letra;
                }
                return texto;
            }

            function escribir_texto_aleatorio() {
                let captchaorigen = document.getElementById('captcha_origen');
                captchaorigen.innerHTML = textoAleatorio(7);
            }

            function procesar_captcha(event) {
                event.preventDefault();

                let captchaorigen = document.getElementById('captcha_origen');
                let captcha = document.getElementById('captcha');
                let valor_captcha_origen = captchaorigen.innerHTML;
                let valor_captcha = captcha.value;

                if (valor_captcha_origen == valor_captcha) {
                    escribeMensaje('Captcha válido!');
                } else {
                    escribeMensaje('Captcha NO Valido!');
                    escribir_texto_aleatorio();
                }
            }
            escribir_texto_aleatorio();
            form.addEventListener('submit', procesar_captcha);
        }
    }
    /*|¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯|*/
    /*|                                          |*/
    /*|                   TABLA                  |*/
    /*|                                          |*/
    /*|__________________________________________|*/
    function pagina_tabla() {
        const url = 'https://63651a54046eddf1bae5313d.mockapi.io/ofertas';
        let page = 1;
        let url_paginado = generar_url_paginado(page);
        let ant = document.getElementById('paginado_anterior');
        let sig = document.getElementById('paginado_siguiente');
        comprobar_ant();
        ant.addEventListener("click", pag_ant);
        sig.addEventListener("click", pag_sig);
        let thead = ["Destinos", "Descripción", "Precio", "Eliminar", "Editar"];//datos precargados del thead
        let tabla = document.getElementById("ofertas");
        let encabezado = document.createElement("thead");
        let body = document.createElement("tbody");
        tabla.appendChild(encabezado);
        tabla.appendChild(body);
        cargar_thead();
        obtenerDatos();
        document.getElementById('filtro').value = "Todos";
        document.getElementById('anter_sig').classList.remove("show");
        document.getElementById('anter_sig').classList.add("hide");
        document.getElementById("filtro").addEventListener("change", function () {
            filtrar();
        });
        function comprobar_ant() {
            if (page <= 1) {
                ant.classList.add('ocultar')
            }
            else {
                ant.classList.remove('ocultar')
            }
        }
        async function comprobar_sig() {
            try {
                let res = await fetch(url); // GET url
                let json = await res.json(); // texto json a objeto
                let largo = parseInt(json.length);
                let cantidad = page * 3;
                if (largo > cantidad) {
                    sig.classList.remove('ocultar');
                }
                if (largo <= cantidad) {
                    sig.classList.add('ocultar');
                }
            } catch (error) {
                console.log(error);
            }


        }
        async function filtrar() {
            document.getElementById('ant_sig').classList.remove("show");
            document.getElementById('ant_sig').classList.add("hide");

            document.getElementById('anter_sig').classList.remove("hide");
            document.getElementById('anter_sig').classList.add("show");
            let filtro = document.getElementById("filtro");
            let anter = document.getElementById('pag_anterior');
            let sigui = document.getElementById('pag_siguiente');
            let result;
            try {
                let res = await fetch(url); // GET url
                let json = await res.json(); // texto json a objeto
                if (res.ok) {
                    if (filtro.value == "menos_70000") {
                        result = json.filter(json => json.precio < 70000);
                        borrar_filas_tabla();
                        cargar_thead();
                        let i = 0;
                        let max = 3;
                        while (i < result.length) {
                            if (i < max) {
                                agregarFila(result[i]);
                            }
                            else {
                                i = result.length;
                            }
                            i++;
                        }
                        if (max <= 3) {
                            document.getElementById('pag_anterior').classList.add('hide');
                            document.getElementById('pag_anterior').classList.remove('show');
                        }
                        else {
                            document.getElementById('pag_anterior').classList.remove('hide');
                            document.getElementById('pag_anterior').classList.add('show');
                        }
                        if (result.length <= max) {
                            document.getElementById('pag_siguiente').classList.add('hide');
                            document.getElementById('pag_siguiente').classList.remove('show');
                        }
                        else {
                            document.getElementById('pag_siguiente').classList.remove('hide');
                            document.getElementById('pag_siguiente').classList.add('show');
                        }
                        sigui.addEventListener("click", function (event) {
                            event.preventDefault();
                            max = filtrar_sig(result, max, i);
                            if (max <= 3) {
                                document.getElementById('pag_anterior').classList.add('hide');
                                document.getElementById('pag_anterior').classList.remove('show');
                            }
                            else {
                                document.getElementById('pag_anterior').classList.remove('hide');
                                document.getElementById('pag_anterior').classList.add('show');
                            }
                            if (result.length <= max) {
                                document.getElementById('pag_siguiente').classList.add('hide');
                                document.getElementById('pag_siguiente').classList.remove('show');
                            }
                            else {
                                document.getElementById('pag_siguiente').classList.remove('hide');
                                document.getElementById('pag_siguiente').classList.add('show');
                            }
                        });

                        anter.addEventListener("click", function (event) {
                            event.preventDefault();
                            max = filtrar_ant(result, max, i);
                            if (max <= 3) {
                                document.getElementById('pag_anterior').classList.add('hide');
                                document.getElementById('pag_anterior').classList.remove('show');
                            }
                            else {
                                document.getElementById('pag_anterior').classList.remove('hide');
                                document.getElementById('pag_anterior').classList.add('show');
                            }
                            if (result.length <= max) {
                                document.getElementById('pag_siguiente').classList.add('hide');
                                document.getElementById('pag_siguiente').classList.remove('show');
                            }
                            else {
                                document.getElementById('pag_siguiente').classList.remove('hide');
                                document.getElementById('pag_siguiente').classList.add('show');
                            }
                        });

                    }
                    else {
                        if (filtro.value == "mas_70000") {

                            result = json.filter(json => json.precio > 70000);
                            console.log(result);
                            borrar_filas_tabla();
                            cargar_thead();
                            let i = 0;
                            let max = 3;
                            while (i < result.length) {
                                if (i < max) {
                                    agregarFila(result[i]);
                                }
                                else {
                                    i = result.length;
                                }
                                i++;
                            }
                            if (max <= 3) {
                                document.getElementById('pag_anterior').classList.add('hide');
                                document.getElementById('pag_anterior').classList.remove('show');
                            }
                            else {
                                document.getElementById('pag_anterior').classList.remove('hide');
                                document.getElementById('pag_anterior').classList.add('show');
                            }
                            if (result.length <= max) {
                                document.getElementById('pag_siguiente').classList.add('hide');
                                document.getElementById('pag_siguiente').classList.remove('show');
                            }
                            else {
                                document.getElementById('pag_siguiente').classList.remove('hide');
                                document.getElementById('pag_siguiente').classList.add('show');
                            }
                            sigui.addEventListener("click", function (event) {
                                event.preventDefault();
                                max = filtrar_sig(result, max, i);
                                if (max <= 3) {
                                    document.getElementById('pag_anterior').classList.add('hide');
                                    document.getElementById('pag_anterior').classList.remove('show');
                                }
                                else {
                                    document.getElementById('pag_anterior').classList.remove('hide');
                                    document.getElementById('pag_anterior').classList.add('show');
                                }
                                if (result.length <= max) {
                                    document.getElementById('pag_siguiente').classList.add('hide');
                                    document.getElementById('pag_siguiente').classList.remove('show');
                                }
                                else {
                                    document.getElementById('pag_siguiente').classList.remove('hide');
                                    document.getElementById('pag_siguiente').classList.add('show');
                                }
                            });

                            anter.addEventListener("click", function (event) {
                                event.preventDefault();
                                max = filtrar_ant(result, max, i);
                                if (max <= 3) {
                                    document.getElementById('pag_anterior').classList.add('hide');
                                    document.getElementById('pag_anterior').classList.remove('show');
                                }
                                else {
                                    document.getElementById('pag_anterior').classList.remove('hide');
                                    document.getElementById('pag_anterior').classList.add('show');
                                }
                                if (result.length <= max) {
                                    document.getElementById('pag_siguiente').classList.add('hide');
                                    document.getElementById('pag_siguiente').classList.remove('show');
                                }
                                else {
                                    document.getElementById('pag_siguiente').classList.remove('hide');
                                    document.getElementById('pag_siguiente').classList.add('show');
                                }
                            });
                        }
                        else {
                            document.getElementById('anter_sig').classList.remove("show");
                            document.getElementById('anter_sig').classList.add("hide");

                            document.getElementById('ant_sig').classList.remove("hide");
                            document.getElementById('ant_sig').classList.add("show");
                            cargar_tabla();
                        }
                    }
                }

            } catch (error) {
                console.log(error);
            }
        }
        function filtrar_ant(result, max, i) {
            borrar_filas_tabla();
            cargar_thead();
            max -= 3;
            i = max - 3;
            while (i < result.length && max > 0) {
                if (i < max) {
                    agregarFila(result[i]);
                }
                else {
                    i = result.length;
                }
                i++;
            }
            return max;
        }
        function filtrar_sig(result, max, i) {
            borrar_filas_tabla();
            cargar_thead();
            max += 3;
            i = max - 3;
            while (i < result.length) {
                if (i < max) {
                    agregarFila(result[i]);
                }
                else {
                    i = result.length;
                }
                i++;
            }
            return max;

        }
        async function pag_sig(e) {
            e.preventDefault();
            try {
                let res = await fetch(url); // GET url
                let json = await res.json(); // texto json a objeto
                if (res.ok) {
                    let largo = parseInt(json.length);
                    let cantidad = page * 3;
                    if (largo > cantidad) {
                        page++;
                        url_paginado = generar_url_paginado(page);
                        cargar_tabla();
                    }
                    comprobar_ant();
                    comprobar_sig();
                }
            } catch (error) {
                console.log(error);
            }
        }
        function pag_ant(e) {
            e.preventDefault();
            if (page > 1) {
                page--;
                url_paginado = generar_url_paginado(page);
                cargar_tabla();

            }
            comprobar_ant();
            comprobar_sig();
        }
        function generar_url_paginado(page) {
            return 'https://63651a54046eddf1bae5313d.mockapi.io/ofertas?page=' + page + '&limit=3';
        }
        async function obtenerDatos() {//Obtener datos de api
            try {
                let res = await fetch(url_paginado); // GET url
                let json = await res.json(); // texto json a objeto
                if (res.ok) {
                    for (let i = 0; i < json.length; i++) {
                        agregarFila(json[i]);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        let id_editar;
        function agregarFila(viaje) {//agregar fila a la tabla
            let destino = viaje.destino;
            let descripcion = viaje.descripcion;
            let precio = viaje.precio;
            let id = viaje.id;

            let fila = document.createElement("tr");
            let columna1 = document.createElement("td");
            let columna2 = document.createElement("td");
            let columna3 = document.createElement("td");
            let columna4 = document.createElement("td");
            let columna5 = document.createElement("td");
            columna4.classList.add('columna_mostrar');
            columna5.classList.add('columna_mostrar');

            let editar = document.createElement("button");
            editar.classList.add("btn_editar_de_a_uno");//para hacer_hover
            var logo_editar = new Image();
            logo_editar.src = "images/logo_editar.png";
            logo_editar.classList.add("imagen_borrar");

            let borrar = document.createElement("button");
            borrar.classList.add('btn_borrar_de_a_uno');//para hacer hover
            var logo_borrar = new Image();
            logo_borrar.src = "images/logo_borrar.png";
            logo_borrar.classList.add("imagen_borrar");
            if (!!document.getElementById("form_cargar_datos")) {
                columna4.classList.add('show');
                columna5.classList.add('show');
            }
            if (parseInt(precio) < 40000) {
                columna3.classList.add('pintar');
            }
            columna5.appendChild(editar);
            columna4.appendChild(borrar);
            columna1.innerHTML = destino;
            columna2.innerHTML = descripcion;
            columna3.innerHTML = "$" + precio;
            borrar.appendChild(logo_borrar);
            editar.appendChild(logo_editar);
            body.appendChild(fila);
            fila.appendChild(columna1);
            fila.appendChild(columna2);
            fila.appendChild(columna3);
            fila.appendChild(columna4);
            fila.appendChild(columna5);
            borrar.addEventListener("click", function () {
                borrar_una_fila(id);
                document.getElementById('filtro').value = "Todos";
                document.getElementById('anter_sig').classList.remove("show");
                document.getElementById('anter_sig').classList.add("hide");

                document.getElementById('ant_sig').classList.remove("hide");
                document.getElementById('ant_sig').classList.add("show");
            });
            editar.addEventListener("click", function () {
                pasar_valores_a_los_input(id);
                id_editar = id;
                document.getElementById('filtro').value = "Todos";
                document.getElementById('anter_sig').classList.remove("show");
                document.getElementById('anter_sig').classList.add("hide");

                document.getElementById('ant_sig').classList.remove("hide");
                document.getElementById('ant_sig').classList.add("show");
            });
        }

        async function borrar_una_fila(id) {
            try {
                let res = await fetch(url + "/" + id, {
                    "method": "DELETE",
                });
                if (res.ok) {
                    cargar_tabla();
                    alert("Eliminado!");
                    comprobar_sig();
                }

            } catch (error) {
                console.log(error);
            }
        }
        function cargar_thead() {//cargar encabezado de la tabla
            let fila = document.createElement("tr");
            let columna = [];

            for (let i = 0; i < thead.length; i++) {
                columna[i] = document.createElement("th");
                columna[i].innerHTML = thead[i];
            }
            columna[3].classList.add('columna_mostrar');
            columna[4].classList.add('columna_mostrar');
            encabezado.appendChild(fila);
            for (let i = 0; i < thead.length; i++) {
                fila.appendChild(columna[i]);
            }
            if (!!document.getElementById("form_cargar_datos")) {
                columna[3].classList.add('show');
                columna[4].classList.add('show');
            }
        }
        function cargar_tabla() {//Actualizar la tabla
            borrar_filas_tabla();
            cargar_thead();
            obtenerDatos();
        }
        function borrar_filas_tabla() {
            let tabla = document.getElementById("ofertas");
            while (tabla.rows.length > 0) {
                tabla.deleteRow(0);
            }
        }


        async function pasar_valores_a_los_input(id) {
            let destino = document.getElementById('input_destino');
            let descripcion = document.getElementById('descripcion');
            let precio = document.getElementById('precio');
            let btn_guardar = document.getElementById('botonGuardar');
            let btn_enviar = document.getElementById('botonEnviar');
            let x3 = document.getElementById('boton_crear_de_a_tres');
            let eliminar = document.getElementById('boton_eliminar');

            try {
                let res = await fetch(url);
                let json = await res.json();
                if (res.ok) {
                    for (let i = 0; i < json.length; i++) {
                        if (id == json[i].id) {
                            destino.value = json[i].destino;
                            descripcion.value = json[i].descripcion;
                            precio.value = json[i].precio;
                            btn_guardar.classList.add("show");
                            btn_enviar.classList.add("hide");
                            btn_guardar.classList.remove("hide");
                            btn_enviar.classList.remove("show");
                            btn_enviar.disabled = true;
                            x3.classList.add("hide");
                            eliminar.classList.add("hide");
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }


        async function editar_fila(id) {
            let form = document.querySelector('#form_cargar_datos');
            let formData = new FormData(form);
            let destino = formData.get('destino');
            let descripcion = formData.get('descripcion');
            let precio = formData.get('precio');
            let renglon = {//Crear un objeto
                "destino": destino,
                "descripcion": descripcion,
                "precio": precio
            }
            try {
                let res = await fetch(`${url}/${id}`, {
                    "method": "PUT",
                    "headers": { "Content-type": "application/json" },
                    "body": JSON.stringify(renglon)
                });
                if (res.ok) {
                    cargar_tabla();
                    alert("Modificado!");
                }

            } catch (error) {
                console.log(error);
            }


        }
        if (!!document.getElementById("form_cargar_datos")) {/*Que solo se ejecute en la página del administrador(donde está el formulario) */
            let formulario = document.querySelector("#form_cargar_datos");
            let btn_eliminar = document.querySelector("#boton_eliminar");
            btn_eliminar.addEventListener("click", vaciar_arreglo);
            let btnx3 = document.querySelector("#boton_crear_de_a_tres");
            btnx3.addEventListener("click", crearx3);
            borrar_filas_tabla();
            cargar_thead();
            document.getElementById('filtro').value = "Todos";
            document.getElementById('anter_sig').classList.remove("show");
            document.getElementById('anter_sig').classList.add("hide");

            document.getElementById('ant_sig').classList.remove("hide");
            document.getElementById('ant_sig').classList.add("show");
            formulario.reset();//Limpiar imputs
            formulario.addEventListener("submit", function (event) {
                agregar(event, 1);
                formulario.reset();
                document.getElementById('filtro').value = "Todos";
                document.getElementById('anter_sig').classList.remove("show");
                document.getElementById('anter_sig').classList.add("hide");

                document.getElementById('ant_sig').classList.remove("hide");
                document.getElementById('ant_sig').classList.add("show");
            });


            let btn_guardar = document.getElementById('botonGuardar');
            btn_guardar.addEventListener("click", function () {
                if (document.getElementById('input_destino').value != "" && document.getElementById('descripcion').value != "" && document.getElementById('precio').value != "") {
                    editar_fila(id_editar);
                    let form = document.getElementById('form_cargar_datos');
                    form.reset();
                    let btn_guardar = document.getElementById('botonGuardar');
                    let btn_enviar = document.getElementById('botonEnviar');
                    let x3 = document.getElementById('boton_crear_de_a_tres');
                    let eliminar = document.getElementById('boton_eliminar');
                    btn_guardar.classList.remove("show");
                    btn_enviar.classList.remove("hide");
                    btn_guardar.classList.add("hide");
                    btn_enviar.classList.add("show");
                    btn_enviar.disabled = false;
                    x3.classList.remove("hide");
                    eliminar.classList.remove("hide");
                }
                else{
                    alert("Complete todos los campos");
                }
            });
            async function crearx3(e) {
                e.preventDefault();
                if (document.getElementById('input_destino').value != "" && document.getElementById('descripcion').value != "" && document.getElementById('precio').value != "") {
                    agregar(e, 3);
                }
                else {
                    alert("Complete todos los campos");
                }

            }
            async function agregar(e, cant) {//agregar un elemento a la api
                e.preventDefault();
                let form = document.querySelector('#form_cargar_datos');
                let formData = new FormData(form);
                let destino = formData.get('destino');
                let descripcion = formData.get('descripcion');
                let precio = parseInt(formData.get('precio'));
                let renglon = {//Crear un objeto
                    "destino": destino,
                    "descripcion": descripcion,
                    "precio": precio
                }
                for (let i = 0; i < cant; i++) {
                    try {
                        let res = await fetch(url, {
                            "method": "POST",
                            "headers": { "Content-type": "application/json" },
                            "body": JSON.stringify(renglon)
                        });
                        if (res.ok) {
                            cargar_tabla();
                            alert("Creado!");
                            form.reset();
                            comprobar_sig();
                        }

                    } catch (error) {
                        console.log(error);
                    }
                }
            }

            async function vaciar_arreglo(e) {
                e.preventDefault();
                try {
                    let res = await fetch(url);
                    let json = await res.json();
                    for (let i = 0; i < json.length; i++) {
                        res = await fetch(`${url}/${json[i].id}`, {
                            "method": "DELETE"
                        });
                    }
                    if (res.ok) {
                        alert("Vaciado satisfactoriamente!");
                    }
                } catch (error) {
                    console.log(error);
                }
                cargar_tabla();
            }
        }
    }
    /*|¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯|*/
    /*|                                          |*/
    /*|                   MAPA                   |*/
    /*|                                          |*/
    /*|__________________________________________|*/
    function pagina_mapa() {
        let map = L.map('map').setView([-38.55565, -58.75411], 13)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        L.marker([-38.55565, -58.75411]).addTo(map);
    }

}