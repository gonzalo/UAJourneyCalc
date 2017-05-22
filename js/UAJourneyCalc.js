

//inicializador del JS
$(document).ready(function () {


    //valores por defecto de los inputs
    $("#jornada_normal").val("7:38");
    $("#descuento_entrada").val(15);
    $("#incremento_salida").val(10);

    $("#turno").append('<option value="manyana" selected="selected">Mañana</option>');
    $("#turno").append('<option value="tarde">Tarde</option>');
    $("#reduccion").append('<option value="0" selected="selected">Ninguna</option>');
    $("#reduccion").append('<option value="38">38 min.</option>');
    $("#reduccion").append('<option value="60">1 h.</option>');
    $("#reduccion").append('<option value="98">1 h. 38 min.</option>');
    $("#dias_habiles").append('<option value="1">1</option>');
    $("#dias_habiles").append('<option value="2">2</option>');
    $("#dias_habiles").append('<option value="3">3</option>');
    $("#dias_habiles").append('<option value="4">4</option>');
    $("#dias_habiles").append('<option value="5" selected="selected">5</option>');


    $("#div_realiza_manyana").hide();
    $("#realiza_manyana").prop('disabled',true);
    $("#realiza_manyana").append('<option value="1" selected="selected">Sí</option>');
    $("#realiza_manyana").append('<option value="">No</option>');
    $("#hora_oficial_entrada").val("08:00");
    $("#hora_real_entrada").val("08:15"); //OJO que coincida con hora_oficial_entrada+descuento_entrada
    $("#hora_oficial_salida").val("15:00");
    $("#hora_real_salida").val("14:50");  //OJO que coincida con hora_oficial_salida-descuento_salida

    $("#realiza_tarde").append('<option value="1" selected="selected">Sí</option>');
    $("#realiza_tarde").append('<option value="">No</option>');
    $("#hora_oficial_entrada_tarde").val("16:00");
    $("#hora_real_entrada_tarde").val("16:15"); //OJO que coincida con hora_oficial_entrada+descuento_entrada
    $("#hora_oficial_salida_tarde").val("19:10");
    $("#hora_real_salida_tarde").val("10:00");  //OJO que coincida con hora_oficial_salida-descuento_salida

    //inicializar los disparadaores en los inputs básicos
    $("#jornada_normal").change(function () {updateEvent("#jornada_normal"); });
    $("#descuento_entrada").change(function () {updateEvent("#descuento_entrada"); });
    $("#incremento_salida").change(function () {updateEvent("#descuento_salida"); });
    $("#turno").change(function () {updateEvent("#turno"); });
    $("#reduccion").change(function () {updateEvent("#reduccion"); });
    $("#dias_habiles").change(function () {updateEvent("#dias_habiles"); });
    $("#realiza_manyana").change(function () {updateEvent("#realiza_manyana"); });
    $("#realiza_tarde").change(function () {updateEvent("#realiza_tarde"); });

    $('#hora_oficial_entrada').timepicker({
        timeFormat: 'HH:mm',
        minHour:    7,
        maxHour:    16,
        interval:   5,
        scrollbar:  true,
        change: function (time) {updateEvent("#hora_oficial_entrada", time); }
     });

    $('#hora_real_entrada').timepicker({
        timeFormat: 'HH:mm',
        minHour:    6,
        maxHour:    16,
        interval:   5,
        scrollbar:  true,
        change: function (time) {updateEvent("#hora_real_entrada", time); }
     });

    $('#hora_oficial_salida').timepicker({
        timeFormat: 'HH:mm',
        minHour:    14,
        maxHour:    22,
        interval:   5,
        scrollbar:  true,
        change: function (time) {updateEvent("#hora_oficial_salida", time); }
     });

    $('#hora_real_salida').timepicker({
        timeFormat: 'HH:mm',
        minHour:    13,
        maxHour:    22,
        interval:   5,
        scrollbar:  true,
        change: function (time) {updateEvent("#hora_real_salida", time); }
     });

    $('#hora_oficial_entrada_tarde').timepicker({
        timeFormat: 'HH:mm',
        minHour:    12,
        maxHour:    22,
        interval:   5,
        scrollbar:  true,
        change: function (time) {updateEvent("#hora_oficial_entrada_tarde", time); }
     });

    $('#hora_real_entrada_tarde').timepicker({
        timeFormat: 'HH:mm',
        minHour:    11,
        maxHour:    17,
        interval:   5,
        scrollbar:  true,
        change: function (time) {updateEvent("#hora_real_entrada_tarde", time); }
     });

    $('#hora_oficial_salida_tarde').timepicker({
        timeFormat: 'HH:mm',
        minHour:    18,
        maxHour:    22,
        interval:   5,
        scrollbar:  true,
        change: function (time) {updateEvent("#hora_oficial_salida_tarde", time); }
     });

    $('#hora_real_salida_tarde').timepicker({
        timeFormat: 'HH:mm',
        minHour:    18,
        maxHour:    22,
        interval:   5,
        scrollbar:  true,
        change: function (time) {updateEvent("#hora_real_salida_tarde", time); }
     });

    //lo último que hacemos es actualizar todos los valores
    updateResults();
});


