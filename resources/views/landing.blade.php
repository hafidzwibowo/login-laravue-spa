<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="X-UA-Compatible" content="IE=Edge">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="width=device-width, initial-scale=1 user-scalable=no">
        <title></title>
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">    
    </head>
    <body>
        <div id="app">
            <App/>
        </div>
    <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>