<?php
$files = glob('./assets/*');
foreach ($files as $file) {
    if (is_file($file)) {
        $img = "./assets/" . basename($file);
        echo '<a href="'.$img.'" target="_blank">';
        echo '<img src="' . $img . '" alt="Фото" style="max-width: 150px; max-height: 150px;">';
        echo '</a>';
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {

        $uploadDir = 'assets/';
        $uploadFile = $uploadDir . basename($_FILES['image']['name']);
        $fileExtension = strtolower(pathinfo($uploadFile, PATHINFO_EXTENSION));
        $fileSize = $_FILES['image']['size'];

        if ($fileSize <= 5 * 1024 * 1024 && in_array($fileExtension, ['jpg', 'gif', 'png'])) {
            if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile)) {
                header("Location: " . $_SERVER['PHP_SELF'] . "?success=1");
                exit();
            } else {
                header("Location: " . $_SERVER['PHP_SELF'] . "?error=move");
                exit();
            }
        } else {
            header("Location: " . $_SERVER['PHP_SELF'] . "?error=upload");
            exit();
        }
    }
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
    <form action="" method="post" enctype="multipart/form-data">
        <label>Загрузить изображение (JPG, PNG, GIF, до 5MB):</label><br>
        <input type="file" name="image" required>
        <button type="submit">Загрузить</button>
    </form>
</body>
</html>