// ajusta el picker indicado con un nuevo date igual al pasado por parámetro
// con el incremento o decremento indicado
function ajustaPicker(id_picker, hora, variacion){
  nueva_hora = new Date(hora);
  nueva_hora.setMinutes(nueva_hora.getMinutes() + variacion);
  $(id_picker).val($.format.date(nueva_hora, "HH:mm"));
}


function estableceHoraSalidaManyana(hora_oficial_entrada){
  // 1. calculamos cuanto tiempo de jornada tenemos que hacer
  minutos_Jornada = minutosJornada();
  incremento_salida = parseInt($('#incremento_salida').val());
  // 2. Con una simple suma obtenemos la hora de salida para cuadrar el balance
  ajustaPicker('#hora_oficial_salida',hora_oficial_entrada,minutos_Jornada);
  // 3. De forma similar, calculamos la hora del ficaje de salida
  ajustaPicker('#hora_real_salida',hora_oficial_entrada,minutos_Jornada-incremento_salida);
}

function estableceHoraEntradaManyana(hora_oficial_salida){
  // 1. calculamos cuanto tiempo de jornada tenemos que hacer
  minutos_Jornada = minutosJornada();
  incremento_entrada = parseInt($('#incremento_entrada').val());
  // 2. Con una simple suma obtenemos la hora de entrada para cuadrar el balance
  ajustaPicker('#hora_oficial_entrada',hora_oficial_salida, -minutos_Jornada);
  // 3. De forma similar, calculamos la hora del ficaje de entrada
  ajustaPicker('#hora_real_entrada',hora_oficial_salida, -minutos_Jornada +incremento_entrada);
}

function estableceHoraSalidaTarde(hora_oficial_entrada){
  // 1. calculamos cuanto tiempo de jornada tenemos que hacer
  minutos_Jornada = minutosJornada();
  incremento_salida = parseInt($('#incremento_salida').val());
  // 2. Con una simple suma obtenemos la hora de salida para cuadrar el balance
  ajustaPicker('#hora_oficial_salida_tarde',hora_oficial_entrada,minutos_Jornada);
  // 3. De forma similar, calculamos la hora del ficaje de salida
  ajustaPicker('#hora_real_salida_tarde',hora_oficial_entrada,minutos_Jornada - incremento_salida);
}

function estableceHoraEntradaTarde(hora_oficial_salida){
  // 1. calculamos cuanto tiempo de jornada tenemos que hacer
  minutos_Jornada = minutosJornada();
  incremento_entrada = parseInt($('#incremento_entrada').val());
  // 2. Con una simple suma obtenemos la hora de entrada para cuadrar el balance
  ajustaPicker('#hora_oficial_entrada_tarde',hora_oficial_salida, -minutos_Jornada);
  // 3. De forma similar, calculamos la hora del ficaje de entrada
  ajustaPicker('#hora_real_entrada_tarde',hora_oficial_salida, -minutos_Jornada + incremento_entrada);
}



