<?php
// задание 1

function func($i){
    do {
        echo $i;
        if($i == 0){
            echo ' - это ноль';
        } else
        if($i % 2 == 0){
            echo ' - четное число';
        } else{
            echo ' - нечетное число';
        };
        echo '<br>';
        $i++;
    } while ($i<=10);
};
func(5);
// задание 2
$regions = [
    "Московская область" => ["Москва", "Зеленоград", "Клин"],
    "Ленинградская область" => ["Санкт-Петербург", "Всеволожск", "Павловск", "Кронштадт"],
    "Рязанская область" => ["Рязань", "Касимов", "Скопин"]
];

foreach ($regions as $region => $cities) {
    echo $region . ":\n";
    echo implode(", ", $cities) . ".\n";
    echo '<br>';
};
// задание 3
function func3($word){
    $translit = [
        'а' => 'a',
        'б' => 'b',
        'в' => 'v',
        'г' => 'g',
        'д' => 'd',
        'е' => 'e',
        'ё' => 'yo',
        'ж' => 'zh',
        'з' => 'z',
        'и' => 'i',
        'й' => 'y',
        'к' => 'k',
        'л' => 'l',
        'м' => 'm',
        'н' => 'n',
        'о' => 'o',
        'п' => 'p',
        'р' => 'r',
        'с' => 's',
        'т' => 't',
        'у' => 'u',
        'ф' => 'f',
        'х' => 'kh',
        'ц' => 'ts',
        'ч' => 'ch',
        'ш' => 'sh',
        'щ' => 'shch',
        'ъ' => '',
        'ы' => 'y',
        'ь' => '',
        'э' => 'e',
        'ю' => 'yu',
        'я' => 'ya'
    ];
    $word2 = mb_strtolower($word);
    $result = strtr($word2, $translit);
    return $result;
};
echo func3('слово помидор');
// задание 4
function func4($mass){
    echo '<ul>';
    foreach($mass as $key => $value){
        if(!is_array($value)){
            echo '<li>';
            echo $value;
            echo '</li>';
            echo '<br>';
        } else{
            echo '<li>';
            echo $key;
            echo '</li>';
            func4($value);
        };
    }
    echo '</ul>';
};
func4($regions);
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?></title>
</head>
<body>
    
</body>
</html>