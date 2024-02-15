<?php
/**
 * DCRM Mobile Page
 *
 * This file is part of WEIPDCRM.
 * 
 * WEIPDCRM is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * WEIPDCRM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with WEIPDCRM.  If not, see <http://www.gnu.org/licenses/>.
 */

require_once('system/common.inc.php');
base_url();

// URL For Rewrite 
$rewrite_mod = get_option('rewrite_mod');
switch($rewrite_mod){
	case 3:
		$rewrite_url = array('view' => 'view/%d','sileo-featured.json' => 'sileo-featured.php', 'sileo' => 'sileo/%d','view_nohistory' => 'view/%d/nohistory', 'screenshot' => 'screenshot/%d', 'history' => 'history/%d', 'contact' => 'contact/%d', 'section' => 'section/%d', 'report' => 'report/%d', 'report_support' => 'report/%1$d/%2$d', 'more' => 'more/%d', 'more_offset' => 'more/%1$d/%2$d', 'misc' => 'misc');
		break;
	case 1:
	case 2:
	default:
		$rewrite_url = array('view' => 'index.php?method=view&amp;pid=%d','sileo-featured.json' => 'sileo-featured.php','view' => 'view/%d', 'sileo' => 'sileo.php?method=view&amp;pid=%d','view_nohistory' => 'index.php?pid=%d&amp;addr=nohistory', 'screenshot' => 'index.php?method=screenshot&amp;pid=%d', 'history' => 'index.php?method=history&amp;pid=%d', 'contact' => 'index.php?method=contact&amp;pid=%d', 'section' => 'index.php?method=section&amp;pid=%d', 'report' => 'index.php?method=report&amp;pid=%d', 'report_support' => 'index.php?method=report&amp;pid=%1$d&amp;support=%2$d', 'more' => 'index.php?method=more&amp;pid=%d', 'more_offset' => 'index.php?method=more&amp;pid=%1$d&amp;offset=%2$d', 'misc' => 'misc.php');
		break;
}
function echo_rewrite_url($type, $variable1, $variable2=''){
	global $rewrite_url;
	echo SITE_URL;
	printf($rewrite_url[$type], $variable1, $variable2);
}

class_loader('Mobile_Detect');
$detect = new Mobile_Detect;

	if (DCRM_MOBILE == 2) {
		if (!strpos($detect->getUserAgent(), 'Cydia')) {
			$isCydia = false;
		} else {
			$isCydia = true;
		}
	} else {
		exit('Access Denied');
	}

