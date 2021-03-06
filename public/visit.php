<!DOCTYPE html>
<html>
<head>
  <link rel="shortcut icon" href="favicon.ico">

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Visiting...</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Compiled and minified CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

  <!-- Compiled and minified JavaScript -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">
  
  <!-- SWAL2 -->
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.js"></script>

  <link href="css/visit.css" rel="stylesheet">
  <link href="css/color.css" rel="stylesheet">
</head>
<body>
  <nav id="navbar">
  </nav>

  <div class="row" style="padding: 20px 20px 20px 20px">
    <div class="col s3" style="padding: 20px 30px 30px 30px">
      <a class="btn-floating waves-effect waves-light white" id="btnGoHome" href="#!" style="margin: 0px 0px 0px 40px"><i class="material-icons" style="color: #1976d2; font-size: 30px;">arrow_back</i></a>

      <div class="personalInfo card">
        <img id="profilePic" alt="" class="circle" style="height: 100px; width: 100px;">
        
        <p class="truncate" id="fullName" style="font-size: 18px; margin-bottom: 0px">Full Name Here</p>
        <p class="truncate" id="email" style="font-size: 14px; margin-top: 5px;">Email Here</p>
        <p class="truncate" id="biography" style="font-size: 14px; margin-bottom: 0px; padding-bottom: 0px;"><i>No bio found</i></p>
      </div>

      <p style="color: silver; font-size: 12px;">© 2019 Go Social!</p>
    </div>

    <div class="col s6" style="margin-top: 150px;">

      <!-- Profile feeds -->
      <div id="feedsContainer"></div>

      <div style="text-align: center">
        <div style="display: inline-block; background-color: grey; height: 10px; width: 10px; border-radius: 10px;"></div>   
      </div>
    </div>

    <div class="col s3">

    </div>
  </div>
  
  <div id="modalComment" class="modal bottom-sheet">
    <div class="modal-content">
      <div class="container">
        <ul class="collection">
          <div id="originalPost">
            <!-- TBA -->
          </div>
          <div id="commentsContainer">
            <!-- TBA -->
          </div>
        </ul>

        <div class="divider"></div>

        <form id="formReplyComment">
          <div class="input-field">
            <input id="postID" type="hidden" value="">
            <input autocomplete="off" id="inputTextComment" type="text" placeholder="reply to this post...">
          </div>
        </form>
      </div>
    </div>

  </div>
</body>

<script src="js/visit.js"></script>
</html>
