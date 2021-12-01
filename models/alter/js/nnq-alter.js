var nnq = {}
window.onload=function(){
	nnq.alter=function(){
		var html = document.getElementsByTagName("BODY")[0];
		var alter_ele = [];
		var alter_style = 'style="top:86px;z-index:2500;"';
		var alter_text = '信息提示';
		alter_ele.push(' <div class="nnq-message nnq-message--primary" ');
		alter_ele.push(alter_style);
		alter_ele.push('>');
		alter_ele.push('<i class="nnq-message-icon nnq-icon-warnning"></i>');
		alter_ele.push('<span class="nnq-message-lable">');
		alter_ele.push(alter_text);
		alter_ele.push('</span>');
		alter_ele.push('</div>');
		html.innerHTML=html.innerHTML+alter_ele.join('');
	};
	nnq.alter();
}
