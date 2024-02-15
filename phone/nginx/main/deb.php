<?

// 单个文件限制
$max_file_size="51200";

// 所有文件限制
$max_combined_size="100000";

// 上传数量
$file_uploads="8";

// 网站名称
$websitename="n";

// 完整的网址和目录，最后用/
$full_url="http://0oo0.vip/upload/";

// 系统上存储路径最后用/.
$folder="./upload/";

// 随机文件梦? true=使用 (推荐选择这个), false=使用原来文件名
// 随机文件名可以防止重复文件，如使用false有相同的文件无法上传.
$random_name=true;

// 系统允许上传文件的类型.
$allow_types=array ("deb");

// 只有使用完整的服务器路径踩设置这个。一般请留空。用/结束.
$fullpath="";

//设置一个密码，访问者必须输入正确的密码才可以上传.
$password=""; 

/*
//================================================================================
* ! ATTENTION !
//================================================================================
: Don't edit below this line.
*/

// Initialize variables
$password_hash=md5($password);
$error="";
$success="";
$display_message="";
$file_ext=array();
$password_form="";

// Function to get the extension a file.
function get_ext($key) { 
	$key=strtolower(substr(strrchr($key, "."), 1));
	$key=str_replace("deb","deb",$key);
	return $key;
}

// Filename security cleaning. Do not modify.
function cln_file_name($string) {
	$cln_filename_find=array("/\.[^\.]+$/", "/[^\d\w\s-]/", "/\s\s+/", "/[-]+/", "/[_]+/");
	$cln_filename_repl=array("", ""," ", "-", "_");
	$string=preg_replace($cln_filename_find, $cln_filename_repl, $string);
	return trim($string);
}

