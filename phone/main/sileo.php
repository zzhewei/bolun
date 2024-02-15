<?php
require_once('system/common.inc.php');
base_url();
$package_info = DB::fetch_first(DB::prepare("SELECT * FROM `".DCRM_CON_PREFIX."Packages` WHERE `id` = '%s'", $_GET['pid']));
//字节换算
$num = $package_info['Size'];
$p = 1;
$format='KB';
if ($num>=pow(1024, 2)) {
    $p = 2;
    $format='MB';
}
$num /= pow(1024, $p);
$size = number_format($num, 3).' '.$format;
//版本处理
$support = unserialize($package_info['System_Support']);
//预览截图处理
$shots = unserialize($package_info['ScreenShots']);
$domain = $_SERVER['HTTP_HOST'];
if(empty($shots)){//无图时默认图片地址
  $shots = array('http://apt.iwba.cn/img/wzt.png');
}else{
	foreach($shots as $k=>$v){//截图域名添加
    	$shots[$k] = 'http://'.$domain.$v;
    }
}


		

		
	 
	 
	 


$arr['minVersion'] = '0.1.2';
$arr['headerImage'] = 'http://0oo0.vip/icon/sileo.png';
$arr['tabs'][0]['tabname'] = '插件介绍';
$arr['tabs'][0]['views'][0]['markdown'] = '<div style="text-align:center;font-size:18px;">'.$package_info['Description'].'<br/>'.$package_info['Multi'].'</div>';
$arr['tabs'][0]['views'][0]['class'] = 'DepictionMarkdownView';
$arr['tabs'][0]['views'][1]['class'] = '';




if (!empty($package_info['ScreenShots'])){
foreach($shots as $k){
	$arr['tabs'][0]['views'][2]['screenshots'][] = array('accessibilityText'=>'Screenshot','url'=>$k);
}
$arr['tabs'][0]['views'][2]['class'] = 'DepictionScreenshotsView';
$arr['tabs'][0]['views'][2]['itemCornerRadius'] = 6;
$arr['tabs'][0]['views'][2]['itemSize'] = '{160, 284.44444444444}';

		}else{
$arr['tabs'][0]['views'][2]['class'] = '';
}

$arr['tabs'][0]['views'][3]['class'] = 'DepictionSeparatorView';
$arr['tabs'][0]['views'][4]['title'] = '兼容系统';
$arr['tabs'][0]['views'][4]['text'] = 'iOS '.$support['Minimum'].' ~ iOS '.$support['Maxmum'];
$arr['tabs'][0]['views'][4]['class'] = 'DepictionTableTextView';
$arr['tabs'][0]['views'][5]['title'] = '插件作者';
$arr['tabs'][0]['views'][5]['text'] = $package_info['Author'];
$arr['tabs'][0]['views'][5]['class'] = 'DepictionTableTextView';
$arr['tabs'][0]['views'][6]['title'] = '插件版本';
$arr['tabs'][0]['views'][6]['text'] = $package_info['Version'];
$arr['tabs'][0]['views'][6]['class'] = 'DepictionTableTextView';
$arr['tabs'][0]['views'][7]['title'] = '插件大小';
$arr['tabs'][0]['views'][7]['text'] = $size;
$arr['tabs'][0]['views'][7]['class'] = 'DepictionTableTextView';
$arr['tabs'][0]['views'][8]['title'] = '下载次数';
$arr['tabs'][0]['views'][8]['text'] = $package_info['DownloadTimes'];
$arr['tabs'][0]['views'][8]['class'] = 'DepictionTableTextView';
$arr['tabs'][0]['views'][9]['title'] = '添加时间';
$arr['tabs'][0]['views'][9]['text'] = $package_info['CreateStamp'];
$arr['tabs'][0]['views'][9]['class'] = 'DepictionTableTextView';
$arr['tabs'][0]['views'][10]['markdown'] = '<small style="color: #aaa; font-size: 10pt;">专注于收集精品插件分享<br/>做最简洁、纯净无广告的源</small><style>body { text-align: center; }</style>';
$arr['tabs'][0]['views'][10]['class'] = 'DepictionMarkdownView';
$arr['tabs'][0]['class'] = 'DepictionStackView';




$arr['tabs'][1]['tabname'] = '关于我们';

$arr['tabs'][1]['views'][0]['markdown'] = '如果使用上遇到任何问题<br />尝试用以下方式联系我们';
$arr['tabs'][1]['views'][0]['class'] = 'DepictionMarkdownView';
$arr['tabs'][1]['views'][1]['title'] = '微信公众号';
$arr['tabs'][1]['views'][1]['action'] = 'http://0oo0.vip/weixin.html'; 
$arr['tabs'][1]['views'][1]['class'] = 'DepictionTableButtonView';
$arr['tabs'][1]['views'][2]['title'] = '交流QQ群';
$arr['tabs'][1]['views'][2]['action'] = 'http://qm.qq.com/cgi-bin/qm/qr?k=euFaLJsdsdsdsdsdsdprEX6'; 
$arr['tabs'][1]['views'][2]['class'] = 'DepictionTableButtonView';
$arr['tabs'][1]['views'][3]['title'] = '电子邮箱';
$arr['tabs'][1]['views'][3]['action'] = 'mailto:478066693@qq.com'; 
$arr['tabs'][1]['views'][3]['class'] = 'DepictionTableButtonView';
$arr['tabs'][1]['views'][4]['class'] = 'DepictionSeparatorView';
$arr['tabs'][1]['views'][5]['markdown'] = '<small style="color: #aaa; font-size: 10pt;">专注于收集精品插件分享<br/>做最简洁、纯净无广告的源</small><style>body { text-align: center; }</style>';
$arr['tabs'][1]['views'][5]['class'] = 'DepictionMarkdownView';
$arr['tabs'][1]['class'] = 'DepictionStackView';



$arr['class'] = 'DepictionTabView';
header("content:application/json;chartset=uft-8");
echo json_encode($arr);


?>