if (file_exists('Release')) {
	$release = file('Release');
	$release_origin = __('No Name');
	$release_mtime = filemtime('Release');
	$release_time = date('Y-m-d H:i:s',$release_mtime);
	foreach ($release as $line) {
		if(preg_match('#^Origin#', $line)) {
			$release_origin = trim(preg_replace("#^(.+):\\s*(.+)#","$2", $line));
		}
		if(preg_match("#^Description#", $line)) {
			$release_description = trim(preg_replace("#^(.+):\\s*(.+)#","$2", $line));
		}
	}
} else {
	$release_origin = __('Empty Page');
}
if (isset($_GET['pid'])) {
	if (ctype_digit($_GET['pid']) && intval($_GET['pid']) <= 10000) {
		function device_check(){
			global $detect;
			$device_type = array('iPhone', 'iPod', 'iPad');
			for ($i = 0; $i < count($device_type); $i++) {
				$check = $detect->version($device_type[$i]);
				if ($check !== false) {
					if (isset($_SERVER['HTTP_X_MACHINE'])) {
						$DEVICE = $_SERVER['HTTP_X_MACHINE'];
					} else {
						$DEVICE = 'Unknown';
					}
					$OS = str_replace('_', '.', $check);
					break;
				}
			}
			return array('DEVICE' => $DEVICE, 'OS' => $OS);
		}

		if (isset($_GET['method']) && $_GET['method'] == 'screenshot') {
			$index = 2;
			$title = __('View Screenshots');
		} elseif (isset($_GET['method']) && $_GET['method'] == 'report') {
			$device_info = device_check();
			if (!isset($_GET['support'])) {
				$index = 3;
			} else {
				if ($_GET['support'] == '1') {
					$support = 1;
				} elseif ($_GET['support'] == '2') {
					$support = 2;
				} elseif ($_GET['support'] == '3') {
					$support = 3;
				} else {
					$support = 0;
				}
				$index = 4;
			}
			$title = __('Report Problems');
		} elseif (isset($_GET['method']) && $_GET['method'] == 'history') {
			$index = 5;
			$title = __('Version History');
		} elseif (isset($_GET['method']) && $_GET['method'] == 'contact') {
			$index = 6;
			$title = __('Contact us');
		} elseif (isset($_GET['method']) && $_GET['method'] == 'section') {
			$index = 7;
			$title = __('Package Category');
		} elseif (isset($_GET['method']) && $_GET['method'] == 'more') {
			$index = 8;
			$section = DB::fetch_first("SELECT `Name`, `Icon` FROM `".DCRM_CON_PREFIX."Sections` WHERE `ID` = '".(int)$_GET['pid']."'");
			$q_name = DB::real_escape_string($section['Name']);
			if (isset($_GET['offset']) && !empty($_GET['offset']) && ctype_digit($_GET['offset'])) {
				$offset = intval($_GET['offset']);
			} else {
				$offset = 0;
			}
			$packages = DB::fetch_all("SELECT `ID`, `Name`, `Package` FROM `".DCRM_CON_PREFIX."Packages` WHERE (`Stat` = '1' AND `Section` = '".$q_name."') ORDER BY `ID` DESC LIMIT 10 OFFSET ".$offset);
			foreach($packages as $package){
				if(!empty($package)){
					if ($isCydia) { ?>
              <a href="cydia://package/<?php echo($package['Package']); ?>" target="_blank">
<?php	} else { ?>
              <a href="<?php echo_rewrite_url('view', $package['ID']);?>">    
<?php				} ?>
                 <table cols="2" border="0" class=" information" >
                  <tbody class="">
                    <tr class="">
                      <td style="margin-top:6px;font-size:18px;"> 
                          <img class="icon" src="<?php echo(SITE_URL); ?>icon/<?php echo(empty($section['Icon']) ? 'default/unknown.png' : $section['Icon']); ?>" style="border-radius: 50%; width: 25px; height: 25px; position:relative;left:-11px;top:6px;"><?php echo($package['Name']); ?>
                      </td>
                      <i class="ui-btn3" style="color: #7A67EE; float:right;margin-right:18px;margin-top:18px;"><strong>查看</strong></i>
                    </tr>
                  </tbody>
                 </table> 
               </a> 
              <div class=" fading-sep"></div>
<?php
				}
			}
			exit();
		} elseif (!isset($_GET['method']) || (isset($_GET['method']) && $_GET['method'] == 'view')) {
			$index = 1;
			$title = __('View Package');
			$package_id = (int)DB::real_escape_string($_GET['pid']);
			$package_info = DB::fetch_first("SELECT `Name`, `Version`, `Author`, `Package`, `Description`, `DownloadTimes`, `Multi`, `CreateStamp`, `Size`, `Installed-Size`, `Section`, `Homepage`, `Tag`, `Level`, `Price`, `Purchase_Link`, `Changelog`, `Changelog_Older_Shows`, `Video_Preview`, `System_Support`, `ScreenShots` FROM `".DCRM_CON_PREFIX."Packages` WHERE `ID` = '".$package_id."' LIMIT 1");
			if ($package_info) $title = $title.' - '.$package_info['Name'];
		} else {
			httpinfo(405);
			exit();
		}
	} else {
		httpinfo(405);
		exit();
	}
} elseif (!isset($_GET['method'])) {
	$index = 0;
	$title = $release_origin;
} else {
	httpinfo(405);
	exit();
}
?>
                
<?php 
  
function jsonFormat($data, $indent=null){  
   
    // 对数组中每个元素递归进行urlencode操作，保护中文字符  
    array_walk_recursive($data, 'jsonFormatProtect');  
   
    // json encode  
    $data = json_encode($data);  
   
    // 将urlencode的内容进行urldecode  
    $data = urldecode($data);  
   
    // 缩进处理  
    $ret = '';  
    $pos = 0;  
    $length = strlen($data);  
    $indent = isset($indent)? $indent : '    ';  
    $newline = "\n";  
    $prevchar = '';  
    $outofquotes = true;  
   
    for($i=0; $i<=$length; $i++){  
   
        $char = substr($data, $i, 1);  
   
        if($char=='"' && $prevchar!='\\'){  
            $outofquotes = !$outofquotes;  
        }elseif(($char=='}' || $char==']') && $outofquotes){  
            $ret .= $newline;  
            $pos --;  
            for($j=0; $j<$pos; $j++){  
                $ret .= $indent;  
            }  
        }  
   
        $ret .= $char;  
           
        if(($char==',' || $char=='{' || $char=='[') && $outofquotes){  
            $ret .= $newline;  
            if($char=='{' || $char=='['){  
                $pos ++;  
            }  
   
            for($j=0; $j<$pos; $j++){  
                $ret .= $indent;  
            }  
        }  
   
        $prevchar = $char;  
    }  
   
    return $ret;  
}  
   
