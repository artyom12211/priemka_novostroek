<?php

$method = $_SERVER['REQUEST_METHOD'];

//Script Foreach
$c = true;
if ( $method === 'POST' ) {

  $project_name = trim($_POST["project_name"]);

  // ПОЧТА ПОЛУЧАТЕЛЯ
  $admin_email  = 'dezo.ozed@yandex.ru';
  $form_subject = trim($_POST["form_subject"]);

  foreach ( $_POST as $key => $value ) {
    if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
      $message .= "
      " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
        <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
        <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
      </tr>
      ";
    }
  }
} else if ( $method === 'GET' ) {

  $project_name = trim($_GET["project_name"]);
  $admin_email  = trim($_GET["admin_email"]);
  $form_subject = trim($_GET["form_subject"]);

  foreach ( $_GET as $key => $value ) {
    if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
      $message .= "
      " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
        <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
        <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
      </tr>
      ";
    }
  }
}

$message = "<table style='width: 100%;'>$message</table>";

function adopt($text) {
  return '=?UTF-8?B?'.Base64_encode($text).'?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($project_name).' <'.$admin_email.'>' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;

$post_data['clientname'] = isset($_POST['Имя'])?$_POST['Имя']:'';
	$post_data['phone'] = isset($_POST['Телефон'])?$_POST['Телефон']:'';
	$post_data['project_id'] = '32';
	$post_data['note'] = $value;
$post_data['client_ip'] = $_SERVER['REMOTE_ADDR'];
	$post_data['form_page'] = $_SERVER['REQUEST_URI'];
	$url = 'https://expertpriemka.live/leads/api';
	$ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 3);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
   	$string = curl_exec($ch);
mail($admin_email, adopt($form_subject), $message, $headers );
