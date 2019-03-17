<!DOCTYPE html>
<html>
<head>
  <link rel="shortcut icon" href="favicon.ico">
  
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Edit Profile</title>
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

  <link href="css/color.css" rel="stylesheet">
</head>
<body style="background-color: #1976d2">

  <div class="row" style="margin-top: 20px;"></div>
  <a id="btn_goToMain" href="main.php" style="margin: 40px 0px 0px 40px"><i class="material-icons" style="color: white; font-size: 40px;">arrow_back</i></a>

    <div class="container">

      <div class="row">
          <h4 style="margin-left: 50px; color: white;">Personal Info</h4>
        </div>

        <div class="card" style="height: 350px;  border-radius: 10px; padding: 20px 20px 10px 20px; margin-left: 20px; margin-right: 20px;">
          <form id="editPersonal" style="margin-bottom: 20px">
            <div class="row">
              <div class="col s12">
                <div class="row">
                  <div class="col s6">
                    <form action="#">
                      <p style="color: grey;">Change Profile Picture</p>

                      <div class="file-field input-field">
                        <div class="btn btn-small" style="background-color: #1976d2">
                          <span>choose file</span>
                          <input id="ppFile" type="file">
                        </div>
                        <div class="file-path-wrapper">
                          <input id="ppFileName" class="file-path validate" type="text">
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="col s6">
                    <form action="#">
                      <p style="color: grey;">Change Cover Picture</p>

                      <div class="file-field input-field">
                        <div class="btn btn-small" style="background-color: #1976d2">
                          <span>choose file</span>
                          <input id="cpFile" type="file">
                        </div>
                        <div class="file-path-wrapper">
                          <input id="cpFileName" class="file-path validate" type="text">
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="input-field col s6">
                <i class="material-icons prefix" style="color: #1976d2;">edit</i>
                <input id="firstName" name="firstName" type="text">
                <label for="firstName">First Name</label>
              </div>
              <div class="input-field col s6">
                <i class="material-icons prefix" style="color: #1976d2;">edit</i>
                <input id="lastName" name="lastName" type="text">
                <label for="lastName">Last Name</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s8">
                <i class="material-icons prefix" style="color: #1976d2;">edit</i>
                <input id="biography" name="biography" type="text" class="truncate">
                <label for="biography">Bio</label>
              </div>
            </div>
          </form>
        </div>

            <div class="col s6" style="margin-top: 20px;">
            <div class="row">
              <h4 style="margin-left: 50px; color: white;">Account Detail</h4>
            </div>
            <div class="card" style="height: 300px;  border-radius: 10px; padding: 20px 20px 10px 20px; margin-left: 20px; margin-right: 20px;">
              <form id="editAccount" style="margin-bottom: 20px">
                <div class="row">
                  <div class="input-field col s6">
                    <i class="material-icons prefix" style="color: #1976d2;">email</i>
                    <input id="email" name="email" type="email" class="validate">
                    <label for="email">Email</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s6">
                    <i class="material-icons prefix" style="color: #1976d2;">date_range</i>
                    <input class="datepicker" id="dateofbirth" name="dateofbirth" type="text">
                    <label for="dateofbirth">Date of Birth</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s6"> 
                    <select id="gender">
                      <option value="Male" style="color: #1976d2" selected>Male</option>
                      <option value="Female"><p style="color: #1976d2">Female</p></option>
                    </select>
                    <label>Gender</label>
                  </div>
                </div>
                
              </form>
            </div>
          </div>
        </div>

  <!-- Loading Modal -->
  <div id="modalLoading" class="modal" style="marginTop: 300">
    <div class="modal-content" style="text-align: center">
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- FAB -->
  <div class="fixed-action-btn">
    <a id="fabSubmitForm" class="btn-floating btn-large red">
      <i class="large material-icons">check</i>
    </a>
  </div>
</body>

<script src="js/editprofile.js"></script>

</html>
