<?php
ini_set('xdebug.default_enable', false);
ini_set('html_errors', false);
// Si recibe informacion por el metodo POST...
if (isset($_POST)) {
    // Omite los reportes de errores y solo nos entregaría (en este caso) nuestra programacion en el error
    error_reporting(0);

    // Variables del formularios
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $comments = $_POST["comments"];

    // Guarda la url del domminio con la variable $_SERVER 
    $domain = $_SERVER["HTTP_HOST"];
    $to = "gunsnroses.2617@gmail.com";
    $subject_mail = "Contacto desde el formulario del sitio $domain";
    $message = "
    <p>
    Datos enviados desde el formulario del sitio <b>$domain</b>
    </p>
    <ul>
        <li>Nombre: <b>$name</b></li>
        <li>Email: <b>$email</b></li>
        <li>Asunto:$subject</li>
        <li>Comentarios:$comments</li>
    </ul>
    ";
    // 1 Especifica el tipo de MIME (MIME Types), especifica el tipo de contenido en el envio de un correo electronico
    // 2 Especificado el tipo de envio
    // 3 Evita que llegue a la carpeta de span
    $headers = "MIME-Version: 1.0\r\n" .
        "Content-Type: text/html; charset=uft-8\r\n" .
        "From: Envío Automatico No Responder <no-reply@$domain>";

    // Funcion para ejecutar un mail
    // Recibe los siguientes parametros
    $send_mail = mail($to, $subject_mail, $message, $headers);

    if ($send_mail) {
        $res = [
            "err" => false,
            "message" => "Tus datos han sido enviados"
        ];
    } else {
        $res = [
            "err" => true,
            "message" => "Error al enviar tus datos, intenta nuevamente"
        ];
    }
    header('Access-Control-Allow-Origin: *'); // Otorga el permiso a todos los sitios
    // header('Access-Control-Allow-Origin: https://jonmirhca.com'); // Otorga el permiso a sitios especificos
    header('Content-type:application/json');
    echo json_encode($res);
}
