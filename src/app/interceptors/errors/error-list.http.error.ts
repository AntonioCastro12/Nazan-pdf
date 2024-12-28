export const errorListHttp = [
  {
    errorCode: 200,
    errorName: 'OK',
    errorSpanishTranslation: 'Ok',
    errorDef: 'Respuesta estándar para peticiones correctas.',
  },

  {
    errorCode: 201,
    errorName: 'Created',
    errorSpanishTranslation: 'Creado',
    errorDef:
      'La petición ha sido completada y ha resultado en la creación de un nuevo recurso.',
  },

  {
    errorCode: 202,
    errorName: 'Accepted',
    errorSpanishTranslation: 'Aceptado',
    errorDef:
      'La petición ha sido aceptada para procesamiento, pero este no ha sido completado. La petición eventualmente pudiere no ser satisfecha, ya que podría ser no permitida o prohibida cuando el procesamiento tenga lugar.',
  },

  {
    errorCode: 203,
    errorName: 'Non-Authoritative Information (from HTTP/1.1)',
    errorSpanishTranslation:
      'No hay información sobre autorización (desde HTTP/1.1)',
    errorDef:
      'La petición se ha completado con éxito, pero su contenido no se ha obtenido de la fuente originalmente solicitada sino de otro servidor.',
  },

  {
    errorCode: 204,
    errorName: 'No Content',
    errorSpanishTranslation: 'Sin contenido',
    errorDef:
      'La petición se ha completado con éxito pero su respuesta no tiene ningún contenido (la respuesta puede incluir información en sus cabeceras HTTP)',
  },

  {
    errorCode: 205,
    errorName: 'Reset Content',
    errorSpanishTranslation: 'Contenido reseteado',
    errorDef:
      'La petición se ha completado con éxito, pero su respuesta no tiene contenidos y además, el navegador tiene que inicializar la página desde la que se realizó la petición (este código es útil por ejemplo para páginas con formularios cuyo contenido debe borrarse después de que el usuario lo envíe)',
  },

  {
    errorCode: 206,
    errorName: 'Partial Content',
    errorSpanishTranslation: 'Contenido parcial',
    errorDef:
      'La petición servirá parcialmente el contenido solicitado. Esta característica es utilizada por herramientas de descarga como wget para continuar la transferencia de descargas anteriormente interrumpidas, o para dividir una descarga y procesar las partes simultáneamente.',
  },

  {
    errorCode: 207,
    errorName: 'Multi-Status (Multi-Status, WebDAV)',
    errorSpanishTranslation: 'Multi-Status (Multi-Status, WebDAV)',
    errorDef:
      'El cuerpo del mensaje que sigue es un mensaje XML y puede contener algún número de códigos de respuesta separados, dependiendo de cuántas sub-peticiones sean hechas.',
  },

  {
    errorCode: 208,
    errorName: 'Already Reported (WebDAV)',
    errorSpanishTranslation: 'Fue reportado (WebDAV)',
    errorDef:
      'El listado de elementos DAV ya se notificó previamente, por lo que no se van a volver a listar.',
  },

  /**************
  3xx: Redirecciones
  El cliente tiene que tomar una acción adicional para completar la petición.
  Esta clase de código de estado indica que una acción subsecuente necesita efectuarse por el agente de usuario para completar la petición. La acción requerida puede ser llevada a cabo por el agente de usuario sin interacción con el usuario si y solo si el método utilizado en la segunda petición es GET o HEAD. El agente de usuario no debe redirigir automáticamente una petición más de 5 veces, dado que tal funcionamiento indica usualmente un Bucle infinito.
  ***************/

  {
    errorCode: 300,
    errorName: 'Multiple Choices',
    errorSpanishTranslation: 'Multiples opciones',
    errorDef:
      'Indica opciones múltiples para el URI que el cliente podría seguir. Esto podría ser utilizado, por ejemplo, para presentar distintas opciones de formato para video, listar archivos con distintas extensiones o word sense disambiguation.',
  },

  {
    errorCode: 301,
    errorName: 'Moved Permanently',
    errorSpanishTranslation: 'Movido permanentemente',
    errorDef:
      'Esta y todas las peticiones futuras deberían ser dirigidas a la URL dada.',
  },

  {
    errorCode: 302,
    errorName: 'Found (before Moved Temporarily)',
    errorSpanishTranslation: 'Encontrado (antes movido temporalmente)',
    errorDef:
      'Este es el código de redirección más popular, pero también un ejemplo de las prácticas de la industria contradiciendo el estándar. La especificación HTTP/1.0 (RFC 1945) requería que el cliente realizara una redirección temporal (la frase descriptiva original fue Moved Temporarily), pero los navegadores populares lo implementaron como 303 See Other. Por tanto, HTTP/1.1 añadió códigos de estado 303 y 307 para eliminar la ambigüedad entre ambos comportamientos. Sin embargo, la mayoría de aplicaciones web y bibliotecas de desarrollo aún utilizan el código de respuesta 302 como si fuera el 303.',
  },

  {
    errorCode: 303,
    errorName: 'See Other (from HTTP/1.1)',
    errorSpanishTranslation: 'Ver otras (desde HTTP/1.1)',
    errorDef:
      'La respuesta a la petición puede ser encontrada bajo otra URI utilizando el método GET.',
  },

  {
    errorCode: 304,
    errorName: 'Not Modified',
    errorSpanishTranslation: 'Sin modificar',
    errorDef:
      'Indica que la petición a la URL no ha sido modificada desde que fue requerida por última vez. Típicamente, el cliente HTTP provee un encabezado como If-Modified-Since para indicar una fecha y hora contra la cual el servidor pueda comparar. El uso de este encabezado ahorra ancho de banda y reprocesamiento tanto del servidor como del cliente.',
  },

  {
    errorCode: 305,
    errorName: 'Use Proxy (from HTTP/1.1)',
    errorSpanishTranslation: 'Usar Proxy (desde HTTP/1.1)',
    errorDef:
      'Muchos clientes HTTP (como Mozilla3​ e Internet Explorer) no se apegan al estándar al procesar respuestas con este código, principalmente por motivos de seguridad.',
  },

  {
    errorCode: 306,
    errorName: 'Switch Proxy',
    errorSpanishTranslation: 'Cambiar Proxy',
    errorDef:
      'Este código se utilizaba en las versiones antiguas de HTTP pero ya no se usa (aunque está reservado para usos futuros)',
  },

  {
    errorCode: 307,
    errorName: 'Temporary Redirect (from HTTP/1.1)',
    errorSpanishTranslation: 'Redirigido temporalmente (desde HTTP/1.1)',
    errorDef:
      'Se trata de una redirección que debería haber sido hecha con otra URI, sin embargo aún puede ser procesada con la URI proporcionada. En contraste con el código 303, el método de la petición no debería ser cambiado cuando el cliente repita la solicitud. Por ejemplo, una solicitud POST tiene que ser repetida utilizando otra petición POST.',
  },

  {
    errorCode: 308,
    errorName: 'Permanent Redirect',
    errorSpanishTranslation: 'Redirigido permanentemente',
    errorDef:
      'El recurso solicitado por el navegador se encuentra en otro lugar y este cambio es permanente. A diferencia del código 301, no se permite cambiar el método HTTP para la nueva petición (así por ejemplo, si envías un formulario a un recurso que ha cambiado de lugar, todo seguirá funcionando bien)​',
  },

  /**************

  4xx: Errores del cliente

  El error 404 en Wikipedia
  La solicitud contiene sintaxis incorrecta o no puede procesarse.

  La intención de la clase de códigos de respuesta 4xx es para casos en los cuales el cliente parece haber errado la petición. Excepto cuando se responde a una petición HEAD, el servidor debe incluir una entidad que contenga una explicación a la situación de error, y si es una condición temporal o permanente. Estos códigos de estado son aplicables a cualquier método de solicitud (como GET o POST). Los agentes de usuario deben desplegar cualquier entidad al usuario. Estos son típicamente los códigos de respuesta de error más comúnmente encontrados.

   ***************/

  {
    errorCode: 400,
    errorName: 'Bad Request',
    errorSpanishTranslation: 'Mala petición',
    errorDef:
      'El servidor no procesará la solicitud, porque no puede, o no debe, debido a algo que es percibido como un error del cliente (ej: solicitud malformada, sintaxis errónea, etc). La solicitud contiene sintaxis errónea y no debería repetirse.',
  },

  {
    errorCode: 401,
    errorName: 'Unauthorized​',
    errorSpanishTranslation: 'Sin autorización',
    errorDef:
      'Similar al 403, errorName:  Forbidden, pero específicamente para su uso cuando la autentificación es posible pero ha fallado o aún no ha sido provista. Vea autenticación HTTP básica y Digest auth authentication.',
  },

  {
    errorCode: 402,
    errorName: 'Payment Required',
    errorSpanishTranslation: 'Se requiere un pago',
    errorDef:
      'La intención original era que este código pudiese ser usado como parte de alguna forma o esquema de Dinero electrónico o micropagos, pero eso no sucedió, y este código nunca se utilizó.',
  },

  {
    errorCode: 403,
    errorName: 'Forbidden',
    errorSpanishTranslation: 'Prohibido',
    errorDef:
      'La solicitud fue legal, pero el servidor rehúsa responderla dado que el cliente no tiene los privilegios para realizarla. En contraste a una respuesta 401 No autorizado, autenticarse previamente no va a cambiar la respuesta.',
  },

  {
    errorCode: 404,
    errorName: 'Not Found',
    errorSpanishTranslation: 'No fue encontrado',
    errorDef:
      'Recurso no encontrado. Se utiliza cuando el servidor web no encuentra la página o recurso solicitado.',
  },

  {
    errorCode: 405,
    errorName: 'Method Not Allowed',
    errorSpanishTranslation: 'Método no permitido',
    errorDef:
      'Una petición fue hecha a una URI utilizando un método de solicitud no soportado por dicha URI; por ejemplo, cuando se utiliza GET en un formulario que requiere que los datos sean presentados vía POST, o utilizando PUT en un recurso de solo lectura.',
  },

  {
    errorCode: 406,
    errorName: 'Not Acceptable',
    errorSpanishTranslation: 'No es aceptable',
    errorDef:
      "El servidor no es capaz de devolver los datos en ninguno de los formatos aceptados por el cliente, indicados por éste en la cabecera 'Accept' de la petición.",
  },

  {
    errorCode: 407,
    errorName: 'Proxy',
    errorSpanishTranslation: 'Proxy',
    errorDef: 'Authentication Required',
  },

  {
    errorCode: 408,
    errorName: 'Tiempo fuera para la petición',
    errorSpanishTranslation: 'text',
    errorDef:
      'El cliente falló al continuar la petición - excepto durante la ejecución de videos Adobe Flash cuando solo significa que el usuario cerró la ventana de video o se movió a otro.',
  },

  {
    errorCode: 409,
    errorName: 'Conflict',
    errorSpanishTranslation: 'Conflicto',
    errorDef:
      'Indica que la solicitud no pudo ser procesada debido a un conflicto con el estado actual del recurso que esta identifica.',
  },

  {
    errorCode: 410,
    errorName: 'Gone',
    errorSpanishTranslation: 'Se fue',
    errorDef:
      'Indica que el recurso solicitado ya no está disponible y no lo estará de nuevo. Debería ser utilizado cuando un recurso ha sido quitado de forma permanente.Si un cliente recibe este código no debería volver a solicitar el recurso en el futuro. Por ejemplo un buscador lo eliminará de sus índices y lo hará más rápidamente que utilizando un código 404.',
  },

  {
    errorCode: 411,
    errorName: 'Length Required',
    errorSpanishTranslation: 'Se requiere una longitud',
    errorDef:
      'El servidor rechaza la petición del navegador porque no incluye la cabecera Content-Length adecuada.',
  },

  {
    errorCode: 412,
    errorName: 'Precondition Failed',
    errorSpanishTranslation: 'La condición previa falló',
    errorDef:
      'El servidor no es capaz de cumplir con algunas de las condiciones impuestas por el navegador en su petición.',
  },

  {
    errorCode: 413,
    errorName: 'Request Entity Too Large',
    errorSpanishTranslation: 'La petición de entrada es muy larga',
    errorDef:
      'La petición del navegador es demasiado grande y por ese motivo el servidor no la procesa.',
  },

  {
    errorCode: 414,
    errorName: 'Request-URI Too Long',
    errorSpanishTranslation: 'El URI de la petición es muy largo',
    errorDef:
      'La URI de la petición del navegador es demasiado grande y por ese motivo el servidor no la procesa (esta condición se produce en muy raras ocasiones y casi siempre porque el navegador envía como GET una petición que debería ser POST).',
  },

  {
    errorCode: 415,
    errorName: 'Unsupported Media Type',
    errorSpanishTranslation: 'Tipo de medio no esta soportado',
    errorDef:
      'La petición del navegador tiene un formato que no entiende el servidor y por eso no se procesa.',
  },

  {
    errorCode: 416,
    errorName: 'Requested Range Not Satisfiable',
    errorSpanishTranslation: 'El rango de la petición no se puede satisfacer',
    errorDef:
      'El cliente ha preguntado por una parte de un archivo, pero el servidor no puede proporcionar esa parte, por ejemplo, si el cliente preguntó por una parte de un archivo que está más allá de los límites del fin del archivo.',
  },

  {
    errorCode: 417,
    errorName: 'Expectation Failed',
    errorSpanishTranslation: 'La expectativa fallo',
    errorDef:
      'La petición del navegador no se procesa porque el servidor no es capaz de cumplir con los requerimientos de la cabecera Expect de la petición.',
  },

  {
    errorCode: 418,
    errorName: 'I am a teapot',
    errorSpanishTranslation: 'Soy una tetera',
    errorDef:
      'Soy una tetera. Este código fue definido en 1998 como una inocentada, en el Protocolo de Transmisión de Hipertexto de Cafeteras (RFC-2324). No se espera que los servidores web implementen realmente este código de error, pero es posible encontrar sitios que devuelvan este código HTTP.',
  },

  {
    errorCode: 422,
    errorName: 'Unprocessable Entity (WebDAV - RFC 4918)',
    errorSpanishTranslation: 'Entidad improcesable (WebDAV - RFC 4918)',
    errorDef:
      'La solicitud está bien formada pero fue imposible seguirla debido a errores semánticos.',
  },

  {
    errorCode: 423,
    errorName: 'Locked (WebDAV - RFC 4918)',
    errorSpanishTranslation: 'Bloqueado (WebDAV - RFC 4918)',
    errorDef: 'El recurso al que se está teniendo acceso está bloqueado.',
  },

  {
    errorCode: 424,
    errorName: 'Failed Dependency (WebDAV) (RFC 4918)',
    errorSpanishTranslation: 'Dependencia fallida (WebDAV) (RFC 4918)',
    errorDef: 'La solicitud falló debido a una falla en la solicitud previa.',
  },

  {
    errorCode: 425,
    errorName: 'Unassigned',
    errorSpanishTranslation: 'Sin asignar',
    errorDef:
      'Definido en los drafts de WebDav Advanced Collections, pero no está presente en Web Distributed Authoring and Versioning (WebDAV) Ordered Collections Protocol (RFC 3648).',
  },

  {
    errorCode: 426,
    errorName: 'Upgrade Required (RFC 7231)',
    errorSpanishTranslation: 'Se requiere actualización',
    errorDef: 'El cliente debería cambiarse a TLS/1.0.',
  },

  {
    errorCode: 428,
    errorName: 'Precondition Required',
    errorSpanishTranslation: 'Se requiere condición previa',
    errorDef:
      'El servidor requiere que la petición del navegador sea condicional (este tipo de peticiones evitan los problemas producidos al modificar con PUT un recurso que ha sido modificado por otra parte).',
  },

  {
    errorCode: 429,
    errorName: 'Too Many Requests',
    errorSpanishTranslation: 'Demasiadas peticiones',
    errorDef: 'Hay muchas conexiones desde esta dirección de internet.',
  },

  {
    errorCode: 431,
    errorName: 'Request Header Fields Too Large',
    errorSpanishTranslation: 'Los campos del encabezado son muy largos',
    errorDef:
      ' El servidor no puede procesar la petición porque una de las cabeceras de la petición es demasiado grande. Este error también se produce cuando la suma del tamaño de todas las peticiones es demasiado grande.',
  },

  {
    errorCode: 449,
    errorName: 'Unavailable Microsoft',
    errorSpanishTranslation: 'No disponible Microsoft',
    errorDef:
      'Una extensión de Microsoft: La petición debería ser reintentada después de hacer la acción apropiada.',
  },

  {
    errorCode: 451,
    errorName: 'Unavailable for Legal Reasons',
    errorSpanishTranslation: 'No disponible por razones legales',
    errorDef:
      ' El contenido ha sido eliminado como consecuencia de una orden judicial o sentencia emitida por un tribunal.',
  },

  /**************
    5xx: Errores de servidor
    El servidor falló al completar una solicitud aparentemente válida.

    Los códigos de respuesta que comienzan con el dígito "5" indican casos en los cuales el servidor tiene registrado aún antes de servir la solicitud, que está errado o es incapaz de ejecutar la petición. Excepto cuando está respondiendo a un método HEAD, el servidor debe incluir una entidad que contenga una explicación de la situación de error, y si es una condición temporal o permanente. Los agentes de usuario deben desplegar cualquier entidad incluida al usuario. Estos códigos de respuesta son aplicables a cualquier método de petición.
    **************/

  {
    errorCode: 500,
    errorName: 'Internal Server Error',
    errorSpanishTranslation: 'Error interno del servidor',
    errorDef:
      'Es un código comúnmente emitido por aplicaciones empotradas en servidores web, mismas que generan contenido dinámicamente, por ejemplo aplicaciones montadas en IIS o Tomcat, cuando se encuentran con situaciones de error ajenas a la naturaleza del servidor web.',
  },

  {
    errorCode: 501,
    errorName: 'Not Implemented',
    errorSpanishTranslation: 'No fué implementado',
    errorDef:
      'El servidor no soporta alguna funcionalidad necesaria para responder a la solicitud del navegador (como por ejemplo el método utilizado para la petición).',
  },

  {
    errorCode: 502,
    errorName: 'Bad Gateway',
    errorSpanishTranslation: 'La pasarela esta mala',
    errorDef:
      'El servidor está actuando de proxy o gateway y ha recibido una respuesta inválida del otro servidor, por lo que no puede responder adecuadamente a la petición del navegador.',
  },

  {
    errorCode: 503,
    errorName: 'Service Unavailable',
    errorSpanishTranslation: 'Servicio no disponible',
    errorDef:
      'El servidor no puede responder a la petición del navegador porque está congestionado o está realizando tareas de mantenimiento.',
  },

  {
    errorCode: 504,
    errorName: 'Gateway Timeout',
    errorSpanishTranslation: 'Tiempo fuera de la pasarela',
    errorDef:
      'El servidor está actuando de proxy o gateway y no ha recibido a tiempo una respuesta del otro servidor, por lo que no puede responder adecuadamente a la petición del navegador.',
  },

  {
    errorCode: 505,
    errorName: 'HTTP Version Not Supported',
    errorSpanishTranslation: 'La version de HTTP no está soportada',
    errorDef:
      'El servidor no soporta o no quiere soportar la versión del protocolo HTTP utilizada en la petición del navegador.',
  },

  {
    errorCode: 506,
    errorName: 'Variant Also Negotiates (RFC 2295)',
    errorSpanishTranslation: 'La variante tambien negocia (RFC 2295)',
    errorDef:
      'El servidor ha detectado una referencia circular al procesar la parte de la negociación del contenido de la petición.',
  },

  {
    errorCode: 507,
    errorName: 'Insufficient Storage (WebDAV - RFC 4918)',
    errorSpanishTranslation:
      'Espacio insuficiente de almacenamiento (WebDAV - RFC 4918)',
    errorDef:
      'El servidor no puede crear o modificar el recurso solicitado porque no hay suficiente espacio de almacenamiento libre.',
  },

  {
    errorCode: 508,
    errorName: 'Loop Detected (WebDAV)',
    errorSpanishTranslation: 'Se ha detectado un bucle infinito (WebDAV)',
    errorDef:
      'La petición no se puede procesar porque el servidor ha encontrado un bucle infinito al intentar procesarla.',
  },

  {
    errorCode: 509,
    errorName: 'Bandwidth Limit Exceeded',
    errorSpanishTranslation: 'Se ha excedido el límite de ancho de banda',
    errorDef:
      'Límite de ancho de banda excedido. Este código de estatus, a pesar de ser utilizado por muchos servidores, no es oficial.',
  },

  {
    errorCode: 510,
    errorName: 'Not Extended (RFC 2774)',
    errorSpanishTranslation: 'No se ha extendido (RFC 2774)',
    errorDef:
      'La petición del navegador debe añadir más extensiones para que el servidor pueda procesarla.',
  },

  {
    errorCode: 511,
    errorName: 'Network Authentication Required',
    errorSpanishTranslation: 'Se requiere la autenticación de la red',
    errorDef:
      'El navegador debe autenticarse para poder realizar peticiones (se utiliza por ejemplo con los portales cautivos que te obligan a autenticarte antes de empezar a navegar)',
  },

  {
    errorCode: 512,
    errorName: 'Not updated',
    errorSpanishTranslation: 'No ha sido actualizado',
    errorDef:
      'Este error prácticamente es inexistente en la red, pero indica que el servidor está en una operación de actualizado y no puede tener conexión.',
  },

  {
    errorCode: 521,
    errorName: 'Version Mismatch',
    errorSpanishTranslation: 'Version no compatible',
    errorDef:
      'Este error sale cuando la versión no es compatible con tu hardware',
  },
];
