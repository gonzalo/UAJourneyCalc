

//inicializador del JS
$(document).ready(function () {
    

    //valores por defecto de los inputs
    $("#jornada_normal").val("7:38");
    $("#dias_habiles").val(5);
    $("#reduccion").append('<option value="0" selected="selected">Ninguna</option>');
    $("#reduccion").append('<option value="38">38 min.</option>');
    $("#reduccion").append('<option value="60">1 h.</option>');
    $("#reduccion").append('<option value="98">1 h. 38 min.</option>');
    $("#descuento_entrada").val(15);
    $("#incremento_salida").val(10);

    $("#hora_entrada").val("08:00");
    $("#hora_fichaje_entrada").val("8:15"); //OJO que coincida con hora_entrada+descuento_entrada
    $("#hora_salida").val("15:00");
    $("#hora_fichaje_salida").val("14:50");  //OJO que coincida con hora_salida-descuento_salida

    $("#realiza_tarde").append('<option value="1" selected="selected">Sí</option>');
    $("#realiza_tarde").append('<option value="">No</option>');
    $("#hora_entrada_tarde").val("16:00");
    $("#hora_fichaje_entrada_tarde").val("16:15"); //OJO que coincida con hora_entrada+descuento_entrada
    $("#hora_salida_tarde").val("18:30");
    $("#hora_fichaje_salida_tarde").val("18:20");  //OJO que coincida con hora_salida-descuento_salida
    
    //inicializar los disparadaores en los inputs básicos
    $("#jornada_normal").change(function () {updateEvent("#jornada_normal"); });
    $("#dias_habiles").change(function () {updateEvent("#dias_habiles"); });
    $("#reduccion").change(function () {updateEvent("#reduccion"); });
    $("#descuento_entrada").change(function () {updateEvent("#descuento_entrada"); });
    $("#incremento_salida").change(function () {updateEvent("#descuento_salida"); });
    $("#realiza_tarde").change(function () {updateEvent("#realiza_tarde"); });

    //inicializar timepickers
    $('#hora_entrada').timepicker({ 
        timeFormat: 'HH:mm',
        minHour:    7,
        maxHour:    16,
        interval:   5,
        scrollbar:  true,            
        change: function (time) {updateEvent("#hora_entrada", time); }
     });

    $('#hora_fichaje_entrada').timepicker({ 
        timeFormat: 'HH:mm',
        minHour:    6,
        maxHour:    16,
        interval:   5,
        scrollbar:  true,            
        change: function (time) {updateEvent("#hora_fichaje_entrada", time); }
     });

    $('#hora_salida').timepicker({ 
        timeFormat: 'HH:mm',
        minHour:    14,
        maxHour:    22,
        interval:   5,
        scrollbar:  true,            
        change: function (time) {updateEvent("#hora_salida", time); }
     });

    $('#hora_fichaje_salida').timepicker({ 
        timeFormat: 'HH:mm',
        minHour:    13,
        maxHour:    22,
        interval:   5,
        scrollbar:  true,            
        change: function (time) {updateEvent("#hora_fichaje_salida", time); }
     });

    $('#hora_entrada_tarde').timepicker({ 
        timeFormat: 'HH:mm',
        minHour:    12,
        maxHour:    22,
        interval:   5,
        scrollbar:  true,            
        change: function (time) {updateEvent("#hora_entrada_tarde", time); }
     });

    $('#hora_fichaje_entrada_tarde').timepicker({ 
        timeFormat: 'HH:mm',
        minHour:    11,
        maxHour:    17,
        interval:   5,
        scrollbar:  true,            
        change: function (time) {updateEvent("#hora_fichaje_entrada_tarde", time); }
     });

    $('#hora_salida_tarde').timepicker({ 
        timeFormat: 'HH:mm',
        minHour:    18,
        maxHour:    22,
        interval:   5,
        scrollbar:  true,            
        change: function (time) {updateEvent("#hora_salida_tarde", time); }
     });

    $('#hora_fichaje_salida_tarde').timepicker({ 
        timeFormat: 'HH:mm',
        minHour:    18,
        maxHour:    22,
        interval:   5,
        scrollbar:  true,            
        change: function (time) {updateEvent("#hora_fichaje_salida_tarde", time); }
     });
    
    //lo último que hacemos es actualizar todos los valores
    updateResults();
});