//manejador de los eventos que se generan al hacer click en los inputs
function updateEvent(caller_id, value){

    //TODO validate inputs


    //NUEVA MECÁNICA
    //1. El usuario introduce el parámetro que desea "fijar":
    // - Hora de entrada (hora real a la que se realiza el fichaje)
    // - Hora fichaje entrada (hora que figurará en el sistema aplicado el ajuste)
    // - Hora de salida (hora real a la que se realiza el fichaje)
    // - Hora fichaje salida (hora real que figurará en el sistema aplicado el ajuste)
    //
    //2. El sistema ajusta automáticamente todo el resto de horas teniendo en cuenta:
    // - Si el usuario ha indicado que hace una tarde o una mañana
    //   Este perido se toma manualmente de los datos indicados
    // - Si hay algún ajuste horario por periodo estival

    //alert( caller_id + " llamó a updateEvent con el valor " + value);
    switch (caller_id) {
        case "#hora_oficial_entrada":
                                // 0. en el picker #hora_oficial_entrada tenemos el valor fijado
                                // 1. ajustamos el valor del picker hora_real_entrada

                                hora_real_entrada = new Date(value); //asignamos antes de restarle el tiempo de fichaje
                                descuento_entrada = parseInt($('#descuento_entrada').val());
                                hora_real_entrada.setMinutes(hora_real_entrada.getMinutes() + descuento_entrada);
                                $('#hora_real_entrada').val($.format.date(hora_real_entrada, "HH:mm"));

                                // 2. Mandamos establecer la hora de salida
                                estableceHoraSalidaManyana(value);

                                break;
        case "#hora_real_entrada":
                                // 0. en el picker #hora_real_entrada tenemos el valor fijado
                                // 1. ajustamos el valor del picker hora_oficial_entrada

                                hora_oficial_entrada = new Date(value); //asignamos antes de restarle el tiempo de fichaje
                                descuento_entrada = parseInt($('#descuento_entrada').val());
                                hora_oficial_entrada.setMinutes(hora_oficial_entrada.getMinutes() - descuento_entrada);
                                $('#hora_oficial_entrada').val($.format.date(hora_oficial_entrada, "HH:mm"));

                                // 2. Mandamos establecer la hora de salida pasadno la hora_oficial_entrada
                                estableceHoraSalidaManyana(value - descuento_entrada);

                                break;
        case "#hora_oficial_salida":
                                hora_real_salida = new Date(value); //asignamos antes de restarle el tiempo de fichaje
                                incremento_salida = parseInt($('#incremento_salida').val());
                                hora_real_salida.setMinutes(hora_real_salida.getMinutes() - incremento_salida);
                                $('#hora_real_salida').val($.format.date(hora_real_salida, "HH:mm"));

                                estableceHoraEntradaManyana(value);

                                break;

        case "#hora_real_salida":
                                hora_oficial_salida = new Date(value); //asignamos antes de restarle el tiempo de fichaje
                                incremento_salida = parseInt($('#incremento_salida').val());
                                hora_oficial_salida.setMinutes(hora_oficial_salida.getMinutes() + incremento_salida);
                                $('#hora_oficial_salida').val($.format.date(hora_oficial_salida, "HH:mm"));

                                estableceHoraEntradaManyana(value + incremento_salida);

                                break;
        case "#hora_oficial_entrada_tarde":
                                hora_real_entrada_tarde = value; //asignamos antes de restarle el tiempo de fichaje
                                descuento_entrada = parseInt($('#descuento_entrada').val());
                                hora_real_entrada_tarde.setMinutes(hora_real_entrada_tarde.getMinutes() + descuento_entrada);
                                $('#hora_real_entrada_tarde').val($.format.date(hora_real_entrada_tarde, "HH:mm"));
                                break;
        case "#hora_real_entrada_tarde":
                                hora_oficial_entrada_tarde = value; //asignamos antes de restarle el tiempo de fichaje
                                descuento_entrada = parseInt($('#descuento_entrada').val());
                                hora_oficial_entrada_tarde.setMinutes(hora_oficial_entrada_tarde.getMinutes() - descuento_entrada);
                                $('#hora_oficial_entrada_tarde').val($.format.date(hora_oficial_entrada_tarde, "HH:mm"));
                                break;
        case "#hora_oficial_salida_tarde":
                                hora_real_salida_tarde = value; //asignamos antes de restarle el tiempo de fichaje
                                incremento_salida = parseInt($('#incremento_salida').val());
                                hora_real_salida_tarde.setMinutes(hora_real_salida_tarde.getMinutes() + incremento_salida);
                                $('#hora_real_salida_tarde').val($.format.date(hora_real_salida_tarde, "HH:mm"));
                                break;

        case "#hora_real_salida_tarde":
                                hora_oficial_salida_tarde = value; //asignamos antes de restarle el tiempo de fichaje
                                incremento_salida = parseInt($('#incremento_salida').val());
                                hora_oficial_salida_tarde.setMinutes(hora_oficial_salida_tarde.getMinutes() - incremento_salida);
                                $('#hora_oficial_salida_tarde').val($.format.date(hora_oficial_salida_tarde, "HH:mm"));
                                break;
        case "#realiza_tarde":
                                toggleInterval("tarde");
                                break;
        case "#realiza_manyana":
                                toggleInterval("manyana");
                                break;
        case "#turno":          turno = $("#turno").val();
                                if (turno=="manyana") contraturno="tarde";
                                else contraturno="manyana";

                                //desactivamos el selector y lo ocultamos
                                $("#realiza_" + turno).prop("disabled",true);
                                $("#realiza_" + turno).val("1");
                                toggleInterval(turno);
                                $("#div_realiza_"+turno).hide();

                                //activamos el otro y lo mostramos
                                $("#realiza_" + contraturno).prop("disabled",false);
                                $("#div_realiza_"+contraturno).show();
                                break;

    }

    //después de actualizados los valores correspondientes calculamos los tiempos
    updateResults(caller_id);
}

