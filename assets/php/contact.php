<?php
    // ENTER YOUR EMAIL
    $emailTo = "rajarsi3997@gmail.com";
    // ENTER IDENTIFIER
    $emailIdentifier =  "Resume Message";
    if($_POST) {
        $name = addslashes(trim($_POST["name"]));
        $clientEmail = addslashes(trim($_POST["email"]));
        $message = addslashes(trim($_POST["message"]));
        $fhp_input = addslashes(trim($_POST["company"]));
        if(isset($_POST['g-recaptcha-response']))
            $captcha=$_POST['g-recaptcha-response'];
        $array = array("nameMessage" => "", "emailMessage" => "", "messageMessage" => "", "succesMessage" => "");
        if($name == "") {
            $array["nameMessage"] = "x";
        }
        if(!filter_var($clientEmail, FILTER_VALIDATE_EMAIL)) {
            $array["emailMessage"] = "x";
        }
        if($message == "") {
            $array["messageMessage"] = "x";
        }
        if(!$captcha){
            echo "<script type='text/javascript'>alert('Sorry! Please try again!');</script>";
            exit;
        }
        $response = json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6Le7zM0ZAAAAAAzQtQ8WqsAxg8ijee6o_WL62I2h&response=" . $captcha . "&remoteip="  . $_SERVER['REMOTE_ADDR']), true);
        if($name != "" && filter_var($clientEmail, FILTER_VALIDATE_EMAIL) && $message != "" && $fhp_input == "" && $response['success'] == true) {
            $array["succesMessage"] = "";
            $headers  = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            $headers .= "From: " . $clientEmail . "\r\n";
            $headers .= "Reply-To: " . $clientEmail;
            if(!mail($emailTo, $emailIdentifier, $message, $headers)){
                $array["succesMessage"] = "x";
            }
        }
        echo json_encode($array);
    }
?>