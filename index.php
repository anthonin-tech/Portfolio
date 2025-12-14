<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio_Anthonin</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
    <link rel="stylesheet" href="assets/css/index.css">
</head>
<body>

    <?php include('views/partials/_navbar.php') ?>
    
    <div class="video-background">
        <iframe
            src="https://www.youtube.com/embed/MI_70rnBCFM?autoplay=1&mute=1&loop=1&playlist=MI_70rnBCFM&controls=0&modestbranding=1&rel=0"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
        ></iframe>
    </div>

    <main class="container">
    <?php
        $page = $_GET['page'] ?? 'home';
        $file = "views/pages/$page.php";

        if (file_exists($file)) {
            include($file);
        } else {
            echo "<p>Page introuvable : <strong>$page</strong></p>";
        }
    ?>
    </main>

    <script src="assets/js/index.js"></script>

    <?php include('views/partials/_footer.php') ?>
</body>
</html>