function toggleInterval(interval){

    //interval tendrá la cadena "manyana" o "tarde"

    if (interval=="tarde"){
        if ($("#realiza_tarde").val()==1){
            $("#hora_oficial_entrada_tarde").prop("disabled",false);
            $("#hora_real_entrada_tarde").prop("disabled",false);
            $("#hora_oficial_salida_tarde").prop("disabled",false);
            $("#hora_real_salida_tarde").prop("disabled",false);
        } else {
            $("#hora_oficial_entrada_tarde").prop("disabled",true);
            $("#hora_real_entrada_tarde").prop("disabled",true);
            $("#hora_oficial_salida_tarde").prop("disabled",true);
            $("#hora_real_salida_tarde").prop("disabled",true);
        }
    }else if (interval=="manyana"){
        if ($("#realiza_manyana").val()==1){
            $("#hora_oficial_entrada").prop("disabled",false);
            $("#hora_real_entrada").prop("disabled",false);
            $("#hora_oficial_salida").prop("disabled",false);
            $("#hora_real_salida").prop("disabled",false);
        } else {
            $("#hora_oficial_entrada").prop("disabled",true);
            $("#hora_real_entrada").prop("disabled",true);
            $("#hora_oficial_salida").prop("disabled",true);
            $("#hora_real_salida").prop("disabled",true);
        }

    }
}


//calculamos el número de minutos que debes cumplir semanalmente
function minutosSemanales(){

  // nº días x (jornada - reducción)
  var jornada_array = $('#jornada_normal').val().split(":");
  var n_dias = parseInt($('#dias_habiles').val());
  var reduccion = parseInt($('#reduccion').val());

  var total_minutos_semanales = (parseInt(jornada_array[0])*60+parseInt(jornada_array[1])-reduccion)*n_dias;
  var resta_minutos = 0

  var turno = $('#turno').val();

  // si hacemos alguna tarde (o mañana dependeindo del turno) se lo restamos
  if ((turno == "tarde") && $("#realiza_manyana").val()){
      hora_entrada_extra = Date.parseTime( $('#hora_oficial_entrada').val());
      hora_salida_extra =  Date.parseTime( $('#hora_oficial_salida').val());
      resta_minutos = Date.dateDiff("n",hora_entrada_extra,hora_salida_extra);
  }

  if ((turno == "manyana") && $("#realiza_tarde").val()){
    hora_entrada_extra = Date.parseTime( $('#hora_oficial_entrada_tarde').val());
    hora_salida_extra =  Date.parseTime( $('#hora_oficial_salida_tarde').val());
    resta_minutos = Date.dateDiff("n",hora_entrada_extra,hora_salida_extra);
  }

  return total_minutos_semanales-resta_minutos;
}

//calculamos el número de minutos que debes cumplir al día
function minutosJornada(){

  var n_dias = parseInt($('#dias_habiles').val());
  var minutos_semana = minutosSemanales();
  return minutos_semana/n_dias;
}