// If a password is set, they must login to upload files.
If($password) {
	
	//Verify the credentials.
	If($_POST['verify_password']==true) {
		If(md5($_POST['check_password'])==$password_hash) {
			setcookie("phUploader",$password_hash);
			sleep(1); //seems to help some people.
			header("Location: http://".$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF']);
			exit;
		}
	}

	//Show the authentication form
	If($_COOKIE['phUploader']!=$password_hash) {
		$password_form="<form method=\"POST\" action=\"".$_SERVER['PHP_SELF']."\">\n";
		$password_form.="<table align=\"center\" class=\"table\">\n";
		$password_form.="<tr>\n";
		$password_form.="<td width=\"100%\" class=\"table_header\" colspan=\"2\">如上传插件请联系下方QQ获取上传密码</td>\n";
		$password_form.="</tr>\n";
		$password_form.="<tr>\n";
		$password_form.="<td width=\"35%\" class=\"table_body\">输入口令:</td>\n";
		$password_form.="<td width=\"65%\" class=\"table_body\"><input type=\"password\" name=\"check_password\" /></td>\n";
		$password_form.="</tr>\n";
		$password_form.="<td colspan=\"2\" align=\"center\" class=\"table_body\">\n";
		$password_form.="<input type=\"hidden\" name=\"verify_password\" value=\"true\">\n";
		$password_form.="<input type=\"submit\" value=\" 验证密码 \" />\n";
		$password_form.="</td>\n";
		$password_form.="</tr>\n";
		$password_form.="</table>\n";
		$password_form.="</form>\n";
	}
	
} // If Password

// Dont allow submit if $password_form has been populated
If(($_POST['submit']==true) AND ($password_form=="")) {

	//Tally the size of all the files uploaded, check if it's over the ammount.	
	If(array_sum($_FILES['file']['size']) > $max_combined_size*1024) {
		
		$error.="<b>提醒：</b> 您上传的文件过大系统无法支持。<br />";
		
	// Loop though, verify and upload files.
	} Else {

		// Loop through all the files.
		For($i=0; $i <= $file_uploads-1; $i++) {
			
			// If a file actually exists in this key
			If($_FILES['file']['name'][$i]) {

				//Get the file extension
				$file_ext[$i]=get_ext($_FILES['file']['name'][$i]);
				
				// Randomize file names
				If($random_name){
					$file_name[$i]=time()+rand(0,100000);
				} Else {
					$file_name[$i]=cln_file_name($_FILES['file']['name'][$i]);
				}
	
				// Check for blank file name
				If(str_replace(" ", "", $file_name[$i])=="") {
					
					$error.= "<b>提醒：</b> ".$_FILES['file']['name'][$i]." 文件名为空白无法上传。<br />";
				
				//Check if the file type uploaded is a valid file type. 
				}	ElseIf(!in_array($file_ext[$i], $allow_types)) {
								
					$error.= "<b>提醒：</b> ".$_FILES['file']['name'][$i]." 您上传的文件类型系统无法识别。<br />";
								
				//Check the size of each file
				} Elseif($_FILES['file']['size'][$i] > ($max_file_size*1024)) {
					
					$error.= "<b>提醒：</b> ".$_FILES['file']['name'][$i]." 您上传的文件过大！<br />";
					
				// Check if the file already exists on the server..
				} Elseif(file_exists($folder.$file_name[$i].".".$file_ext[$i])) {
	
					$error.= "<b>提醒：</b> ".$_FILES['file']['name'][$i]." 上传错误，您上传的文件已经存在。<br />";
					
				} Else {
					
					If(move_uploaded_file($_FILES['file']['tmp_name'][$i],$folder.$file_name[$i].".".$file_ext[$i])) {
						
						$success.="名称：
                        <a.".$file_ext[$i]."\" target=\"_blank\">".$_FILES['file']['name'][$i]."</a><br />";
                        
						$success.="连接：
                        <a class=\"am-badge am-badge-success\" href=\"".$full_url.$file_name[$i].".".$file_ext[$i]."\" target=\"_blank\">".$full_url.$file_name[$i].".".$file_ext[$i]."</a>
                        <br />";
						
					} Else {
						$error.="<b>提醒:</b> ".$_FILES['file']['name'][$i]." 可能由于网络原因上传失败请重试！<br />";
					}
					
				}
							
			} // If Files
		
		} // For
		
	} // Else Total Size
	
	If(($error=="") AND ($success=="")) {
		$error.="<b>提醒：</b> 请按规则上传您的文件 <br />";
	}

	$display_message=$success.$error;

} // $_POST AND !$password_form

/*
//================================================================================
* Start the form layout
//================================================================================
:- Please know what your doing before editing below. Sorry for the stop and start php.. people requested that I use only html for the form..
*/
?>
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>DEB插件上传系统</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="format-detection" content="telephone=no">
  <meta name="renderer" content="webkit">
  <meta http-equiv="Cache-Control" content="no-siteapp"/>
  <link rel="alternate icon" type="image/png" href="assets/i/favicon.png">
  <link rel="stylesheet" href="assets/css/amazeui.min.css"/>
      <style>
    .get {
      background: #1E5B94;
      color: #fff;
      text-align: center;
      padding: 100px 0;
    }

    .get-title {
      font-size: 200%;
      border: 2px solid #fff;
      padding: 20px;
      display: inline-block;
    }

    .get-btn {
      background: #fff;
    }

    .detail {
      background: #fff;
    }

    .detail-h2 {
      text-align: center;
      font-size: 150%;
      margin: 40px 0;
    }

    .detail-h3 {
      color: #1f8dd6;
    }

    .detail-p {
      color: #7f8c8d;
    }

    .detail-mb {
      margin-bottom: 30px;
    }

    .hope {
      background: #0bb59b;
      padding: 50px 0;
    }

    .hope-img {
      text-align: center;
    }

    .hope-hr {
      border-color: #149C88;
    }

    .hope-title {
      font-size: 140%;
    }

    .about {
      background: #fff;
      padding: 40px 0;
      color: #7f8c8d;
    }

    .about-color {
      color: #34495e;
    }

    .about-title {
      font-size: 180%;
      padding: 30px 0 50px 0;
      text-align: center;
    }

    .footer p {
      color: #7f8c8d;
      margin: 0;
      padding: 15px 0;
      text-align: center;
      background: #2d3e50;
    }
  </style>
</head>
<body>
<!--[if lte IE 9]>
<p class="browsehappy">你正在使用<strong>过时</strong>的浏览器，您访问的网站暂不支持。 请 <a href="http://browsehappy.com/" target="_blank">升级浏览器</a>
  以获得更好的体验！</p>
<![endif]-->


<?
If($password_form) {
	
	Echo $password_form;

} Else {
?>
<header class="am-topbar am-topbar-fixed-top">
  <div class="am-container">
    <h1 class="am-topbar-brand">
      <i class="am-icon-file am-icon-spin"></i>        deb插件上传系统
    </h1>


    <div class="am-collapse am-topbar-collapse" id="collapse-head">
    
    </div>
  </div>
</header>

<div class="get">
  <div class="am-g">
    <div class="am-u-lg-12">
      

      <p>
        <form action="<?=$_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="phuploader">
<table align="center" class="table">
    <p class="am-text-xxl">deb插件上传系统</p>
    <tr>
<td class="table_header" colspan="3"><span class="am-btn am-btn-primary">限制单个文件 <?=$max_file_size?> KB</span><span class="am-btn am-btn-primary">单次上传限制 <?=$max_combined_size?> KB</span> </td>
	</tr>
    <tr>
		<td class="table_header" colspan="2"></td>
	</tr>
	<tr>
		<td class="table_header" colspan="2">
            <p class="am-text-xl"><span class="am-badge am-badge-danger">
       <?=implode($allow_types, ", ");?></span>
</p> </td>
	</tr>

	<?If($display_message){?>
	<tr>
		<td colspan="2" class="message">
		<br />
			<?=$display_message;?>
		<br />
		</td>
	</tr>
	<?}?>
	
	<tr>
		<td colspan="2" class="upload_info">
<br />
		</td>
	</tr>
	<?For($i=0;$i <= $file_uploads-1;$i++) {?>
		<tr>
			<td class="am-icon-check" width="20%"><b></b> </td>
			<td class="table_body" width="80%"><input type="file" name="file[]" size="30" /></td>
		</tr>
	<?}?>
	<tr>
		<td colspan="2" align="center" class="table_footer" class="am-btn am-btn-success" >
			<input class="am-panel-hd am-cf" data-am-collapse="{target: '#collapse-panel-1'}" type="hidden" name="submit" value="true" />
            <br />
			<input class="am-btn am-btn-danger"  type="submit" value="上传" /> &nbsp;
			<input class="am-btn am-btn-default" type="reset" name="reset" value="还原" onclick="window.location.reload(true);" />
		</td>
	</tr>
</table>
</form>

<?}//Please leave this here.. it really dosen't make people hate you or make your site look bad.. ?>
<table class="table" style="border:0px;" align="center">
	<tr>
		<td><div class="copyright"></div></td>
	</tr>
</table>
      </p>
    </div>
  </div>
</div>



<footer class="footer">
  <p class="am-badge-primary">deb插件上传系统 联系 QQ:478066693<a
</footer>

          
    
<!--[if lt IE 9]>
<script src="http://libs.baidu.com/jquery/1.11.1/jquery.min.js"></script>
<script src="http://cdn.staticfile.org/modernizr/2.8.3/modernizr.js"></script>
<script src="assets/js/polyfill/rem.min.js"></script>
<script src="assets/js/polyfill/respond.min.js"></script>
<script src="assets/js/amazeui.legacy.js"></script>
<![endif]-->

<!--[if (gte IE 9)|!(IE)]><!-->
<script src="assets/js/jquery.min.js"></script>
<script src="assets/js/amazeui.min.js"></script>
<!--<![endif]-->
<script src="assets/js/app.js"></script>
</body>
</html>