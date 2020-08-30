<?
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

class MysqlConn
{
  protected $servername = "localhost";
  protected $username = "root";
  protected $password = "";
  protected $db = "justMain";
  protected $conn;

  function __construct()
  {
    $this->conn = new mysqli($this->servername, $this->username, $this->password,$this->db);
    $this->conn->set_charset('utf8');

  }
  // Check connection
  function CheckConection()
  {
    if ($this->conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
        return false;
    }else {
      return true;
    }
  }

function ExecuteQuery($value)
{
  $result = $this->conn->query($value);
  /*  while($row = mysqli_fetch_array($result))
       {
          print_r($row);
       }*/
       $data  = array();

       while( $row = $result->fetch_array(MYSQLI_ASSOC)) {
         $dataArray = array();
           $data[] = $row;
       }

  echo json_encode($data);
}

function ExecuteQueryx($value)
{
  $result = $this->conn->query($value);
  /*  while($row = mysqli_fetch_array($result))
       {
          print_r($row);
       }*/

}

function QueryToJson($result){
  if ($result->num_rows > 0) {
    $rows = $result->fetch_all(MYSQLI_ASSOC);
    return json_encode($rows);
  } else {
    return 0;
  }
}

function CheckUser($usr,$pass) //ok
{

  $result = $this->conn->query("SELECT * FROM users WHERE username='$usr' && password='$pass' limit 1");
 
  return $result;
}

function CheckUserId($usr) //ok
{

  $result = $this->conn->query("SELECT * FROM users WHERE id='$usr' limit 1");
 
  return $result;
}

function RegisterUser($username,$password, $name, $phone, $typeUser) //ok
{
  // code...
  $result = $this->conn->query("INSERT INTO `users` (username, password, name, phone , typeUser) VALUES ('$username','$password','$name','$phone' ,'$typeUser')");
  return($result);
}

function RegisterJust($usernameFk, $filename, $dateStart ,$dateEnd, $reason, $info, $teacher) //ok
{
  // code...
  $result = $this->conn->query("INSERT INTO `just` (usernameFk, filename, dateStart, dateEnd , reason, info , state, teacherFk) 
                                VALUES ('$usernameFk','$filename', '$dateStart','$dateEnd','$reason' ,'$info' , 'OPEN', '$teacher')");
  return($result);
}

function CheckJust($usernameFk) //ok
{
  // code...
  $result = $this->conn->query("SELECT * from `just` WHERE usernameFk = '$usernameFk'");
  return($result);
}

function CheckJustToTeacher($usernameFk) //ok
{
  // code...
  $result = $this->conn->query("SELECT * from `just` WHERE teacherFk = '$usernameFk'");
  return($result);
}

function CheckTeachers() //ok
{
  // code...
  $result = $this->conn->query("SELECT * from `users` WHERE typeUser = 'teacher'");
  return($result);
}


function ChangePass($justid) // ok
{
  // code...
  $result = $this->conn->query("UPDATE `users` SET `password` = '$pass' WHERE `users`.`id` = '$usr'");

  return $result;
}



function ApartBook($ISBN, $usr)
{

  $result000 = $this->conn->query("SELECT * FROM users WHERE ID='$usr'");

  if ($result000->num_rows > 0) {
    // code...
  $result00 = $this->conn->query("SELECT * FROM `borrowedbooks` WHERE fkuser ='$usr'");

  if ($result00->num_rows < 3) {
  // code...
  $result = $this->conn->query("INSERT INTO `borrowedbooks` (`IDprestamo`, `fkbook`, `fkuser`, `date`, `datedelivery`, `estate`) VALUES (NULL, '$ISBN', '$usr', CURRENT_TIMESTAMP, NULL, 'PRESTADO')");
  $result0 = $this->conn->query("UPDATE `books` SET `Quantity` = Quantity-1 WHERE `books`.`ISBN` = '$ISBN'");

  if ($result == $result0) {
    // code...
    return true;
  }
  else {
    // code...
    return false;
  }

  }else {
    return 3;
  }
  } else {
    // code...
    return 4;
  }

}

function CheckBook($ISBN, $usr)
{
  // code...
  $result = $this->conn->query("SELECT * FROM borrowedbooks WHERE fkbook='$ISBN' && fkuser='$usr' limit 1");

  $book = 0;

  if ($result->num_rows > 0) {
    // code...
  $book = true;

  } else {
    // code...
    $book = 0;
  }

 return $book;
}

function UpdateJust($justid , $state) // ok
{
  // code...
  $result = $this->conn->query("UPDATE `just` SET `state` = '$state' WHERE `just`.`id` = '$justid'");

  return $result;
}


function UpdatePass($usr,$ISBN)
{
  // code...
  $rows = $this->conn->query("SELECT * FROM borrowedbooks WHERE fkbook='$ISBN' && fkuser='$usr'");

  if ($rows->num_rows > 0) {
    // code...
    $result = $this->conn->query("DELETE FROM `borrowedbooks` WHERE fkbook = '$ISBN' && fkuser = '$usr'");
  $result0 = $this->conn->query("UPDATE `books` SET `Quantity` = Quantity+1 WHERE `books`.`ISBN` = '$ISBN'");
  if ($result == $result0) {
    // code...
    return true ;
  }else {
    // code...
    return false;
  }
  }else {
    // code...
    return false;
  }
}


function UpdateBook($ISBN, $Titulo,$Autor,$Existencia,$Lugar,$Paginas,$Precio,$Publicacion)
{
  // code...
  $rows = $this->conn->query("SELECT * FROM books WHERE ISBN='$ISBN'");

  if ($rows->num_rows > 0) {
    // code...
  $result = $this->conn->query("UPDATE `books` SET  `Title` = '$Titulo', `Authors` = '$Autor', `Quantity` = '$Existencia', `Slot` = '$Lugar',  `Pages` = '$Paginas', `Price` = '$Precio',
                               `PubDate` = '$Publicacion'   WHERE `books`.`ISBN` = '$ISBN'");
  if ($result== true) {
    // code...
    return true;
  }else {
    // code...
    return false;
  }
  }else {
    // code...
    return false;
  }
}

function DeleteBook($ISBN)
{
  // code...
  $rows = $this->conn->query("SELECT * FROM books WHERE ISBN='$ISBN'");

  if ($rows->num_rows > 0) {
    // code...
    $result = $this->conn->query("DELETE FROM `books` WHERE `books`.`ISBN` ='$ISBN'" );

    if ($result== true) {
      // code...
      return true;
    }else {
      // code...
      return false;
    }

  }else {
    // code...
    return false;
  }

}

function DeleteUser($Id)
{
  // code...
  $rows = $this->conn->query("SELECT * FROM users WHERE ID='$Id'");

  if ($rows->num_rows > 0) {
    // code...
    $result = $this->conn->query("DELETE FROM `users` WHERE `users`.`ID` ='$Id'" );

    if ($result== true) {
      // code...
      return true;
    }else {
      // code...
      return false;
    }

  }else {
    // code...
    return false;
  }

}


}

?>