function updateResults(caller_id){
    //TODO colorear todas las casillas distintas menos la que hemos fijado


    //calculamos el número de minutos que debes cumplir semanalmente
    var jornada_array = $('#jornada_normal').val().split(":");
    var n_dias = parseInt($('#dias_habiles').val());
    var reduccion = parseInt($('#reduccion').val());
    var turno = $('#turno').val();
    var total_minutos_semanales = (parseInt(jornada_array[0])*60+parseInt(jornada_array[1])-reduccion)*n_dias;
    $('#total_horas').val(minutes2hours_str(total_minutos_semanales));

    //inicializamos la vble balance a la que le iremos restando
    var balance = total_minutos_semanales;

    // 1. obtenemos un date de referencia para hacer el cálculo
    var fecha_referencia = new Date(); //pondremos el día de hoy a las 00:00
    fecha_referencia.setHours(0);
    fecha_referencia.setMinutes(0);
    fecha_referencia.setSeconds(0);
    fecha_referencia.setMilliseconds(0);

    // 2. calculamos el número de minutos que estamos haciendo con ese horario

    // 2.0 Primero mirando el turno confirmamos cuantas jornadas trabajamos de mañana o de tarde

    if (turno=="manyana"){
        n_dias_manyana = n_dias;
        n_dias_tarde = $("#realiza_tarde").val();
    } else {
        n_dias_tarde = n_dias;
        n_dias_manyana = $("#realiza_manyana").val();
    }

    // 2.1 Calculamos el número de minutos de mañana

    var total_minutos_manyana = 0;
    if (n_dias_manyana > 0){
        hora_oficial_entrada = Date.parseTime( $('#hora_oficial_entrada').val());
        hora_oficial_salida =  Date.parseTime( $('#hora_oficial_salida').val());
        total_minutos_manyana = Date.dateDiff("n",hora_oficial_entrada,hora_oficial_salida)*n_dias_manyana;
    }

    $('#horas_manyana').val(minutes2hours_str(total_minutos_manyana));

    // 2.2 Calculamos el número de minutos de tarde

    var total_minutos_tarde = 0;
    if (n_dias_tarde > 0){
        hora_oficial_entrada = Date.parseTime( $('#hora_oficial_entrada_tarde').val());
        hora_oficial_salida =  Date.parseTime( $('#hora_oficial_salida_tarde').val());
        total_minutos_tarde = Date.dateDiff("n",hora_oficial_entrada,hora_oficial_salida)*n_dias_tarde;
    }

    $('#horas_tarde').val(minutes2hours_str(total_minutos_tarde));

    // 3. Calculamos total horas realizadas el balance de horas
    var total_minutos_realizados = total_minutos_manyana + total_minutos_tarde;
    var balance = total_minutos_semanales - total_minutos_realizados;

    $('#horas_realizadas').val(minutes2hours_str(total_minutos_realizados));
    $('#balance_horas').val(minutes2hours_str(balance));

    // 4. Analizamos los resultados

    if (balance==0){
        //Cumplimos perfectamente con el horario
        $('#evaluacion').html("");
        $( "#evaluacion" ).removeClass( "alert-info alert-danger alert-warning" ).addClass( "alert-success" );
        $('#evaluacion').html("<strong>¡Perfecto!</strong> Cumples exactamente con el horario establecido");
    }else if (balance>0){
        //estamos haciendo horas de menos debemos compensar horario
        $('#evaluacion').html("");
        $("#evaluacion" ).removeClass( "alert-info alert-success alert-warning" ).addClass( "alert-danger" );
        $('#evaluacion').html("<strong>¡Atención!</strong> Realizas MENOS horas de las debidas. Te faltan " + minutes2hours_str(balance));
    } else {
        //estamos haciendo horas de más debemos compensar horario
        $('#evaluacion').html("");
        $( "#evaluacion" ).removeClass( "alert-info alert-danger alert-success" ).addClass( "alert-warning" );
        $('#evaluacion').html("<strong>¡Atención!</strong> Realizas MÁS horas de las debidas. Te sobran " + minutes2hours_str(balance));
    }

    return true;
}

//minute2hours_str turns any number of minutes into hh:mm format
function minutes2hours_str(minutes_amount){

    //in order to prevent negative values
    minutes_amount = Math.abs(minutes_amount);
    var hours = pad(Math.floor(minutes_amount/60),2);
    var minutes = pad(minutes_amount % 60,2);
    return(hours + ":" + minutes);


}

//pad (string to parse, max zeros)
//add as many 0 as needed until max digits
function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

// Date differences calculator
// return the difference between two dates using the unit indicated as 'datepart'
// http://www.htmlgoodies.com/html5/javascript/calculating-the-difference-between-two-dates-in-javascript.html#fbid=6XgWpf3AF8C
// datepart: 'y', 'm', 'w', 'd', 'h', 'n', 's'
Date.dateDiff = function(datepart, fromdate, todate) {
  datepart = datepart.toLowerCase();
  var diff = todate - fromdate;
  var divideBy = { w:604800000,
                   d:86400000,
                   h:3600000,
                   n:60000,
                   s:1000 };
  var diff_converted = Math.floor( diff/divideBy[datepart]);
  return diff_converted;
};

Date.parseTime = function(time) {

    time_array = time.split(":");
    var date = new Date();
    date.setHours(time_array[0]);
    date.setMinutes(time_array[1]);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
};