//manejador de los eventos que se generan al hacer click en los inputs
function updateEvent(caller_id, value){

    //TODO validate inputs

    //alert( caller_id + " llamó a updateEvent con el valor " + value);
    switch (caller_id) {
        case "#hora_entrada":   //hora_entrada actualizada
                                hora_fichaje_entrada = value; //asignamos antes de restarle el tiempo de fichaje
                                descuento_entrada = parseInt($('#descuento_entrada').val());
                                hora_fichaje_entrada.setMinutes(hora_fichaje_entrada.getMinutes() + descuento_entrada); 
                                $('#hora_fichaje_entrada').val($.format.date(hora_fichaje_entrada, "HH:mm"));
                                break;
        case "#hora_fichaje_entrada":
                                hora_entrada = value; //asignamos antes de restarle el tiempo de fichaje
                                descuento_entrada = parseInt($('#descuento_entrada').val());
                                hora_entrada.setMinutes(hora_entrada.getMinutes() - descuento_entrada); 
                                $('#hora_entrada').val($.format.date(hora_entrada, "HH:mm"));
                                break;
        case "#hora_salida":    
                                hora_fichaje_salida = value; //asignamos antes de restarle el tiempo de fichaje
                                incremento_salida = parseInt($('#incremento_salida').val());
                                hora_fichaje_salida.setMinutes(hora_fichaje_salida.getMinutes() - incremento_salida); 
                                $('#hora_fichaje_salida').val($.format.date(hora_fichaje_salida, "HH:mm"));
                                break;

        case "#hora_fichaje_salida":
                                hora_salida = value; //asignamos antes de restarle el tiempo de fichaje
                                incremento_salida = parseInt($('#incremento_salida').val());
                                hora_salida.setMinutes(hora_salida.getMinutes() + incremento_salida); 
                                $('#hora_salida').val($.format.date(hora_salida, "HH:mm"));
                                break;
        case "#hora_entrada_tarde":   
                                hora_fichaje_entrada_tarde = value; //asignamos antes de restarle el tiempo de fichaje
                                descuento_entrada = parseInt($('#descuento_entrada').val());
                                hora_fichaje_entrada_tarde.setMinutes(hora_fichaje_entrada_tarde.getMinutes() + descuento_entrada); 
                                $('#hora_fichaje_entrada_tarde').val($.format.date(hora_fichaje_entrada_tarde, "HH:mm"));
                                break;
        case "#hora_fichaje_entrada_tarde":
                                hora_entrada_tarde = value; //asignamos antes de restarle el tiempo de fichaje
                                descuento_entrada = parseInt($('#descuento_entrada').val());
                                hora_entrada_tarde.setMinutes(hora_entrada_tarde.getMinutes() - descuento_entrada); 
                                $('#hora_entrada_tarde').val($.format.date(hora_entrada_tarde, "HH:mm"));
                                break;
        case "#hora_salida_tarde":    
                                hora_fichaje_salida_tarde = value; //asignamos antes de restarle el tiempo de fichaje
                                incremento_salida = parseInt($('#incremento_salida').val());
                                hora_fichaje_salida_tarde.setMinutes(hora_fichaje_salida_tarde.getMinutes() + incremento_salida); 
                                $('#hora_fichaje_salida_tarde').val($.format.date(hora_fichaje_salida_tarde, "HH:mm"));
                                break;

        case "#hora_fichaje_salida_tarde":
                                hora_salida_tarde = value; //asignamos antes de restarle el tiempo de fichaje
                                incremento_salida = parseInt($('#incremento_salida').val());
                                hora_salida_tarde.setMinutes(hora_salida_tarde.getMinutes() - incremento_salida); 
                                $('#hora_salida_tarde').val($.format.date(hora_salida_tarde, "HH:mm"));
                                break;
        case "#realiza_tarde":
                                if ($("#realiza_tarde").val()==1){
                                    $("#hora_entrada_tarde").prop("disabled",false);
                                    $("#hora_fichaje_entrada_tarde").prop("disabled",false);
                                    $("#hora_salida_tarde").prop("disabled",false);
                                    $("#hora_fichaje_salida_tarde").prop("disabled",false);
                                    $("#horas_tarde").prop("disabled",false);
                                } else {
                                    $("#hora_entrada_tarde").prop("disabled",true);
                                    $("#hora_fichaje_entrada_tarde").prop("disabled",true);
                                    $("#hora_salida_tarde").prop("disabled",true);
                                    $("#hora_fichaje_salida_tarde").prop("disabled",true);
                                    $("#horas_tarde").prop("disabled",true);
                                }
    }
    
    //después de actualizados los valores correspondientes calculamos los tiempos
    updateResults();
}

function updateResults(){
    //calculamos el número de minutos que debes cumplir semanalmente
    
    // 1. convertimos horario a minutos y lo ponemos en la salida correspondiente
    var jornada_array = $('#jornada_normal').val().split(":");
    var n_dias = parseInt($('#dias_habiles').val());
    var reduccion = parseInt($('#reduccion').val());
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
    // 2.1 Calculamos el número de minutos de mañana
    
    var hora_entrada = Date.parseTime( $('#hora_entrada').val());
    var hora_salida =  Date.parseTime( $('#hora_salida').val());
    var total_minutos_manyana = Date.dateDiff("n",hora_entrada,hora_salida)*n_dias;
    
    $('#horas_manyana').val(minutes2hours_str(total_minutos_manyana));
    
    balance -= total_minutos_manyana;
    
    // 2.2 Calculamos el número de minutos de mañana
    
    var total_minutos_tarde = 0;
    if ($("#realiza_tarde").val()==1){
        hora_entrada = Date.parseTime( $('#hora_entrada_tarde').val());
        hora_salida =  Date.parseTime( $('#hora_salida_tarde').val());
        total_minutos_tarde = Date.dateDiff("n",hora_entrada,hora_salida);
    }
    
    $('#horas_tarde').val(minutes2hours_str(total_minutos_tarde));
    
    // 3. Calculamos el balance de horas
    var balance = total_minutos_semanales - total_minutos_manyana - total_minutos_tarde;

    $('#balance_horas').val(minutes2hours_str(balance));
    
    // 4. Analizamos los resultados
    
    if (balance==0){
        //Cumplimos perfectamente con el horario
        $('#evaluacion').html("Cumples exactamente con el horario establecido");
    }else if (balance>0){
        //estamos haciendo horas de menos debemos compensar horario
        $('#evaluacion').html("Realizas MENOS horas de las debidas. Te faltan " + minutes2hours_str(balance));
    } else {
        //estamos haciendo horas de más debemos compensar horario
        $('#evaluacion').html("Realizas MÁS horas de las debidas. Te sobran " + minutes2hours_str(balance));
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