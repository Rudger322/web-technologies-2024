<?php
$title = "Hello world";
$h1 = "Hello world";
$year = date("Y");
function getCurrentTimeWithDeclension() {
    $hours = (int)date('G');
    $minutes = (int)date('i');

    $hourText = declension($hours, ['час', 'часа', 'часов']);
    $minuteText = declension($minutes, ['минута', 'минуты', 'минут']);

    return "$hours $hourText $minutes $minuteText";
}
echo getCurrentTimeWithDeclension();
function declension($number, $forms) {
    $n = abs($number) % 100;
    $n1 = $n % 10;

    if ($n > 10 && $n < 20) return $forms[2];
    if ($n1 > 1 && $n1 < 5) return $forms[1];
    if ($n1 == 1) return $forms[0];
    return $forms[2];
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?></title>
</head>
<body>
    <h1><?= $h1 ?></h1>
    <p>Текущий год <?= $year ?></p>
    <p>Текущее время <?=  getCurrentTimeWithDeclension()?></p>
</body>
</html>