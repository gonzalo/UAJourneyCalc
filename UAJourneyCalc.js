

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
}
