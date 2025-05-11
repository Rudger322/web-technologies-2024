<?php
$host = 'MySql-8.0';
$db   = 'mysql';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    echo 'Ошибка подключения: ' . $e->getMessage();
    exit;
}

$stmt = $pdo->query('SELECT id, text, par_id FROM menu');
$items = $stmt->fetchAll();

function buildTree(array $elements) {
    $tree = [];
    $map = [];
    foreach ($elements as $el) {
        $el['children'] = [];
        $map[$el['id']] = $el;
    }
    foreach ($map as $id => &$node) {
        if ($node['par_id'] === null) {
            $tree[] = &$node;
        } else {
            $map[$node['par_id']]['children'][] = &$node;
        }
    }
    return $tree;
}

$tree = buildTree($items);

function renderTree(array $nodes) {
    $html = '<ul class="menu">';
    foreach ($nodes as $node) {
        $cls = empty($node['children']) ? '' : ' has-children';
        $html .= "<li class=\"menu-item{$cls}\">"
              .   htmlspecialchars($node['text']);
        if (!empty($node['children'])) {
            $html .= renderTree($node['children']);
        }
        $html .= '</li>';
    }
    $html .= '</ul>';
    return $html;
}

$tree = buildTree($items);
?><!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Меню (SSR + JS)</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav id="menu-container">
    <?php echo renderTree($tree); ?>
  </nav>

  <script src="script.js"></script>
</body>
</html>