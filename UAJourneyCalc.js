

//inicializador del JS
$(document).ready(function(){

    //inicializar timepickers
    $('#hora_entrada').timepicker({ 
        timeFormat: 'HH:mm ',
        minHour:    7,
        maxHour:    16,
        interval:   5,
        scrollbar:  true,            
        change: function(time) {updateEvent("#hora_entrada",time);}
     });

    $('#hora_fichaje_entrada').timepicker({ 
        timeFormat: 'HH:mm ',
        minHour:    6,
        maxHour:    16,
        interval:   5,
        scrollbar:  true,            
        change: function(time) {updateEvent("#hora_fichaje_entrada",time);}
     });

    $('#hora_salida').timepicker({ 
        timeFormat: 'HH:mm ',
        minHour:    14,
        maxHour:    22,
        interval:   5,
        scrollbar:  true,            
        change: function(time) {updateEvent("#hora_salida",time);}
     });

    $('#hora_fichaje_salida').timepicker({ 
        timeFormat: 'HH:mm ',
        minHour:    13,
        maxHour:    22,
        interval:   5,
        scrollbar:  true,            
        change: function(time) {updateEvent("#hora_fichaje_salida",time);}
     });

    $('#hora_entrada_tarde').timepicker({ 
        timeFormat: 'HH:mm ',
        minHour:    12,
        maxHour:    22,
        interval:   5,
        scrollbar:  true,            
        change: function(time) {updateEvent("#hora_entrada_tarde",time);}
     });

    $('#hora_fichaje_entrada_tarde').timepicker({ 
        timeFormat: 'HH:mm ',
        minHour:    11,
        maxHour:    17,
        interval:   5,
        scrollbar:  true,            
        change: function(time) {updateEvent("#hora_fichaje_entrada_tarde",time);}
     });

    $('#hora_salida_tarde').timepicker({ 
        timeFormat: 'HH:mm ',
        minHour:    18,
        maxHour:    22,
        interval:   5,
        scrollbar:  true,            
        change: function(time) {updateEvent("#hora_salida_tarde",time);}
     });

    $('#hora_fichaje_salida_tarde').timepicker({ 
        timeFormat: 'HH:mm ',
        minHour:    18,
        maxHour:    22,
        interval:   5,
        scrollbar:  true,            
        change: function(time) {updateEvent("#hora_fichaje_salida_tarde",time);}
     });
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
                                hora_fichaje_salida.setMinutes(hora_fichaje_salida.getMinutes() + incremento_salida); 
                                $('#hora_fichaje_salida').val($.format.date(hora_fichaje_salida, "HH:mm"));
                                break;

        case "#hora_fichaje_salida":
                                hora_salida = value; //asignamos antes de restarle el tiempo de fichaje
                                incremento_salida = parseInt($('#incremento_salida').val());
                                hora_salida.setMinutes(hora_salida.getMinutes() - incremento_salida); 
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
        case "#reduccion":
                                break;
        case "#horario_semanal":
                                break;
        case "#descuento_entrada":
                                break;
        case "#descuento_salida":
                                break;
        case "#incremento_salida":
                                break;

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
    
    // 2.
    
    // 1. obtenemos un date de referencia para hacer el cálculo
    var fecha_referencia = new Date(); //pondremos el día de hoy a las 00:00
    fecha_referencia.setHours(0);
    fecha_referencia.setMinutes(0);
    fecha_referencia.setSeconds(0);
    fecha_referencia.setMilliseconds(0);
    
    
    return true;
}

function minutes2hours_str(minutes_amount){
    
    var hours = Math.floor(minutes/60)
    var minutes = minutes % 60
    return(hours & ":" & minutes);
    
    
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
  
  return Math.floor( diff/divideBy[datepart]);
};
