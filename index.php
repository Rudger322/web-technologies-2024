<?php
$host = 'MySql-8.0';
$db   = 'cataloge';
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

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['goods_id'], $_POST['user'], $_POST['text'])) {
    $stmt = $pdo->prepare('INSERT INTO reviews (goods_id, user, text) VALUES (:goods_id, :user, :text)');
    $stmt->execute([
        ':goods_id' => (int)$_POST['goods_id'],
        ':user'     => trim($_POST['user']),
        ':text'     => trim($_POST['text']),
    ]);
    header('Location: ' . $_SERVER['REQUEST_URI']);
    exit;
}

$stmt = $pdo->query('SELECT id, title, image, price, description FROM goods');
$items = $stmt->fetchAll();

$rvStmt = $pdo->query('SELECT goods_id, user, text FROM reviews ORDER BY id DESC');
$allReviews = $rvStmt->fetchAll();
$reviewsByGoods = [];
foreach ($allReviews as $r) {
    $reviewsByGoods[$r['goods_id']][] = [
        'user' => $r['user'],
        'text' => $r['text'],
    ];
}

$productsJs = array_map(function($item) use ($reviewsByGoods) {
    return [
        'id'          => $item['id'],
        'title'       => $item['title'],
        'image'       => $item['image'] ? base64_encode($item['image']) : null,
        'price'       => $item['price'],
        'description' => $item['description'],
        'reviews'     => $reviewsByGoods[$item['id']] ?? [],
    ];
}, $items);

function buildTree(array $elements) {
    foreach ($elements as &$element) {
        $element['children'] = [];
    }
    return $elements;
}

function renderCatalog(array $nodes) {
    if (empty($nodes)) return;
    echo '<ul class="catalog">';
    foreach ($nodes as $node) {
        echo '<li class="catalog-item" data-id="' . htmlspecialchars($node['id']) . '">';
        echo '<strong>' . htmlspecialchars($node['title']) . '</strong>';
        if (!empty($node['image'])) {
            $img = base64_encode($node['image']);
            echo '<br><img src="data:image/jpeg;base64,' . $img . '" alt="' . htmlspecialchars($node['title']) . '" width="100">';
        }
        echo '<br>Цена: ' . htmlspecialchars($node['price']);
        if (!empty($node['children'])) {
            renderCatalog($node['children']);
        }
        echo '</li>';
    }
    echo '</ul>';
}

$tree = buildTree($items);

?><!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Меню (SSR + JS) с отзывами</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav id="menu-container"></nav>
  <?php renderCatalog($tree);?>

  <div class="modal" id="product-modal">
    <div class="modal-content">
      <span class="modal-close" id="modal-close">&times;</span>
      <div id="modal-body"></div>
    </div>
  </div>

<script>
    const products = <?php echo json_encode($productsJs, JSON_UNESCAPED_UNICODE); ?>;
    const productsById = {};
    products.forEach(p => { productsById[p.id] = p; });

    document.querySelectorAll('.catalog-item').forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = Number(this.getAttribute('data-id'));
            const data = productsById[id];
            if (!data) return;
            let html = '<h2>' + data.title + '</h2>';
            if (data.image) {
                html += '<img src="data:image/jpeg;base64,' + data.image + '" width="200"><br>';
            }
            html += '<b>Цена:</b> ' + data.price + '<br>';
            html += '<p>' + data.description + '</p>';
            html += '<div class="reviews">';
            html += '<h3>Отзывы</h3>';
            if (data.reviews.length) {
                html += '<ul>';
                data.reviews.forEach(r => {
                    html += `<li><b>${r.user}:</b> ${r.text}</li>`;
                });
                html += '</ul>';
            } else {
                html += '<p>Отзывов пока нет.</p>';
            }
            html += `
                <h3>Добавить отзыв</h3>
                <form method="post">
                    <input type="hidden" name="goods_id" value="${data.id}">
                    <p><label>Ваше имя:<br><input type="text" name="user" required></label></p>
                    <p><label>Текст отзыва:<br><textarea name="text" rows="4" required></textarea></label></p>
                    <p><button type="submit">Отправить</button></p>
                </form>
            `;
            html += '</div>';

            document.getElementById('modal-body').innerHTML = html;
            document.getElementById('product-modal').style.display = 'flex';
        });
    });
    document.getElementById('modal-close').onclick = function() {
        document.getElementById('product-modal').style.display = 'none';
    };
    window.onclick = function(event) {
        if (event.target === document.getElementById('product-modal')) {
            document.getElementById('product-modal').style.display = 'none';
        }
    };
</script>
</body>
</html>
