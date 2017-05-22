UA Journey Calculator
=====================

Calculadora de la jornada laboral para PAS de la UA
http://github.com/gonzalo/UAJourneyCalc

Creado y mantenido por Gonzalo Cao Cabeza de Vaca
Feedback y comentarios a gonzalo.cao(at)gmail.com

Pruébalo on line
----------------
http://gonzalo.github.io/UAJourneyCalc/

Uso
---
Lo más fácil es que accedas a la dirección que te indico más arriba pero si lo prefieres hacer en local descarga la aplicación donde quieras y abre con tu navegador preferido el archivo index.html

Changelog
---------
2017/05/22 - v0.6b
Retomando el proyecto. Quiero cambiar la mecánica en la que se obtienen los datos. El objetivo es indicar cuál es la hora a la que deseas entrar o salir y que el programa te diga cuáles son el resto de horas para que te cuandren los horarios.

2014/06/18 - v0.6
Ahora se puede calcular la jornada tanto si eres de turno de mañana
como de tarde. Cambios estéticos.

2014/06/11 - v0.5
Primera versión funcional. Permite parametrizar las horas de entrada y salida
y las supone iguales para todos los días de la semana. Sólo sirve para horarios
de mañana puesto que supone que sólo se trabaja una tarde.
Realiza los ajustes correspondientes en caso de reducción horaria y ofrece
una evaluación indicando si se cumplen las horas adecuadamente.

Pendiente
---------
Al hacer cualquier cambio en una de los selectores (hora de entrada real, hora de entrada fichada, hora de salida real, hora de salida fichada) el resto de selectores se deben actualizar automáticamente con las horas correpondientes para que el saldo final sea 0. Sólo mantenemos fijos los de tarde (si estámos haciendo turno de mañana) y viceversa. 

LICENSE AND DISCLAIMER
----------------------

Esta aplicación NO ES OFICIAL. Sólo un ejercicio para ayudarte a calcular
las horas de entrada y salida del trabajo. Intento que coincida con los
criterios que establece la UA pero si quieres asegurarte comprueba a través
de tu campus virtual que está cumpliendo tus horas.

Por lo demás...

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