/** 将数组元素进行urlencode 
* @param String $val 
*/  
function jsonFormatProtect(&$val){  
    if($val!==true && $val!==false && $val!==null && $val!==10 ){  
        $val = urlencode($val);  
    }  
} 




          
$packages = DB::fetch_all("SELECT `ID`, `Name`,`Icon2`, `Section`, `SectionID`, `Description`,`DownloadTimes`,`Package` FROM `".DCRM_CON_PREFIX."Packages` WHERE (`Stat` = '1' AND `Recommend` = '1')  ORDER BY `CreateStamp` DESC LIMIT 1");
foreach($packages as $package) {

}
$packages2 = DB::fetch_all("SELECT `ID`, `Name`,`Icon2`, `Section`, `SectionID`, `Description`,`DownloadTimes`,`Package` FROM `".DCRM_CON_PREFIX."Packages` WHERE (`Stat` = '1' AND `Recommend` = '1') ORDER BY `CreateStamp` DESC LIMIT 2");
foreach($packages2 as $package2) {

}     
$packages3 = DB::fetch_all("SELECT `ID`, `Name`,`Icon2`, `Section`, `SectionID`, `Description`,`DownloadTimes`,`Package` FROM `".DCRM_CON_PREFIX."Packages` WHERE (`Stat` = '1' AND `Recommend` = '1')  ORDER BY `CreateStamp` DESC LIMIT 3");
foreach($packages3 as $package3) {

} 
$packages4 = DB::fetch_all("SELECT `ID`, `Name`,`Icon2`, `Section`, `SectionID`, `Description`,`DownloadTimes`,`Package` FROM `".DCRM_CON_PREFIX."Packages` WHERE (`Stat` = '1' AND `Recommend` = '1')  ORDER BY `CreateStamp` DESC LIMIT 4");
foreach($packages4 as $package4) {
  
} 
$packages5 = DB::fetch_all("SELECT `ID`, `Name`,`Icon2`, `Section`, `SectionID`, `Description`,`DownloadTimes`,`Package` FROM `".DCRM_CON_PREFIX."Packages` WHERE (`Stat` = '1' AND `Recommend` = '1')  ORDER BY `CreateStamp` DESC LIMIT 5");
foreach($packages5 as $package5) {

}  
                
$packages6 = DB::fetch_all("SELECT `ID`, `Name`,`Icon2`, `Section`, `SectionID`, `Description`,`DownloadTimes`,`Package` FROM `".DCRM_CON_PREFIX."Packages` WHERE (`Stat` = '1' AND `Recommend` = '1')  ORDER BY `CreateStamp` DESC LIMIT 6");
foreach($packages6 as $package6) {

}                 
                
$packages7 = DB::fetch_all("SELECT `ID`, `Name`,`Icon2`, `Section`, `SectionID`, `Description`,`DownloadTimes`,`Package` FROM `".DCRM_CON_PREFIX."Packages` WHERE (`Stat` = '1' AND `Recommend` = '1')  ORDER BY `CreateStamp` DESC LIMIT 7");
foreach($packages7 as $package7) {

}                 
                
$packages8 = DB::fetch_all("SELECT `ID`, `Name`,`Icon2`, `Section`, `SectionID`, `Description`,`DownloadTimes`,`Package` FROM `".DCRM_CON_PREFIX."Packages` WHERE (`Stat` = '1' AND `Recommend` = '1')  ORDER BY `CreateStamp` DESC LIMIT 8");
foreach($packages8 as $package8) {

}                 
                
              
              
                
$arr = array(
  "class" =>"FeaturedBannersView",
  "itemSize" =>"{263, 148}",
  "itemCornerRadius" =>10,
  "banners" => 
  array(
   array(
    "url"=>"http://0oo0.vip/icon/sileo3.png",
    "title" => $package['Name'],
    "package" => $package['Package'],
    "hideShadow" =>true,
     "repoName"=>"西瓜源™	"
   ),
   array(
    "url"=>"http://0oo0.vip/icon/sileo3.png",
    "title" => $package2['Name'],
    "package" => $package2['Package'],
    "hideShadow" =>true,
     "repoName"=>"西瓜源™	"
   ),
   array(
    "url"=>"http://0oo0.vip/icon/sileo3.png",
    "title" => $package3['Name'],
    "package" => $package3['Package'],
    "hideShadow" =>true,
     "repoName"=>"西瓜源™	"
   ),
   array(
    "url"=>"http://0oo0.vip/icon/sileo3.png",
    "title" => $package4['Name'],
    "package" => $package4['Package'],
    "hideShadow" =>true,
     "repoName"=>"西瓜源™	"
   ),
   array(
    "url"=>"http://0oo0.vip/icon/sileo3.png",
    "title" => $package5['Name'],
    "package" => $package5['Package'],
    "hideShadow" =>true,
     "repoName"=>"西瓜源™	"
   ),
   array(
    "url"=>"http://0oo0.vip/icon/sileo3.png",
    "title" => $package6['Name'],
    "package" => $package6['Package'],
    "hideShadow" =>true,
     "repoName"=>"西瓜源™	"
   ),
   array(
    "url"=>"http://0oo0.vip/icon/sileo3.png",
    "title" => $package7['Name'],
    "package" => $package7['Package'],
    "hideShadow" =>true,
     "repoName"=>"西瓜源™	"
   ),
   array(
    "url"=>"http://0oo0.vip/icon/sileo3.png",
    "title" => $package8['Name'],
    "package" => $package8['Package'],
    "hideShadow" =>true,
     "repoName"=>"西瓜源™	"
   ),    
  ),
);                 
 

           


 
header('content-type:application/json;charset=utf8');  

 
echo jsonFormat($arr);  
 
?>


         
